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
    public function index(Request $request)
    {
        $limit = $request->limit ?? 10;
        $page = $request->page ?? 1;
        //
        $count = User::count();
        $lastPage = ceil($count / $limit);
        if ($request->page <= $lastPage) {
            $data = User::with('user_detail')->offset(($page  - 1) * $limit)
                ->take($limit)
                ->get();
            // map function
            $data->map(function ($elem) {
                $elem->user_detail->total_accounts = count($elem->finance_account);
                if (count($elem->finance_account)) {
                    $elem->finance_account->map(function ($t) use ($elem) {
                        $elem->user_detail->total_transactions = count($t->transactionsAsDepositor);
                    });
                } else {
                    $elem->user_detail->total_transactions = 0;
                }
                $image = $elem->user_detail->avatar_image;
                $contents = Storage::disk('public')->get('images/' . $image);
                $base64 = base64_encode($contents);
                $elem->user_detail->avatar_image = $base64;
                return $elem->makeHidden('finance_account');
            });
            return response()->json([
                "payload" => [
                    "last_page" => $lastPage,
                    "data" => $data
                ]
            ], 200);
        } else {
            return response()->json(["message" => "no more data"], 204);
        }
    }

    /**
     * Display the specified resource.
     */

    public function update(Request $request, string $id)
    {
        if (!(User::find($id))) {
            return response()->json(["message" => "user not found"], 404);
        }

        validator($request->all(), [
            'username' => 'sometimes|string',
            'password' => 'sometimes|string|confirmed|min:8|max:30',
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'cin' => 'sometimes|string',
            'email' => 'sometimes|email:rfc,dns',
            'phone_number' => 'sometimes|string',
            'address' => 'sometimes|string',
            'avatar_image' => 'sometimes|image|mimes:jpg,png,jpeg'
        ])->validate();


        DB::beginTransaction();
        try {
            $user = User::with('user_detail')->find($id);

            $user->password = $request->password ? bcrypt($request->password) : $user->password;

            $user->user_detail->first_name = $request->input('first_name', $user->user_detail->first_name);

            $user->user_detail->last_name = $request->input('last_name', $user->user_detail->last_name);

            $user->user_detail->cin = $request->input('cin', $user->user_detail->cin);

            $user->user_detail->email = $request->input('email', $user->user_detail->email);

            $user->user_detail->phone_number = $request->input('phone_number', $user->user_detail->phone_number);

            $user->user_detail->address = $request->input('address', $user->user_detail->address);

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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $user = User::find($id);
        if (!$user) {
            return response()->json(["message" => "user not found"], 404);
        }
        $user->delete();
        return response()->json(["message" => "deleted successfully"], 200);
    }
}
