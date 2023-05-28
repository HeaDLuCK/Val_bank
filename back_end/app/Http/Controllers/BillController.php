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
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        validator($request->all(), [
            "facture" => 'required|file|mimes:xls,xlsx'
        ])->validate();
        try {
            Excel::import(new ImportBills, $request->file('facture'));
            return response()->json(["message" => "data inserted successfully"], 200);
        } catch (Exception) {
            return response()->json(["message" => "check your file data  the column need to be company,amount,date_of_bill,payment_deadline"], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bill $bill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill)
    {
        //
    }
}
