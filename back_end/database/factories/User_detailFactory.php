<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User_detail>
 */
class User_detailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'user_id'=>User::factory()->create()->id,
            'first_name'=>fake()->firstName(),
            'last_name'=>fake()->lastName(),
            'birthday'=>fake()->date('Y-m-d'),
            'email'=>fake()->email(),
            'phone_number'=>fake()->phoneNumber(),
            'gender'=>'male',
            'city'=>fake()->city(),
            'code_postal'=>fake()->postcode(),
            'address'=>fake()->address(),
            'cin'=>fake()->numberBetween($min = 1000, $max = 9000) ,
            'avatar_image'=>'1.png',
        ];
    }
}
