<?php

namespace App\Listeners;

use App\Events\AutoPayActivated;
use App\Models\Bill;
use App\Models\finance_account;
use App\Models\Transaction;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ScheduleMonthlyPayment
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(AutoPayActivated $event): void
    {
        //
        $auto_pay_account = $event->account;
        $today = Carbon::now()->toDateString();
        if ($auto_pay_account->pay_day == $today) {
            $bill = Bill::whereDate("date_of_bill", "=", $auto_pay_account->pay_day)
                ->where('pay_code', $auto_pay_account->pay_code)
                ->whereNull('payment_date')
                ->first();
            DB::beginTransaction();
            try {
                $bill->payment_date = $today;
                $bill->save();

                $dep_acc = finance_account::find($auto_pay_account->acc_id);
                $arr_acc = finance_account::where("account_type", $bill->company)->first();
                if ($bill->amount > $dep_acc->balance) {
                    throw new Exception('enough  balance');
                } else {
                    $dep_acc->balance = $dep_acc->balance - $bill->amount;
                    $arr_acc->balance = $arr_acc->balance + $bill->amount;
                    $dep_acc->save();
                    $arr_acc->save();
                    $transaction = new Transaction();
                    $transaction->dep_acc = $dep_acc->account_id;
                    $transaction->arr_acc = $arr_acc->account_id;
                    $transaction->amount = $bill->amount;
                    $transaction->type = "FACTURE";
                    $transaction->description = "$bill->company AUTO FACTURE";
                    DB::commit();
                    Log::info("submitted");
                }
            } catch (Exception) {
                Log::error("cannot submit this transaction due to something happens");
            };
        }
    }
}
