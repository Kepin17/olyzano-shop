<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users|max:20',
            'email' => 'required|email|unique:users|max:50',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi Kesalahan!',
                'data' => $validator->errors()
            ], 401);
        }

        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi Berhasil!',
            'data' => $user->only('email', 'username')
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Login Gagal!',
                'data' => 'Email atau Password Salah!'
            ], 401);
        }

        $user = Auth::user();
        $success['token'] = $token;
        $success['username'] = $user->username;
        $success['email'] = $user->email;

        return response()->json([
            'success' => true,
            'message' => 'Login Berhasil!',
            'data' => $success
        ], 200);
    }
}
