<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_detail extends Model
{
    use HasFactory;

    protected $guarded = ['details_id'];
    protected  $primaryKey = 'details_id';
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
