<?php

namespace App\Http\Controllers;

use App\Models\finance_account;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?? 10;
        $page = $request->page ?? 1;
        $data = User::find(Auth()->id());
        $query = Transaction::query();
        if ($request->has('date') and $request->date != '') {
            $query->whereDate('created_at', "=", Carbon::parse($request->date)->toDateString());
        }
        if ($request->has('account') and $request->account != '') {
            $ids = [$request->account];
            $query->where(function ($query) use ($ids) {
                $query->whereIn('dep_account', $ids)
                    ->orwhereIn('arr_account', $ids);
            });
        } else {
            $ids = collect($data->finance_account)->map(function ($elem) {
                return $elem->account_id;
            })->toArray();
            $query->where(function ($query) use ($ids) {
                $query->whereIn('dep_account', $ids)
                    ->orwhereIn('arr_account', $ids);
            });
        }
        $transaction = clone $query;
        $count = $query->count();
        if ($count == 0) {
            return response()->json([
                "payload" => [
                    "transactions" => [],
                    "last_page" => 1
                ]
            ], 200);
        }

        $lastPage = ceil($count / $limit);
        if ($page <= $lastPage) {
            $transaction = $transaction->orderBy('transaction_id', 'desc')
                ->offset(($page - 1) * $limit)
                ->take($limit)
                ->get();
            $transaction = collect($transaction)->map(function ($elem) use ($ids) {
                if (in_array($elem->depositorAccount->account_id, $ids)) {
                    $main = $elem->receiverAccount->user->user_detail;
                    $contents = Storage::disk('public')->get('images/' . $main->avatar_image);
                    $base64 = base64_encode($contents);

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
                        "description" => $elem->description,
                        "date" => $elem->created_at
                    ];
                }
            });
            return response()->json([
                "payload" => [
                    "transactions" => $transaction,
                    "last_page" => $lastPage
                ]
            ], 200);
        } else {
            return response()->json(["message" => "no more data"], 500);
        }
    }

    /*
    */

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        validator($request->all(), [
            "dep_account" => 'required|exists:App\Models\Finance_account,account_id',
            "arr_account" => 'required|exists:App\Models\Finance_account,account_id',
            "amount" => 'required|decimal:1,9',
            "type" => 'sometimes|string',
            "description" => 'string'
        ])->validate();
        $accounts = Auth()->user()->finance_account->map(function ($elem) {
            return $elem->account_id;
        })->toArray();
        /* if dep account is in accounts and arr account is not in accounts then we can do transaction */
        DB::beginTransaction();
        try {
            if (
                in_array($request->dep_account, $accounts) and
                !in_array($request->arr_account, $accounts)
            ) {
                $dep_acc = finance_account::find($request->dep_account);
                $arr_acc = finance_account::find($request->arr_account);
                if ($request->amount > $dep_acc->balance) {
                    throw new Exception('enough  balance');
                } else {
                    $dep_acc->balance = $dep_acc->balance - $request->amount;
                    $arr_acc->balance = $arr_acc->balance + $request->amount;
                    $dep_acc->save();
                    $arr_acc->save();
                    $transaction = new Transaction();
                    $transaction->dep_account = $dep_acc->account_id;
                    $transaction->arr_account = $arr_acc->account_id;
                    $transaction->amount = $request->amount;
                    $transaction->type = $request->type;
                    $transaction->description = $request->description;
                    $transaction->save();
                    DB::commit();
                    return response()->json(["message" => 'transaction successfully done'], 200);
                }
            } else {
                return response()->json(["message" => 'cant send to your self/ or bad request'], 500);
            }
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(["message" => $e->getMessage()], 500);
        } catch (QueryException) {
            DB::rollback();
            return response()->json(["message" => "cant insert data check inputs"], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        return response()->json(["payload" => $transaction], 200);
    }
}
