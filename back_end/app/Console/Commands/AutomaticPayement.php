<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AutomaticPayement extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'monthlypayment {userId} {facture_N}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $userId = $this->argument('userId');
        $facture = $this->argument('facture_N');
    }
}
