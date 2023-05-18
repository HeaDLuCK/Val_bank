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
        Schema::create('finance_accounts', function (Blueprint $table) {
            $table->id("account_id");
            $table->foreignId("user_id")->constrained("users")->onDelete('cascade');
            $table->string("account_name")->nullable();
            $table->decimal("balance", 9, 2);
            $table->string("account_type");
            $table->boolean("account_status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finance_accounts');
    }
};
