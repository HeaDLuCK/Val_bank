<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    // protected $primayKey = 'transaction_id';
    public function depositorAccount()
    {
        return $this->belongsTo(finance_account::class, 'dep_account', 'account_id');
    }

    public function receiverAccount()
    {
        return $this->belongsTo(finance_account::class, 'arr_account', "account_id");
    }
}
