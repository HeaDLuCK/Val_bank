<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\finance_account;
use App\Models\Transaction;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return ["status" => 200, "payload" => Transaction::with('category')->get()];
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        validator($request->all(), [
            "dep_account" => 'required|string',
            "arr_account" => 'required|string',
            "amount" => 'required|decimal:2',
            "category" => 'required|string',
            "description" => 'string'
        ])->validate();
        DB::beginTransaction();
        try {
            if ($request->dep_account != $request->arr_account) {
                $cat = Category::where([
                    ['category', $request->category],
                    ['user_id', auth()->id()]
                ])->first();
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
                        $transaction->dep_acc = $dep_acc->id;
                        $transaction->arr_acc = $arr_acc->id;
                        $transaction->amount = $request->amount;
                        $transaction->category = $cat->id;
                        $transaction->description = $request->description;
                        DB::commit();
                        return ["status" => 200, "payload" => [], "message" => 'transaction successfully done'];
                    }
                }
            } else {
                return ["status" => 403, "payload" => [], "message" => 'cant send to your self'];
            }
        } catch (Exception $e) {
            DB::rollback();
            return ["status" => 403, "payload" => [], "message" => $e->getMessage()];
        } catch (QueryException) {
            DB::rollback();
            return ["status" => 403, "payload" => [], "message" => "cant insert data check inputs"];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        return ["status" => 200, "payload" => Transaction::with('category')->find($transaction)];
    }


    /**
     * Display the specified resource.
     */
    public function show_by_category(string $category)
    {
        $cat = Category::where('category', $category);
        $data = Transaction::where('category_id', $cat->id)->with('category')->get();
        return ["status" => 200, "payload" => $data, "message" => "data successfully recieved"];
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        validator($request->all(), [
            "arr_account" => 'required|string',
            "amount" => 'required|decimal:2',
            "category" => 'required|string',
            "description" => 'string'
        ])->validate();
        DB::beginTransaction();
        try {
            $new_acc_arr = finance_account::find($request->arr_acount);
            $helper = false;
            if ($transaction->arr_acount != $request->arr_account) {
                $helper = true;
                if (!(is_null($new_acc_arr))) {
                    $old_acc_arr = finance_account::find($transaction->arr_acount);
                    $old_acc_arr->balance = $old_acc_arr->balance - $transaction->amount;
                    $old_acc_arr->save();
                } else {
                    throw new Exception('undefiend user');
                }
            }
            if ($transaction->amount != $request->amount) {
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
            $transaction->arr_account = $request->arr_acount;
            $transaction->amount = $request->amount;
            $transaction->category = $request->category;
            $transaction->description = $request->description;
            $transaction->save();
            DB::commit();
            return ["status" => 150, "payload" => [], 'message' => "transaction updated successfully"];
        } catch (Exception $e) {
            DB::rollback();
            return ["status" => 150, "payload" => [], "message" => $e->getMessage()];
        } catch (QueryException) {
            DB::rollback();
            return ["status" => 150, "payload" => [], "message" => "cant update data check inputs"];
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        DB::beginTransaction();
        try {
            $dep_acc = finance_account::find($transaction->dep_acc);
            $arr_acc = finance_account::find($transaction->arr_acc);
            $dep_acc->balance = $dep_acc->balance + $transaction->amount;
            $dep_acc->save();
            $arr_acc->balance = $arr_acc->balance - $transaction->amount;
            $arr_acc->save();
            $transaction->delete();
            DB::commit();
            return ["message" => "deleted successfully"];
        } catch (QueryException) {
            DB::rollback();
            return ["status" => 150, "payload" => [], "message" => "cant Delete data try after 1 minute"];
        }
    }
}
