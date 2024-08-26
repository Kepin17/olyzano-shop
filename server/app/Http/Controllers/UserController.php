<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function register(Request $request) {
        $user = new User;
        $user->username= $request->input(key:'username');
        $user->email= $request->input(key:'email');
        $user->password= Hash::make($request->input(key:'password'));
        $user->role= $request->input(key:'role');
        $user->activated= $request->input(key:'activated');
        $user->save();
        return $user;
    }

    function login(Request $request) {

        if(!Auth::attempt($request->only(keys:'email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], status:401);
        }

        $user = Auth::user();

        return $user;
    }
}
