<?php

namespace App\Http\Controllers\API;

use Midtrans\Snap;
use App\Models\Cart;
use App\Models\City;
use Midtrans\Config;
use App\Models\Order;use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Kavist\RajaOngkir\Facades\RajaOngkir;

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
            'weight' => 'required|integer|min:1',
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

            if ($request->cart) {
                $cartItems = Cart::where('user_id', $user_id)->get();

                foreach ($cartItems as $item) {
                    $product = Product::findOrFail($item->product_id);
                    $orderItems[] = $this->createOrderItem($product, $item->quantity);
                    $totalPrice += $orderItems[count($orderItems) - 1]['subtotal'];
                }
            } else {
                $product = Product::findOrFail($request->product_id);
                $orderItems[] = $this->createOrderItem($product, $request->quantity);
                $totalPrice += $orderItems[0]['subtotal'];
            }
            // dd($orderItems);
            // Hitung ongkos kirim
            $cost = RajaOngkir::ongkosKirim([
                'origin' => env('RAJAONGKIR_CITY_ORIGIN'),
                'destination' => $request->city_destination,
                'weight' => $request->weight,
                'courier' => $request->courier
            ])->get();

            Log::info('Ongkos Kirim Response:', $cost);

            if (empty($cost[0]['costs'][0]['cost'][0]['value'])) {
                throw new \Exception('Gagal mendapatkan biaya pengiriman');
            }

            $shippingCost = $cost[0]['costs'][0]['cost'][0]['value'];
            $totalPrice += $shippingCost;

            // Buat order
            $order = Order::create([
                'user_id' => $user_id,
                'total_price' => $totalPrice,
                'shipping_cost' => $shippingCost,
                'status' => 'pending',
            ]);

            if (!$order || !isset($order->id)) {
                throw new \Exception('Gagal membuat order atau Order ID tidak ditemukan');
            }

            // Simpan order items
            foreach ($orderItems as $orderItem) {
                Log::info('Saving Order Item:', $orderItem);
                $order->items()->create($orderItem);
            }

            Log::info('Order created:', $order->toArray());

            // Integrasi Midtrans
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
