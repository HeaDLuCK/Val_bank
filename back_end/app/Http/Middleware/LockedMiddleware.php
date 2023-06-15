<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LockedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = User::where('username', request('username'))->first();
        if(!$user){
            return response()->json(["message" => "this account doesn't exist "], 404);
        }
        if ($user->user_status) {
            return $next($request);
        } else {
            return response()->json(["message" => "your account is disabled"], 500);
        }
    }
}
