<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckJWTToken;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify_email_reset_password', [AuthController::class, 'verify_email_reset_password']);
    Route::post('/reset_password', [AuthController::class, 'reset_password']);

    Route::middleware(['check.jwt.token'])->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/products', [ProductController::class, 'showAllProduct']);
        Route::post('/product', [ProductController::class, 'addProduct']);
        Route::get('/product/{slug}', [ProductController::class, 'showProductBySlug']);
        Route::post('/product/{slug}', [ProductController::class, 'updateProductBySlug']);
        Route::delete('/product/{slug}', [ProductController::class, 'deleteProductBySlug']);
        Route::get('/flash-sale-products', [ProductController::class, 'showFlashSaleProducts']);

        Route::post('/cart', [CartController::class, 'addToCart']);
        Route::get('/cart/{id}', [CartController::class, 'showCart']);
    });
});
