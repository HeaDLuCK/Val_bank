<?php

namespace App\Http\Controllers\authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\User_detail;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate(
            [
                'username' => 'required|string',
                'password' => 'required|string|confirmed|min:8|max:30',
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'birthday' => 'required',
                'cin' => 'required|string',
                'email' => 'required|email:rfc,dns',
                'phone_number' => 'required|string',
                'address' => 'string',
                'avatar_image' => 'required|image|mimes:jpg,png,jpeg'
            ]
        );

        DB::beginTransaction();
        try {
            $user = User::create([
                'username' => $fields['username'],
                'password' => bcrypt($fields['password'])
            ]);

            User_detail::create([
                'user_id' => $user->id,
                'first_name' => $fields['first_name'],
                'last_name' => $fields['last_name'],
                'birthday' => $fields['birthday'],
                'cin' => $fields['cin'],
                'email' => $fields['email'],
                'phone_number' => $fields['phone_number'],
                'address' => $fields['address'],
                'avatar_image' => $user->id . '.' . explode('/', $fields['avatar_image']->getMimeType())[1]
            ]);
            $fields['avatar_image']->storeAs('public/images', $user->id . '.' . explode('/', $fields['avatar_image']->getMimeType())[1]);
            DB::commit();
            return ["status" => 300, 'message' => 'account successfully created'];
        } catch (QueryException $e) {
            DB::rollback();
            $error = '';
            if ($e->errorInfo[1] == 1062) {
                $error = "duplicated Entry";
            } else {
                $error = "cant insert data in database check inputs";
            }
            return ["status" => 500, 'message' => $error];
        }
    }


    public function login(Request $request)
    {
        $request->validate(
            [
                'username' => 'required',
                'password' => 'required'
            ]
        );
        $user = User::where('username', request('username'))->first();
        if ($user != null and Hash::check(request('password'), $user->getAuthPassword())) {
            return ["status" => 300, "token" => $user->createToken(time())->plainTextToken];
        } else {
            return ["status" => 400, "message" => 'verify your username and password'];
        }
    }


    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();
        return ["status" => 200, "message" => "log out"];
    }
}
