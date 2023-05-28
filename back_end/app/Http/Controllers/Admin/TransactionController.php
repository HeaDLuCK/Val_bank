<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\finance_account;
use App\Models\Transaction;
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
        $count = Transaction::count();
        $lastPage = ceil($count / $limit);
        if ($request->page <= $lastPage) {
            $data = Transaction::offset(($page  - 1) * $limit)
                ->take($limit)
                ->get();
            $data = $data->map(function ($elem) {
                // reciever information
                $elem->reciver_id = $elem->receiverAccount->user->id;
                $receiverAccount = $elem->receiverAccount->user->user_detail;
                $elem->reciver_name = $receiverAccount->first_name . ' ' . $receiverAccount->last_name;
                $contents = Storage::disk('public')->get('images/' . $receiverAccount->avatar_image);
                $base64 = base64_encode($contents);
                $elem->reciver_avatar = $base64;

                // depositor information
                $elem->depositor_id = $elem->depositorAccount->user->id;
                $depositorAccount = $elem->depositorAccount->user->user_detail;
                $elem->depositor_name = $depositorAccount->first_name . ' ' . $depositorAccount->last_name;
                $contents = Storage::disk('public')->get('images/' . $depositorAccount->avatar_image);
                $base64 = base64_encode($contents);
                $elem->depositor_avatar = $base64;

                return $elem->makeHidden(['receiverAccount', 'depositorAccount']);
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        validator($request->all(), [
            "dep_account" => 'required|string',
            "arr_account" => 'required|string',
            "amount" => 'required|decimal:1,9',
            "type" => 'required|string',
            "description" => 'string'
        ])->validate();
        DB::beginTransaction();
        try {
            if ($request->dep_account != $request->arr_account) {
                $dep_acc = finance_account::find($request->dep_account);
                $arr_acc = finance_account::find($request->arr_account);
                if (!(is_null($dep_acc)) && !(is_null($arr_acc))) {
                    return ['message' => 'undefiend destination'];
                } else {
                    if ($request->amount > $dep_acc->balance) {
                        throw new Exception('enough  balance');
                    } else {
                        $dep_acc->balance = $dep_acc->balance - $request->amount;
                        $arr_acc->balance = $arr_acc->balance + $request->amount;
                        $dep_acc->save();
                        $arr_acc->save();
                        $transaction = new Transaction();
                        $transaction->dep_acc = $dep_acc->account_id;
                        $transaction->arr_acc = $arr_acc->account_id;
                        $transaction->amount = $request->amount;
                        $transaction->type = $request->type;
                        $transaction->description = $request->description;
                        DB::commit();
                        return response()->json(["message" => 'transaction successfully done'], 200);
                    }
                }
            } else {
                return response()->json(["message" => 'cant send to your self'], 500);
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





    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {

        validator($request->all(), [
            "arr_account" => 'sometimes|string',
            "amount" => 'sometimes|decimal:1,9',
            "type" => 'sometimes|string',
            "description" => 'sometimes|string'
        ])->validate();
        DB::beginTransaction();
        try {
            $new_acc_arr = finance_account::find($request->input('arr_account', $transaction->arr_account));
            $helper = false;
            if ($transaction->arr_account != $request->input('arr_account', $transaction->arr_account)) {
                $helper = true;
                if (!(is_null($new_acc_arr))) {
                    $old_acc_arr = finance_account::find($transaction->arr_account);
                    $old_acc_arr->balance = $old_acc_arr->balance - $transaction->amount;
                    $old_acc_arr->save();
                } else {
                    throw new Exception('undefiend user');
                }
            }

            if ($transaction->amount != $request->input('amount', $transaction->amount)) {
                $dep_acc = finance_account::find($transaction->dep_acount);
                $rest = $request->amount - $transaction->amount;
                if ($dep_acc->balance < $rest) {
                    throw new Exception('balance is not enough');
                } else {
                    $dep_acc->balance = $dep_acc->balance - $rest;
                    $dep_acc->save();
                    if ($helper) {
                        $new_acc_arr->balance = $new_acc_arr->balance + $request->amount;
                        $new_acc_arr->save();
                    } else {
                        $new_acc_arr->balance = $new_acc_arr->balance + $rest;
                        $new_acc_arr->save();
                    }
                }
            }
            $transaction->arr_account = $request->input('arr_account', $transaction->arr_account);
            $transaction->amount = $request->input('amount', $transaction->amount);
            $transaction->type =  $request->input('type', $transaction->type);
            $transaction->description =  $request->input('description', $transaction->description);
            $transaction->save();
            DB::commit();
            return response()->json(['message' => "transaction updated successfully"], 202);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(["message" => $e->getMessage()], 500);
        } catch (QueryException) {
            DB::rollback();
            return response()->json(["message" => "cant update data check inputs"], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        DB::beginTransaction();
        try {
            $dep_acc = finance_account::find($transaction->dep_account);
            $arr_acc = finance_account::find($transaction->arr_account);
            $dep_acc->balance = $dep_acc->balance + $transaction->amount;
            $dep_acc->save();
            $arr_acc->balance = $arr_acc->balance - $transaction->amount;
            $arr_acc->save();
            $transaction->delete();
            DB::commit();
            return response()->json(["message" => "deleted successfully"], 200);
        } catch (QueryException) {
            DB::rollback();
            return response()->json(["message" => "cant Delete data try after 5 minute"], 500);
        }
    }
}
