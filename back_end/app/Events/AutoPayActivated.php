<?php

namespace App\Events;

use App\Models\AutoPay;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AutoPayActivated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $account;
    public $pay_code;
    public $date;
    /**
     * Create a new event instance.
     */
    public function __construct(AutoPay $acc)
    {
        $this->account = $acc;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
