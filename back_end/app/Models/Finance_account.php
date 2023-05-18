<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class finance_account extends Model
{
    use HasFactory;
    protected $guarded = ['account_id'];
    protected $primaryKey = 'account_id';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactionsAsDepositor()
    {
        return $this->hasMany(Transaction::class, 'dep_account', 'account_id');
    }
    public function transactionsAsReceiver()
    {
        return $this->hasMany(Transaction::class, 'arr_account', 'account_id');
    }
}
