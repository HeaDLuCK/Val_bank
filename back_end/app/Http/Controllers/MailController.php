<?php

namespace App\Http\Controllers;

use App\Mail\ValMail;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class MailController extends Controller
{
    function ResetPassword(Request $request)
    {
        validator($request->all(), [
            "email" => 'required|exists:App\Models\User_detail,email'
        ])->validate();
        try {
            $token = Str::random(64);
            DB::table('password_reset_tokens')->insert([
                "email" => $request->email,
                "token" => $token,
                "created_at" => Carbon::now()
            ]);
            Mail::to($request->email)->send(new ValMail($token));
            return response()->json(["message" => "password reset request sent"], 200);
        } catch (QueryException) {
            return response()->json(["message" => "the email was sent please be patience"], 200);
        };
    }
}
