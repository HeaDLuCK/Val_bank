<?php

namespace App\Http\Controllers;

use App\Events\AutoPayActivated;
use App\Mail\NotificationMail;
use App\Models\AutoPay;
use App\Models\Bill;
use App\Models\finance_account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AutoPayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accs = collect(auth()->user()->finance_account)->map(function ($acc) {
            return $acc->account_id;
        })->toArray();
        return response()->json(["payload" => AutoPay::whereIn('acc_id', $accs)->get()]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        validator([
            "acc_id" => "required|exists:App/Models/Finance_account,account_id",
            "pay_code" => "required",
            "pay_day" => "required|date"
        ])->validate();
        // check first
        $accs = collect(auth()->user()->finance_account)->map(function ($acc) {
            return $acc->account_id;
        })->toArray();
        if (!in_array($request->acc_id, $accs)) {
            return response()->json(["message" => "choose your account"], 401);
        }
        $bill = Bill::where("pay_code", $request->pay_code)->first();
        if (!$bill) {
            return response()->json(["message" => "this facture doesn't exist"], 401);
        }

        // create auto pay to work each month (first step)
        $newOne = new AutoPay();
        $newOne->acc_id = $request->acc_id;
        $newOne->pay_code = $request->pay_code;
        $newOne->pay_day = $request->pay_day;
        $newOne->save();

        event(new AutoPayActivated($newOne));
        Mail::to(auth()->user()->user_detail->email)->send(new NotificationMail());
        return response()->json(["message" => "auto pay activated successfully"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AutoPay $autoPay)
    {
        return  response()->json(["payload" => finance_account::find($autoPay)], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AutoPay $autoPay)
    {
        validator([
            "pay_code" => "required",
            "pay_day" => "required|date"
        ])->validate();

        // check for bill if it exist
        $bill = Bill::where("pay_code", $request->pay_code)->first();
        if (!$bill) {
            return response()->json(["message" => "this facture doesn't exist"], 401);
        }
        $autoPay->pay_code = $request->pay_code;
        $autoPay->pay_day = $request->pay_day;
        $autoPay->save();
        return response()->json(["message" => "auto pay updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AutoPay $autoPay)
    {
        finance_account::find($autoPay)->delete();
    }
}
