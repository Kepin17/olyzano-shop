<?php

namespace App\Http\Controllers\API;

use Midtrans\Snap;
use App\Models\Cart;
use App\Models\City;
use Midtrans\Config;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Kavist\RajaOngkir\Facades\RajaOngkir;
use Midtrans\Notification;

class CheckoutController extends Controller
{
    public function getProvinces()
    {
        $response = Http::withHeaders([
            'key' => env('RAJAONGKIR_API_KEY')
        ])->get('https://api.rajaongkir.com/starter/province');

        if ($response->successful()) {
            return response()->json($response->json(), 200);
        }

        return response()->json(['error' => 'Unable to fetch provinces'], 500);
    }

    public function getCities($provinceId)
    {
        $response = Http::withHeaders([
            'key' => env('RAJAONGKIR_API_KEY')
        ])->get('https://api.rajaongkir.com/starter/city', [
            'province' => $provinceId
        ]);

        if ($response->successful()) {
            return response()->json($response->json(), 200);
        }

        return response()->json(['error' => 'Unable to fetch cities'], 500);
    }

    public function checkout(Request $request)
    {
        $user_id = Auth::id();
        if (!$user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Anda harus login terlebih dahulu!'
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'product_id' => 'required_without:cart|exists:products,id',
            'quantity' => 'required_without:cart|integer|min:1',
            'cart' => 'required_without:product_id|boolean',
            'courier' => 'required|string',
            'city_destination' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan!',
                'errors' => $validator->errors()
            ], 400);
        }

        DB::beginTransaction();
        try {
            $orderItems = [];
            $totalPrice = 0;
            $totalWeight = 0;

            if ($request->cart) {
                $cartItems = Cart::where('user_id', $user_id)->get();

                foreach ($cartItems as $item) {
                    $product = Product::findOrFail($item->product_id);
                    $orderItems[] = $this->createOrderItem($product, $item->quantity);
                    $totalPrice += $orderItems[count($orderItems) - 1]['subtotal'];
                    $totalWeight += $product->weight * $item->quantity;
                }
            } else {
                $product = Product::findOrFail($request->product_id);
                $orderItems[] = $this->createOrderItem($product, $request->quantity);
                $totalPrice += $orderItems[0]['subtotal'];
                $totalWeight += $product->weight * $request->quantity;
            }
            // dd($orderItems);
            $cost = RajaOngkir::ongkosKirim([
                'origin' => env('RAJAONGKIR_CITY_ORIGIN'),
                'destination' => $request->city_destination,
                'weight' => $totalWeight,
                'courier' => $request->courier
            ])->get();

            Log::info('Ongkos Kirim Response:', $cost);

            if (empty($cost[0]['costs'][0]['cost'][0]['value'])) {
                throw new \Exception('Gagal mendapatkan biaya pengiriman');
            }

            $shippingCost = $cost[0]['costs'][0]['cost'][0]['value'];
            $totalPrice += $shippingCost;

            $order = Order::create([
                'user_id' => $user_id,
                'total_price' => $totalPrice,
                'shipping_cost' => $shippingCost,
                'status' => 'pending',
            ]);

            if (!$order || !isset($order->id)) {
                throw new \Exception('Gagal membuat order atau Order ID tidak ditemukan');
            }

            foreach ($orderItems as $orderItem) {
                Log::info('Saving Order Item:', $orderItem);
                $order->items()->create($orderItem);
            }

            Log::info('Order created:', $order->toArray());

            Config::$serverKey = env('MIDTRANS_SERVER_KEY');
            Config::$isProduction = false;
            Config::$isSanitized = true;
            Config::$is3ds = true;

            Log::info('Total Price:', ['totalPrice' => $totalPrice]);

            $midtransParams = [
                'transaction_details' => [
                    'order_id' => $order->id,
                    'gross_amount' => $totalPrice,
                ],
                'customer_details' => [
                    'first_name' => Auth::user()->username,
                    'email' => Auth::user()->email,
                ],
                'item_details' => array_merge(
                    array_map(function ($item) {
                        return [
                            'id' => $item['product_id'],
                            'price' => $item['price'],
                            'quantity' => $item['quantity'],
                            'name' => Product::find($item['product_id'])->name,
                            'subtotal' => $item['subtotal'],
                        ];
                    }, $orderItems),
                    [
                        [
                            'id' => 'shipping_cost',
                            'price' => $shippingCost,
                            'quantity' => 1,
                            'name' => 'Shipping Cost',
                            'subtotal' => $shippingCost,
                        ]
                    ]
                ),
            ];
            Log::info('Order Items:', $orderItems);
            Log::info('Order Created:', $order->toArray());
            Log::info('Midtrans Params:', $midtransParams);
            if (!isset($order->id)) {
                throw new \Exception('Order ID tidak ditemukan');
            }


            $snapToken = Snap::getSnapToken($midtransParams);
            // dd($snapToken);
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Checkout berhasil, silahkan lanjutkan pembayaran.',
                'data' => [
                    'order' => $order,
                    'midtrans_token' => $snapToken,
                    'midtrans_redirect_url' => "https://app.sandbox.midtrans.com/snap/v2/vtweb/{$snapToken}"
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Checkout Error:', [
                'message' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Checkout gagal!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function midtransCallback(Request $request)
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;

        try {
            $notification = new Notification();

            $transactionStatus = $notification->transaction_status;
            $orderId = $notification->order_id;
            $fraudStatus = $notification->fraud_status;

            Log::info('Midtrans Notification:', (array) $notification);

            $order = Order::findOrFail($orderId);

            if ($transactionStatus == 'capture') {
                if ($fraudStatus == 'challenge') {
                    $order->update(['status' => 'challenge']);
                } else if ($fraudStatus == 'accept') {
                    $order->update(['status' => 'paid']);
                    $this->reduceStock($order);
                }
            } else if ($transactionStatus == 'settlement') {
                $order->update(['status' => 'paid']);
            } else if ($transactionStatus == 'pending') {
                $order->update(['status' => 'pending']);
            } else if ($transactionStatus == 'deny') {
                $order->update(['status' => 'deny']);
            } else if ($transactionStatus == 'expire') {
                $order->update(['status' => 'expire']);
            } else if ($transactionStatus == 'cancel') {
                $order->update(['status' => 'cancel']);
            }
        } catch (\Exception $e) {
            Log::error('Midtrans Callback Error:', [
                'message' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Callback handling failed!',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Callback handled successfully!',
        ], 200);
    }

    private function reduceStock($order)
    {
        foreach ($order->items as $item) {
            $product = $item->product;
            $product->current_stock -= $item->quantity;
            $product->save();
        }
    }

    private function createOrderItem($product, $quantity)
    {
        $price = $product->is_flash_sale ? $this->applyDiscount($product->price, $product->discount) : $product->price;
        $subtotal = $price * $quantity;

        return [
            'product_id' => $product->id,
            'quantity' => $quantity,
            'price' => $price,
            'subtotal' => $subtotal,
        ];
    }

    private function applyDiscount($price, $discount)
    {
        if ($discount && $discount > 0) {
            return $price - ($price * ($discount / 100));
        }

        return $price;
    }
}
