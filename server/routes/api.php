<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\UserController;
use  App\Http\Controllers\UserProfileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/register" , [UserController::class, "register"]);

Route::post("/login" , [UserController::class, "login"]);

Route::post("/user-profile" , [UserProfileController::class, "store"]);
Route::get("/user-profile/{customer_id}" , [UserProfileController::class, "show"]);


