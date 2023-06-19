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
        $number1 = fake()->numberBetween(2, 6);
        if ($number1 <= 4) {
            $number2 = fake()->numberBetween(5, 30);
        } else {
            $number2 = $number1 - 3;
        }

        return [
            'dep_account' => $number1,
            'arr_account' =>  $number2,
            'type' => fake()->randomElement(['food', 'bills', 'club']),
            'amount' => fake()->randomFloat(2, 100.00, 5000.00),
            'description' => fake()->sentence(),
            'created_at' => fake()->dateTimeBetween("-30 days")
        ];
    }
}
