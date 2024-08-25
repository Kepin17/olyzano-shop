<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/products', [ProductController::class, 'showAllProduct']);
        Route::post('/product', [ProductController::class, 'addProduct']);
        Route::get('/product/{slug}', [ProductController::class, 'showProductBySlug']);
        Route::post('/product/{slug}', [ProductController::class, 'updateProductBySlug']);
        Route::delete('/product/{slug}', [ProductController::class, 'deleteProductBySlug']);
    });
});
