<?php

namespace App\Http\Controllers\NoCrud;

use App\Http\Controllers\Controller;
use App\Models\finance_account;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class NoCrudController extends Controller
{

    public function profile()
    {
        $data = User::find(Auth()->id());
        $contents = Storage::disk('public')->get('images/' . $data->user_detail->avatar_image);
        $base64 = base64_encode($contents);
        $data->user_detail->avatar_image = $base64;
        $ids = collect($data->finance_account)->map(function ($elem) {
            return $elem->account_id;
        })->toArray();
        $transaction = Transaction::whereIn('dep_account', $ids)
            ->orwhereIn('arr_account', $ids)
            ->orderBy('transaction_id', 'desc')
            ->take(5)
            ->get();

        $receivers = [];
        $transaction = collect($transaction)->map(function ($elem) use ($ids, &$receivers) {
            if (in_array($elem->depositorAccount->account_id, $ids)) {
                $main = $elem->receiverAccount->user->user_detail;
                $contents = Storage::disk('public')->get('images/' . $main->avatar_image);
                $base64 = base64_encode($contents);
                array_push($receivers, [
                    "account_id" => $elem->receiverAccount->account_id,
                    "avatar" => $base64
                ]);
                $fullname = $main->first_name . " " . $main->last_name;
                return [
                    "transaction_id" => $elem->transaction_id,
                    "name" => $fullname,
                    "avatar" => $base64,
                    "amount" => "-" . $elem->amount,
                    "date" => $elem->created_at
                ];
            } elseif (in_array($elem->receiverAccount->account_id, $ids)) {
                $main = $elem->depositorAccount->user->user_detail;
                $contents = Storage::disk('public')->get('images/' . $main->avatar_image);
                $base64 = base64_encode($contents);

                $fullname = $main->first_name . " " . $main->last_name;

                return [
                    "transaction_id" => $elem->transaction_id,
                    "name" => $fullname,
                    "avatar" => $base64,
                    "amount" => "+" . $elem->amount,
                    "date" => $elem->created_at
                ];
            }
        });
        return response()->json([
            "payload" => [
                "username" => auth()->user()->username,
                "avatar" => $data->user_detail->avatar_image,
                "accounts" => $data->finance_account->makeHidden([
                    'user_id',
                    'balance',
                    'account_type',
                    'account_status',
                    'created_at',
                    'updated_at'
                ]),
                "receivers" => $receivers,
                "transactions" =>   $transaction
            ]
        ], 200);
    }
    public function dashboard(Request $request)
    {
        // is_null($request->endDate);
        // $request->validate([
        //     "startDate" => "required|date",
        //     "endDate" => "required|date"
        // ]);
        // return auth()->id();
        $accounts = User::find(auth()->id())->finance_account->map(function ($elem) {
            return $elem->account_id;
        })->toArray();
        if (in_array($request->account_id, $accounts)) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = $request->endDate != null ? Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay() : Carbon::now()->endOfDay();
            $expenses = Transaction::where("dep_account", $request->account_id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->groupBy("type")
                ->selectRaw('type,sum(amount) as expense')
                ->get();
            $transactionAsReceiver = Transaction::Where("arr_account", $request->account_id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->groupBy("created_at")
                ->selectRaw('created_at as date,sum(amount) as receive')
                ->get()->map(function ($elem) {
                    $elem->date = Carbon::parse($elem->date)->format('Y-m-d');
                    return $elem->toArray();
                });
            

            $transactionAsDepositor = Transaction::Where("dep_account", $request->account_id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->groupBy("created_at")
                ->selectRaw('created_at as date,sum(amount) as sent')
                ->get()->map(function ($elem) {
                    $elem->date = Carbon::parse($elem->date)->format('Y-m-d');
                    return $elem->toArray();
                });

            return response()->json([
                "payload" => [
                    "balance" => finance_account::find($request->account_id)->balance,
                    "expenses" => $expenses,
                    "received" => $transactionAsReceiver,
                    "deposit" => $transactionAsDepositor

                ]
            ], 200);
        } else {
            return response()->json(["message" => "cant reach this data"], 500);
        }
    }

    function UpdatePassword(Request $request)
    {
        validator($request->all(), [
            'password' => 'required|string|confirmed|min:8|max:30',
            "token" => "required"
        ])->validate();
        $resetCheck = DB::table('password_reset_tokens')->where('token', $request->token);
        if (!$resetCheck) {
            return response()->json(["message" => "error occurred  while updating password"], 401);
        }
        $user = User::join('user_details', 'user_details.user_id', '=', 'users.id')->first();
        $user->password = bcrypt($request->password);
        $user->save();
        $resetCheck->delete();
        return response()->json(["message" => "password updated successfully"], 201);
    }



    function AccountsIds()
    {
        $accounts = Auth()->user()->finance_account->map(function ($elem) {
            return $elem->account_id;
        })->toArray();
        return response()->json(['accounts' => $accounts]);
    }
}
