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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transaction_id');
            $table->string("type");
            $table->foreignId("dep_account")->nullable()->constrained("finance_accounts", "account_id")->nullOnDelete();
            $table->foreignId("arr_account")->nullable()->constrained("finance_accounts", 'account_id')->nullOnDelete();
            $table->decimal("amount", 9, 2);
            $table->string("description")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
