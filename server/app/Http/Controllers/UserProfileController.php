<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProfile;

class UserProfileController extends Controller
{
 
  public function store(Request $request){

    $validated = $request->validate([
      'customer_id' => 'required|exists:users,customer_id|max:255',
      'first_name' => 'required|string|max:255', // pastikan validasi ini ada
      'last_name' => 'required|string|max:255',
      'phone' => 'required|string|max:20',
      'address' => 'required|string',
      'city' => 'required|string|max:100',
      'postal_code' => 'required|string|max:10',
      'country' => 'required|string|max:100',
  ]);

  $profile = UserProfile::create($validated);

  return response()->json($profile, 201);
}

  public function show ($id) {
    $profile = UserProfile::findOrFail($id);
    return response()->json($profile);
  }




}
