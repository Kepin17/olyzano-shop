<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\EmailVerification;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Auth\Notifications\VerifyEmail;

class AuthController extends Controller
{
    private function getLockoutTime($key)
    {
        $attempts = RateLimiter::attempts($key);
        $multiplier = floor(($attempts - 5) / 5) + 1;
        return min(60 * $multiplier, 60 * 60); // Maximum lockout time is 1 hour
    }

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
        $token = Str::random(32);
        $user->update(['verification_token' => $token]);

        $verificationUrl = url("/api/v1/verify-email/{$token}");
        Mail::to($user->email)->send(new EmailVerification($user, $verificationUrl));

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

        if (!$user->email_verified_at) {
            return response()->json([
                'success' => false,
                'message' => 'Email Belum Diverifikasi!',
                'data' => 'Silakan verifikasi email Anda terlebih dahulu.'
            ], 403);
        }

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

    public function profile()
    {
        $success = Auth::user();

        return response()->json([
            'success' => true,
            'message' => 'User Profile',
            'data' => $success
        ], 200);
    }

    public function verifyEmail($token)
    {
        $user = User::where('verification_token', $token)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Token Verifikasi Tidak Valid!'
            ], 400);
        }

        $user->update([
            'email_verified_at' => now(),
            'verification_token' => null
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Email Berhasil Diverifikasi!'
        ]);
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
