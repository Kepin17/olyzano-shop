<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckJWTToken;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CheckoutController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');
    Route::post('/password/reset', [AuthController::class, 'reset_password']);
    Route::post('/password/email/verify', [AuthController::class, 'verify_email_reset_password']);
    Route::get('/verify-email/{token}', [AuthController::class, 'verifyEmail']);

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
        Route::get('/cart', [CartController::class, 'showCart']);
        Route::post('/cart/update', [CartController::class, 'updateCart']);
        Route::post('/cart/remove', [CartController::class, 'removeCart']);
    });
});
