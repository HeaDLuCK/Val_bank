<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = User::with('user_detail')->get();
        // map function
        $data->map(function ($elem) {
            $image = $elem->user_detail->avatar_image;
            $contents = Storage::disk('public')->get('images/' . $image);
            $base64 = base64_encode($contents);
            // $elem->user_detail->avatar_image
            $elem->user_detail->avatar_image = $base64;
            return $elem;
        });
        return response()->json(["payload" => $data],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        if (!(is_null(User::with('user_detail')->find($id)))) {
            $data = User::with('user_detail')->find($id);
            $contents = Storage::disk('public')->get('images/' . $data->user_detail->avatar_image);
            $base64 = base64_encode($contents);
            $data->user_detail->avatar_image = $base64;
            return response()->json(["payload" => $data],200);
        }
    }

    public function update(Request $request, string $id)
    {

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
                return response()->json(["message" => "infomation updated"], 202);
            } catch (QueryException) {
                DB::rollback();
                return response()->json(["message" => "you cant update try again"], 300);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        if (is_null(User::find($id))) {
            User::find($id)->user_detail()->delete();
            return response()->json(["message" => "deleted successfully"], 200);
        }
    }
}
