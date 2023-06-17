<?php

namespace Database\Factories;

use App\Models\finance_account;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'dep_account' => fake()->numberBetween(1, 6),
            'arr_account' => fake()->numberBetween(1, 6),
            'type' => fake()->randomElement(['food', 'bills', 'club']),
            'amount' => fake()->randomFloat(2, 100.00, 50000.00),
            'description' => fake()->sentence(),
            'created_at' => fake()->dateTimeBetween("-30 days")
        ];
    }
}
