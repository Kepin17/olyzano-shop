<?php

namespace App\Http\Controllers\API;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan!',
                'errors' => $validator->errors()
            ], 400);
        }

        $user_id = Auth::id();
        if (!$user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Anda harus login terlebih dahulu!'
            ], 401);
        }

        $product = Product::findOrFail($request->product_id);

        if ($product->current_stock < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Stok produk tersedia hanya ' . $product->current_stock . 'unit!'
            ], 400);
        }

        DB::beginTransaction();
        try {
            $cartItem = Cart::where('user_id', $user_id)->where('product_id', $product->id)->first();

            if ($cartItem) {
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
            } else {
                Cart::create([
                    'user_id' => $user_id,
                    'product_id' => $product->id,
                    'quantity' => $request->quantity
                ]);
            }
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil ditambahkan ke keranjang!',
                'data' => [
                    'product' => $product,
                    'quantity' => $request->quantity,
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan produk ke keranjang!',
                'data' => $e->getMessage()
            ], 500);
        }
    }

    public function showCart()
    {
        $user_id = Auth::id();

        $cartItems = Cart::where('user_id', $user_id)->with('product')->get();


        $items = $cartItems->map(function ($cartItem) {
            return [
                'product' => $cartItem->product,
                'quantity' => $cartItem->quantity
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'items' => $items,
                'total_price' => $cartItems->sum(function ($cartItem) {
                    return $cartItem->product->price * $cartItem->quantity;
                }),
                'total_quantity' => $cartItems->sum('quantity')
            ]
        ], 200);
    }

    public function updateCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan!',
                'errors' => $validator->errors()
            ], 400);
        }

        $user_id = Auth::id();
        $cartItem = Cart::where('user_id', $user_id)->where('product_id', $request->product_id)->first();

        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan di keranjang!'
            ], 404);
        }

        if ($request->quantity == 0) {
            $cartItem->delete();
        } else {
            $cartItem->quantity = $request->quantity;
            $cartItem->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Keranjang berhasil diperbarui'
        ], 200);
    }

    public function removeCart(Request $request) {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan!',
                'errors' => $validator->errors()
            ], 400);
        }

        $user_id = Auth::id();
        $cartItem = Cart::where('user_id', $user_id)->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            $cartItem->delete();

            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil dihapus dari keranjang!'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan di keranjang!'
            ], 404);
        }
    }
}
