<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('auto_pays', function (Blueprint $table) {
            $table->foreignId("acc_id")->constrained("finance_accounts", "account_id");
            $table->string("pay_code");
            $table->foreign("pay_code")->references('pay_code')->on('bills')->onDelete('cascade');
            $table->date('pay_day');
            $table->primary(['acc_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auto_pays');
    }
};
