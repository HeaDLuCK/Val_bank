<?php

namespace App\Http\Middleware;

use App\Models\finance_account;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TransactionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $check_account = finance_account::find($request->arr_account);
        if (!is_null($check_account) and $check_account->account_status) {
            return $next($request);
        } else {
            return response()->json(['message' => 'undefiend destination or account desactivated'], 500);
        }
    }
}
