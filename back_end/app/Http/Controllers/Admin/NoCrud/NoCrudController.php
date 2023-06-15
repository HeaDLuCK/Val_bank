<?php

namespace App\Http\Controllers\admin\NoCrud;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
    function AdminDashboard()
    {
        $users = User::count();
        $agents = User::where('role', 'agent')->count();
        $register = User::whereDate('created_at', Carbon::today())->count();
        $transactions = Transaction::orderBy('created_at')->get()->groupBy(function ($item) {
            return $item->created_at->format('Y-m-d');
        })->map(function ($elem) {
            return count($elem);
        });


        return response()->json(["payload" => [
            "users" => $users,
            "agents" => $agents,
            "register" => $register,
            "transaction" => $transactions
        ]], 200);
    }
}
