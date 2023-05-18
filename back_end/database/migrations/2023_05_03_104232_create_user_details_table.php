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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id("details_id");
            $table->foreignId("user_id")->constrained("users")->onDelete('cascade');
            $table->string("first_name");
            $table->string("last_name");
            $table->date("birthday");
            $table->string('email')->unique();
            $table->string('phone_number')->unique()->nullable();
            $table->string("address")->nullable();
            $table->string("cin");
            $table->string("avatar_image");
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};
