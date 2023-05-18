<?php

namespace App\Http\Controllers;

use App\Models\Finance_account;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class FinanceAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Finance_account::with(['transactionsAsDepositor'])->get();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(finance_account $finance_account)
    {
        //
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, finance_account $finance_account)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(finance_account $finance_account)
    {
        //
    }
}
