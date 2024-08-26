<?php

namespace App\Http\Controllers\API;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    private function calculatedSoldPercentage($totalStock, $currentStock) {
        if ($totalStock == 0) {
            return 0;
        }

        $soldStock = $totalStock - $currentStock;
        $soldPercentage = ($soldStock / $totalStock) * 100;

        return round($soldPercentage, 2);
    }

    public function showAllProduct()
    {
        $products = Product::all();

        foreach ($products as $product) {
            $product->sold_percentage = $this->calculatedSoldPercentage($product->stock, $product->current_stock);
        }

        return response()->json([
            'success' => true,
            'message' => 'Daftar Produk',
            'data' => $products
        ], 200);
    }

    public function addProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'description' => 'required|string',
            'category' => 'required|string',
            'image.*' => 'required|image|mimes:jpeg,png,jpg|max:10240',
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

        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $counter = 0;

        $hashSlug = md5($baseSlug);
        $formattedHash = implode('-', str_split($hashSlug, random_int(3, 10)));
        $formattedHash = rtrim($formattedHash, '-');
        $slug = substr($formattedHash, 0, 20);

        while (Product::where('slug', $slug)->exists()) {
            $counter++;
            $newSlug = $baseSlug . '-' . $counter;
            $hashSlug = md5($newSlug);
            $formattedHash = implode('-', str_split($hashSlug, random_int(3, 10)));
            $formattedHash = rtrim($formattedHash, '-');
            $slug = substr($formattedHash, 0, 20);

            if (!Product::where('slug', $slug)->exists()) {
                break;
            }
        }

        $data['slug'] = $slug;
        $imageNames = [];

        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('public/images', $imageName);
                $imageNames[] = $imageName;
            }
            $data['image'] = implode(',', $imageNames);
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
            'data' => [
                'product' => $product,
                'image_urls' => array_map(function ($imageName) {
                    return asset('storage/images/' . $imageName);
                }, $imageNames)
            ]
        ], 201);
    }

    public function showProductBySlug($slug)
    {
        $product = Product::where('slug', $slug)->first();

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produk Tidak Ditemukan!',
            ], 400);
        }
        $product->sold_percentage = $this->calculatedSoldPercentage($product->stock, $product->current_stock);
        $imageName = $product->image;

        return response()->json([
            'success' => true,
            'message' => 'Detail Produk',
            'data' => [
                'product' => $product,
                'image_url' => asset('storage/images/' . $imageName)
            ]
        ], 200);
    }

    public function updateProductBySlug(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'description' => 'required|string',
            'category' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
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

        $product = Product::where('slug', $slug)->firstOrFail();

        $data = $request->all();

        if ($request->has('name')) {
            $baseSlug = Str::slug($request->name);
            $hashSlug = md5($baseSlug);
            $formattedHash = implode('-', str_split($hashSlug, random_int(3, 10)));
            $formattedHash = rtrim($formattedHash, '-');
            $slug = substr($formattedHash, 0, 20);

            while (Product::where('slug', $slug)->exists()) {
                $hashSlug = md5($baseSlug . '-' . Str::random(8));
                $formattedHash = implode('-', str_split($hashSlug, random_int(3, 10)));
                $formattedHash = rtrim($formattedHash, '-');
                $slug = substr($formattedHash, 0, 20);
            }
            $data['slug'] = $slug;
        }

        $product->update($data);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->extension();
            $image->storeAs('public/images', $imageName);
            $product->image = $imageName;
            $product->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diubah!',
            'data' => [
                'product' => $product,
                'image_url' => asset('storage/images/' . $imageName)
            ]
        ], 200);
    }

    public function deleteProductBySlug($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan!',
            ], 404);
        }

        $product->delete();

        if ($product->image) {
            Storage::delete('public/images/' . $product->image);
        }

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dihapus!',
        ], 200);
    }
}
