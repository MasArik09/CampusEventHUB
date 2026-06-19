<?php

namespace App\Console\Commands;

use App\Models\Certificate;
use App\Models\User;
use Illuminate\Console\Command;
use PhpAmqpLib\Connection\AMQPStreamConnection;

/**
 * Consumer untuk event "certificate.generated".
 *
 * Publisher : Notification & Certificate Service
 * Consumer  : User Service (ARCHITECTURE.md & SYSTEM_DESIGN.md - Section 8/10)
 * Action    : Menampilkan sertifikat pada dashboard pengguna.
 *
 * Jalankan dengan: php artisan rabbitmq:consume-certificate
 */
class ConsumeCertificateGenerated extends Command
{
    protected $signature = 'rabbitmq:consume-certificate';

    protected $description = 'Consume certificate.generated event from RabbitMQ (campus_eventhub exchange)';

    public function handle(): int
    {
        $connection = new AMQPStreamConnection(
            config('services.rabbitmq.host'),
            config('services.rabbitmq.port'),
            config('services.rabbitmq.user'),
            config('services.rabbitmq.password'),
        );

        $channel = $connection->channel();

        $exchange = config('services.rabbitmq.exchange');
        $queue = config('services.rabbitmq.queue_user_service');
        $routingKey = config('services.rabbitmq.routing_key_certificate_generated');

        $channel->exchange_declare($exchange, 'topic', false, true, false);
        $channel->queue_declare($queue, false, true, false, false);
        $channel->queue_bind($queue, $exchange, $routingKey);

        $this->info("Listening for [{$routingKey}] on exchange [{$exchange}] ...");

        $callback = function ($msg) {
            $payload = json_decode($msg->getBody(), true);

            $this->info('Received certificate.generated payload: '.$msg->getBody());

            $userId = $payload['user_id'] ?? null;
            $certificateId = $payload['certificate_id'] ?? null;

            if ($userId && $certificateId && User::where('id', $userId)->exists()) {
                Certificate::create([
                    'certificate_id' => $certificateId,
                    'user_id' => $userId,
                    'received_at' => now(),
                ]);
            }

            $msg->ack();
        };

        $channel->basic_consume($queue, '', false, false, false, false, $callback);

        while ($channel->is_consuming()) {
            $channel->wait();
        }

        $channel->close();
        $connection->close();

        return self::SUCCESS;
    }
}
