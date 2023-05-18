<?php

namespace App\Http\Controllers\NoCrud;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class NoCrudController extends Controller
{
    public function profile()
    {
        $data = User::find(Auth()->id());
        $contents = Storage::disk('public')->get('images/' . $data->user_detail->avatar_image);
        $base64 = base64_encode($contents);
        $data->user_detail->avatar_image = $base64;

        return ["status" => 200, "payload" => [
            "avatar" => $data->user_detail->avatar_image,
            "accounts" => $data->finance_account->makeHidden('user_id')
        ]];
    }
    public function dashboard(Request $request)
    {
    }
}
