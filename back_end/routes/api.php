<?php

use App\Http\Controllers\admin\TransactionController as AdminTransactionController;
use App\Http\Controllers\admin\UserController as AdminUserController;
use App\Http\Controllers\authentication\AuthController;
use App\Http\Controllers\FinanceAccountController;
use App\Http\Controllers\NoCrud\NoCrudController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Sanctum;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
//for photo use data:image/png;base64,
// Route::resource('/name', FinanceAccountController::class)->middleware("auth:sanctum");
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


route::prefix('data')->middleware('auth:sanctum')->group(function () {
    // admin api
    route::prefix('admin')->middleware('admin')->group(function () {
        Route::apiResource('user', AdminUserController::class);
        Route::apiResource('transaction', AdminTransactionController::class)->except('store');
        Route::apiResource('transaction', AdminTransactionController::class)->only('store')->middleware('transaction');
    });



    // user api
    Route::apiResource('user', UserController::class);
    // transaction api
    Route::apiResource('transaction', TransactionController::class)->except('store');
    Route::apiResource('transaction', TransactionController::class)->only('store')->middleware('transaction');


    Route::apiResource('finance_account', FinanceAccountController::class);


    // non crud methods
    Route::get('/profile', [NoCrudController::class, 'profile']);
    Route::get('/dashboard/{account_id}', [NoCrudController::class, 'dashboard']);
});
