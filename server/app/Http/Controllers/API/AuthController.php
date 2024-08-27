<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
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
        if (empty($data['role'])) {
            $data['role'] = 'customer';
        }

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
        $success['role'] = $user->role;

        return response()->json([
            'success' => true,
            'message' => 'Login Berhasil!',
            'data' => $success
        ], 200);
    }

    public function profile() {
        $success = Auth::user();

        return response()->json([
            'success' => true,
            'message' => 'User Profile',
            'data' => $success
        ], 200);
    }

    public function verify_email_reset_password(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Verifikasi Email Gagal!',
                'data' => "Email Tidak Terdaftar!"
            ], 400);
        }

        try {
            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan token!',
                'data' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Verifikasi Email Berhasil!',
            'data' => [
                'token' => $token,
                'email' => $user->email
            ]
        ], 200);
    }

    public function reset_password(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password'
        ]);

        $user = User::where('email', $request->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password Berhasil direset!',
        ]);
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'success' => true,
                'message' => 'Berhasil Logout!'
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout Gagal!'
            ], 500);
        }
    }
}
