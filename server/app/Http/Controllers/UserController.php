<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function register(Request $request) {
        $user = new User;
        $user->customer_id= $request->input('customer_id');
        $user->username= $request->input('username');
        $user->email= $request->input('email');
        $user->password= Hash::make($request->input('password'));
        $user->role= $request->input('role');
        $user->activated= $request->input('activated');
        $user->save();
        return $user;
    }

    function login(Request $request) {

        $user = User::where('email', $request->email)->first();

        return $user;
    }
}
