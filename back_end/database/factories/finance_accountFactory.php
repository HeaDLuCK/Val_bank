<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Finance_account>
 */
class finance_accountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1, 10),
            'account_name' => fake()->word(),
            'balance' => fake()->numberBetween(50, 20000),
            'account_type' => fake()->word(),
            'account_status' => fake()->boolean()
        ];
    }
}
