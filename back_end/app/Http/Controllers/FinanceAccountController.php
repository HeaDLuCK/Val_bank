<?php

namespace App\Http\Controllers;


use App\Models\Finance_account;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;

class FinanceAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data=Finance_account::where("user_id", Auth()->id())->get();
        return response()->json(["payload" =>$data ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        validator($request->all(), [
            "account_name" => 'required|string',
            "balance" => 'required|decimal:1,9',
            "account_type" => 'required|string',
            "account_status" => 'required|boolean'
        ])->validate();
        DB::beginTransaction();
        try {
            $finance_acc = new Finance_account();
            $finance_acc->user_id = Auth()->id();
            $finance_acc->account_name = $request->account_name;
            $finance_acc->balance = $request->balance;
            $finance_acc->account_type = $request->account_type;
            $finance_acc->account_status = $request->account_status;
            $finance_acc->save();
            DB::commit();
            return response()->json(["message" => "data saved successfully"], 200);
        } catch (QueryException) {
            DB::rollback();
            return response()->json(["message" => "error occurred  while inserting data"], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(finance_account $finance_account)
    {
        return response()->json(["payload" => $finance_account], 200);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, finance_account $finance_account)
    {
        validator($request->all(), [
            "account_name" => 'sometimes|string',
            "balance" => 'sometimes|decimal:1,9',
            "account_status" => 'sometimes|boolean'
        ])->validate();
        DB::beginTransaction();
        try {
            $finance_account->update($request->all());
            DB::commit();
            return response()->json(["message" => "data updated successfully"], 200);
        } catch (QueryException) {
            DB::rollback();
            return response()->json(["message" => "error occurred  while updatin data"], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(finance_account $finance_account)
    {
        try {
            $finance_account->delete();
            return response()->json(["message" => "data deleted successfully"], 200);
        } catch (QueryException) {

            return response()->json(["message" => "error occurred  while deletiing data"], 500);
        }
    }
}
