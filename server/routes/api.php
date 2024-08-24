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
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/products', [ProductController::class, 'showAllProduct']);
    Route::post('/product', [ProductController::class, 'addProduct']);
});

// Route::post("/login" , [UserController::class, "login"]);
// Route::post("/user-profile" , [UserProfileController::class, "store"]);
// Route::get("/user-profile/{customer_id}" , [UserProfileController::class, "show"]);
