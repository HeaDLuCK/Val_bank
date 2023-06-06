<?php

namespace App\Http\Controllers;

use App\Imports\ImportBills;
use App\Models\Bill;
use Exception;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["payload" => Bill::all()], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        validator($request->all(), [
            "facture" => 'required|file|mimes:xls,xlsx'
        ])->validate();
        // try {
            Excel::import(new ImportBills, $request->file('facture'));
            return response()->json(["message" => "data inserted successfully"], 200);
        // } catch (Exception $e) {
        //     return $e;
        //     return response()->json(["message" => "check your file data  the column need to be company,amount,date_of_bill,payment_deadline"], 500);
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        if (!$bill) {
            return response()->json(["message" => "bill not found"], 404);
        }
        return response()->json(["payload" => $bill], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bill $bill)
    {
        if (!$bill) {
            return response()->json(["message" => "bill not found"], 404);
        }
        validator($request->all(), [
            "payment_date" => 'required|date'
        ])->validate();
        $bill->payment_date = $request->payment_date;
        $bill->save();
        return response()->json(["message" => "bill updated successfully"], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill)
    {
        if (!$bill) {
            return response()->json(["message" => "bill not found"], 404);
        }
        $bill->delete();
        return response()->json(["message" => "bill deleted successfully"], 201);
    }
}
