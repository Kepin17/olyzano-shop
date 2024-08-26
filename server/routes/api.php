<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['auth:api', 'check.jwt.token'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('check.jwt.token');
        Route::get('/products', [ProductController::class, 'showAllProduct'])->middleware('check.jwt.token');
        Route::post('/product', [ProductController::class, 'addProduct'])->middleware('check.jwt.token');
        Route::get('/product/{slug}', [ProductController::class, 'showProductBySlug'])->middleware('check.jwt.token');
        Route::post('/product/{slug}', [ProductController::class, 'updateProductBySlug'])->middleware('check.jwt.token');
        Route::delete('/product/{slug}', [ProductController::class, 'deleteProductBySlug'])->middleware('check.jwt.token');
    });
});
