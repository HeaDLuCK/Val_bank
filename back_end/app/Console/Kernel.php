<?php

namespace App\Console;

use App\Events\AutoPayActivated;
use App\Models\AutoPay;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function () {

            $accs = AutoPay::all();
            if (count($accs) > 0) {
                foreach ($accs as $acc) {
                    event(new AutoPayActivated($acc));
                }
            }
        })->dailyAt('8:00');
        // $schedule->command('inspire')->hourly();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
