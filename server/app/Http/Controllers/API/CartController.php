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
                'message' => 'Stok produk tersedia hanya '. $product->current_stock.'unit!'
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

    
}