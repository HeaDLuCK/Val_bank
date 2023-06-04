<?php

namespace App\Http\Controllers\authentication;

use App\Enums\GenderEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\User_detail;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;

use function PHPSTORM_META\map;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // return $request;
        $fields = $request->validate(
            [
                'username' => 'required|string',
                'password' => 'required|string|confirmed|min:8|max:30',
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'birthday' => 'required|date',
                'cin' => 'required|string',
                'email' => 'required|email:rfc,dns',
                'phone_number' => 'required|string',
                'city' => 'required|string',
                'address' => 'required|string',
                'gender' => [new Enum(GenderEnum::class)],
                'code_postal' => 'required|string',
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
                'city' => $fields['city'],
                'gender' => $fields['gender'],
                'code_postal' => $fields['code_postal'],
                'avatar_image' => $user->id . '.' . explode('/', $fields['avatar_image']->getMimeType())[1]
            ]);
            $fields['avatar_image']->storeAs('public/images', $user->id . '.' . explode('/', $fields['avatar_image']->getMimeType())[1]);
            DB::commit();
            return response()->json(['message' => 'account successfully created'], 201);
        } catch (QueryException $e) {
            DB::rollback();
            $error = '';
            if ($e->errorInfo[1] == 1062) {
                $error = "duplicated Entry";
            } else {
                $error = "cant insert data in database check inputs";
            }
            return response()->json(['message' => $error], 400);
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
            return response()->json([
                "accounts" => $user->finance_account->map(function ($account) {
                    return $account->account_id;
                }),
                "user_role" => $user->role,
                "token" => $user->createToken(time())->plainTextToken,
                "message" => "You are successfully logged in "
            ], 202);
        } else {
            return response()->json(["message" => 'verify your username and password'], 401);
        }
    }


    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json(["message" => "log out"], 200);
    }
}
