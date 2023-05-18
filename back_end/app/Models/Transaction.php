<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    // protected $primayKey = 'transaction_id';
    public function transactionsAsDepositor()
    {
        return $this->hasMany(Transaction::class, 'dep_acc', 'account_id');
    }

    public function transactionsAsReceiver()
    {
        return $this->hasMany(Transaction::class, 'arr_acc', "account_id");
    }
}
