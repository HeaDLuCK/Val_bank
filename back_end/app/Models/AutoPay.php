<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoPay extends Model
{
    use HasFactory;
    protected $gruaded = ['acc_id'];
}
