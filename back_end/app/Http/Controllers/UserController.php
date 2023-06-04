<?php

namespace App\Http\Controllers;

use App\Enums\GenderEnum;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Enum;

class UserController extends Controller
{

    /**
     * Display the specified resource.
     */
    public function index()
    {
        //
        $data = User::with('user_detail')->find(auth()->id());
        $contents = Storage::disk('public')->get('images/' . $data->user_detail->avatar_image);
        $base64 = base64_encode($contents);
        $data->user_detail->avatar_image = $base64;
        return response()->json(["payload" => $data], 200);
    }

    public function update(Request $request)
    {


        validator($request->all(), [
            'username' => 'sometimes|string',
            'password' => 'sometimes|string|confirmed|min:8|max:30',
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'birthday' => 'sometimes|date',
            'cin' => 'sometimes|string',
            'email' => 'sometimes|email:rfc,dns',
            'phone_number' => 'sometimes|string',
            'city' => 'sometimes|string',
            'address' => 'sometimes|string',
            'gender' => [new Enum(GenderEnum::class)],
            'code_postal' => 'sometimes|string',
            'avatar_image' => 'sometimes|image|mimes:jpg,png,jpeg'
        ])->validate();
        DB::beginTransaction();
        try {
            $user = User::with('user_detail')->find(auth()->id());

            $user->password = $request->password ? bcrypt($request->password) : $user->password;

            $user->user_detail->first_name = $request->input('first_name', $user->user_detail->first_name);

            $user->user_detail->last_name = $request->input('last_name', $user->user_detail->last_name);

            $user->user_detail->cin = $request->input('cin', $user->user_detail->cin);

            $user->user_detail->email = $request->input('email', $user->user_detail->email);

            $user->user_detail->phone_number = $request->input('phone_number', $user->user_detail->phone_number);

            $user->user_detail->address = $request->input('address', $user->user_detail->address);
            $user->user_detail->city = $request->input('city', $user->user_detail->city);
            $user->user_detail->gender = $request->input('gender', $user->user_detail->gender);
            $user->user_detail->code_postal = $request->input('code_postal', $user->user_detail->code_postal);

            if ($request->hasFile('avatar_image')) {
                $request->avatar_image->storeAs('public/images', $user->id . '.' . explode('/', $request->avatar_image->getMimeType())[1]);
            }
            $user->push();
            DB::commit();
            return response()->json(["message" => "infomation updated"], 201);
        } catch (QueryException) {
            DB::rollback();
            return response()->json(["message" => "you cant update try again"], 500);
        }
    }
}
