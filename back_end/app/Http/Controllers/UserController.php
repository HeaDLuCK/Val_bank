<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\User_detail;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        if ($id == auth()->id() && !(is_null(User::with('user_detail')->find($id)))) {
            $data = User::with('user_detail')->find($id);
            $contents = Storage::disk('public')->get('images/' . $data->user_detail->avatar_image);
            $base64 = base64_encode($contents);
            $data->user_detail->avatar_image = $base64;
            return response()->json(["payload" => $data], 200);
        } else {
            return response()->json(["message" => "error data not found"], 404);
        }
    }

    public function update(Request $request, string $id)
    {

        if ($id == auth()->id()) {
            validator($request->all(), [
                'username' => 'string',
                'password' => 'string|confirmed|min:8|max:30',
                'first_name' => 'string',
                'last_name' => 'string',
                'cin' => 'string',
                'email' => 'email:rfc,dns',
                'phone_number' => 'string',
                'address' => 'string',
                'avatar_image' => 'image|mimes:jpg,png,jpeg'
            ])->validate();
            if (!(is_null(User::with('user_detail')->find($id)))) {
                DB::beginTransaction();
                try {
                    $user = User::with('user_detail')->find($id);

                    $user->password = $request->password ? bcrypt($request->password) : $user->password;

                    $user->user_detail->first_name = $request->first_name ?? $user->user_detail->first_name;

                    $user->user_detail->last_name = $request->last_name ?? $user->user_detail->last_name;

                    $user->user_detail->cin = $request->cin ?? $user->user_detail->cin;

                    $user->user_detail->email = $request->email ?? $user->user_detail->email;

                    $user->user_detail->phone_number = $request->phone_number ?? $user->user_detail->phone_number;

                    $user->user_detail->address = $request->address ?? $user->user_detail->address;

                    if ($request->hasFile('avatar_image')) {
                        $request->avatar_image->storeAs('public/images', $user->id . '.' . explode('/', $request->avatar_image->getMimeType())[1]);
                    }
                    $user->push();
                    DB::commit();
                    return response()->json(["message" => "infomation updated"], 200);
                } catch (QueryException) {
                    DB::rollback();
                    return response()->json(["message" => "you cant update try again"], 500);
                }
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
