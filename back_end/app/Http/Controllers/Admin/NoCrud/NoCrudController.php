<?php

namespace App\Http\Controllers\admin\NoCrud;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class NoCrudController extends Controller
{
    function SwitchStatus(String $id)
    {
        if (intval(auth()->id()) == intval($id)) {
            return response()->json(["message" => "you cant switch status of this account"], 401);
        }
        $user = User::find($id);
        if ($user->user_status) {
            $user->user_status = false;
        } else {
            $user->user_status = true;
        }
        $user->save();
        return response()->json(["message" => "user status switched successfully"]);
    }
}
