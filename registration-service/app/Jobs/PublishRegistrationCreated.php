<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class PublishRegistrationCreated implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public readonly int $registrationId,
        public readonly int $userId,
        public readonly int $eventId,
        public readonly string $registeredAt,
    ) {
        $this->onQueue('registration.created');
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Job ini sendiri adalah pesan yang dikirim ke RabbitMQ.
        // Ketika di-dispatch dengan QUEUE_CONNECTION=rabbitmq,
        // Laravel secara otomatis mempublish payload ke queue 'registration.created'.
        //
        // Notification Service akan mengkonsumsi queue ini.
    }
}
