<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function showAllProduct()
    {
        $products = Product::all();

        return response()->json([
            'success' => true,
            'message' => 'Daftar Produk',
            'data' => $products
        ], 200);
    }

    public function addProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'stock' => ['required', 'numeric'],
            'description' => ['required', 'string'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'is_flash_sale' => 'nullable|boolean',
            'discount' => 'nullable|numeric',
            'rating' => 'nullable|numeric|min:0|max:5',
            'total_rating' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan!',
                'errors' => $validator->errors()
            ], 400);
        }

        $data = $request->all();
        $data['slug'] = Str::slug($request->name);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->extension();
            $image->storeAs('public/images', $imageName);
            $data['image'] = $imageName;
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Foto Produk harus diupload!'
            ], 400);
        }

        if (!isset($data['current_stock'])) {
            $data['current_stock'] = $data['stock'];
        }

        $product = Product::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan!',
            'data' => $product
        ], 201);
    }
}
