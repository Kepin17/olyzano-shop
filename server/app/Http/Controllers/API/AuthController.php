<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users|max:20',
            'email' => 'required|email|unique:users|max:50',
            'password' => 'required|min:8',
            'role' => 'required',
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

        $success['username'] = $user->username;

        return response()->json([
            'success' => true,
            'message' => 'Registrasi Berhasil!',
            'data' => $success
        ], 201);
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $auth = Auth::user();
            $success['email'] = $auth->username;
            $success['username'] = $auth->username;
            $success['created_at'] = $auth->created_at;

            return response()->json([
                'success' => true,
                'message' => 'Login Berhasil!',
                'data' => $success
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Login Gagal!',
                'data' => 'Email atau Password Salah!'
            ], 401);
        }
    }
}
