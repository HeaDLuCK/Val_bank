<?php

use App\Http\Controllers\admin\NoCrud\NoCrudController as NoCrudNoCrudController;
use App\Http\Controllers\admin\TransactionController as AdminTransactionController;
use App\Http\Controllers\admin\UserController as AdminUserController;
use App\Http\Controllers\authentication\AuthController;
use App\Http\Controllers\AutoPayController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\FinanceAccountController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\NoCrud\NoCrudController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\AutoPay;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Auth\Notifications\ResetPassword;
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

//for photo use data:image/png;base64,
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->middleware('locked');
Route::delete('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/reset-password', [MailController::class, 'ResetPassword']);
Route::post('/update-password', [NoCrudController::class, 'UpdatePassword']);

route::prefix('data')->middleware('auth:sanctum')->group(function () {
    // admin api
    route::prefix('admin')->middleware('admin')->group(function () {
        Route::post('users', [AdminUserController::class, 'index']);
        Route::apiResource('user', AdminUserController::class)->except('index');
        Route::apiResource('transaction', AdminTransactionController::class)->except('store');
        Route::apiResource('transaction', AdminTransactionController::class)->only('store')->middleware('transaction');

        // no Crud
        Route::get('user/switch/{id}', [NoCrudNoCrudController::class, 'SwitchStatus']);
        Route::get('admin-dashboard', [NoCrudNoCrudController::class, 'AdminDashboard']);
    });

    // agent api
    route::prefix('agent')->middleware('agent')->group(function () {
        Route::post('/bill', [BillController::class, 'index']);
        Route::apiResource('/bills', BillController::class)->except('index');
    });


    // user api
    Route::get('user', [UserController::class, 'index']);
    Route::post('user', [UserController::class, 'update']);
    // transaction api
    Route::post('transactions',[TransactionController::class,'index']);
    Route::apiResource('transaction', TransactionController::class)->except(['store','index']);
    Route::apiResource('transaction', TransactionController::class)->only('store')->middleware('transaction');


    Route::apiResource('finance_account', FinanceAccountController::class);
    Route::apiResource('autopay',AutoPayController::class);

    // non crud methods
    Route::get('/accounts', [NoCrudController::class, 'AccountsIds']);
    Route::get('/profile', [NoCrudController::class, 'profile']);
    Route::post('/dashboard/{account_id}', [NoCrudController::class, 'dashboard']);
});
