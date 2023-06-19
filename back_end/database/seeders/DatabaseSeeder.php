<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\finance_account;
use App\Models\Transaction;
use App\Models\User;
use App\Models\User_detail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userA = new User();
        $userA->username = 'admin05';
        $userA->password = bcrypt("xlooon10");
        $userA->role = 'admin';
        $userA->save();


        $user_detail = new User_detail();
        $user_detail->user_id = $userA->id;
        $user_detail->first_name = 'zakaria';
        $user_detail->last_name = 'missou';
        $user_detail->birthday = fake()->date('Y-m-d');
        $user_detail->email = fake()->email();
        $user_detail->phone_number = fake()->phoneNumber();
        $user_detail->gender = 'male';
        $user_detail->city = fake()->city();
        $user_detail->code_postal = fake()->postcode();
        $user_detail->address = fake()->address();
        $user_detail->cin = fake()->numberBetween($min = 1000, $max = 9000);
        $user_detail->avatar_image = '3.jpg';
        $user_detail->save();

        $userB = new User();
        $userB->username = 'agent05';
        $userB->password = bcrypt("xlooon10");
        $userB->role = 'agent';
        $userB->save();

        $user_detail = new User_detail();
        $user_detail->user_id = $userB->id;
        $user_detail->first_name = 'test04';
        $user_detail->last_name = 'test05';
        $user_detail->birthday = fake()->date('Y-m-d');
        $user_detail->email = fake()->email();
        $user_detail->phone_number = fake()->phoneNumber();
        $user_detail->gender = 'male';
        $user_detail->city = fake()->city();
        $user_detail->code_postal = fake()->postcode();
        $user_detail->address = fake()->address();
        $user_detail->cin = fake()->numberBetween($min = 1000, $max = 9000);
        $user_detail->avatar_image = '3.jpg';
        $user_detail->save();

        $finance_account= new finance_account();
        $finance_account->user_id=$userB->id;
        $finance_account->account_name='INWI';
        $finance_account->balance=100.00;
        $finance_account->account_type='company';
        $finance_account->account_status=1;
        $finance_account->save();

        User::factory(10)->hasuser_detail(1)->hasfinance_account(3)->create();
        Transaction::factory(50)->create();
    }
}
