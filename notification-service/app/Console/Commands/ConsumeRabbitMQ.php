<?php

namespace App\Console\Commands;

use App\Models\Certificate;
use App\Models\Notification;
use Illuminate\Console\Command;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class ConsumeRabbitMQ extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'rabbitmq:consume';

    /**
     * The console command description.
     */
    protected $description = 'Consume messages from RabbitMQ exchange (campus_eventhub) and process notifications/certificates';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info('[notification-service] Connecting to RabbitMQ...');

        $connection = new AMQPStreamConnection(
            env('RABBITMQ_HOST', 'rabbitmq'),
            env('RABBITMQ_PORT', 5672),
            env('RABBITMQ_USER', 'guest'),
            env('RABBITMQ_PASSWORD', 'guest')
        );

        $channel = $connection->channel();

        // Declare the shared exchange (topic type — sama dengan publisher)
        $exchange = env('RABBITMQ_EXCHANGE', 'campus_eventhub');
        $channel->exchange_declare($exchange, 'topic', false, true, false);

        // Buat queue eksklusif untuk service ini
        [$queueName] = $channel->queue_declare('notification_service_queue', false, true, false, false);

        // Bind ke routing keys yang ingin di-consume
        $channel->queue_bind($queueName, $exchange, 'registration.created');
        $channel->queue_bind($queueName, $exchange, 'event.created');
        $channel->queue_bind($queueName, $exchange, 'event.finished');

        $this->info("[notification-service] Listening on exchange '{$exchange}' for:");
        $this->info('  - registration.created');
        $this->info('  - event.created');
        $this->info('  - event.finished');
        $this->info('[notification-service] Press CTRL+C to stop.');

        $callback = function (AMQPMessage $msg) {
            $routingKey = $msg->getRoutingKey();
            $data       = json_decode($msg->getBody(), true);

            $this->info("[{$routingKey}] Received: " . $msg->getBody());

            try {
                match ($routingKey) {
                    'registration.created' => $this->handleRegistrationCreated($data),
                    'event.created'        => $this->handleEventCreated($data),
                    'event.finished'       => $this->handleEventFinished($data),
                    default                => $this->warn("Unknown routing key: {$routingKey}"),
                };

                $msg->ack(); // Acknowledge berhasil diproses
            } catch (\Exception $e) {
                $this->error("Failed to process [{$routingKey}]: " . $e->getMessage());
                $msg->nack(false, true); // Requeue on failure
            }
        };

        $channel->basic_qos(null, 1, null);
        $channel->basic_consume($queueName, '', false, false, false, false, $callback);

        while ($channel->is_consuming()) {
            $channel->wait();
        }

        $channel->close();
        $connection->close();
    }

    /**
     * Handle: registration.created
     * Kirim notifikasi ke user bahwa pendaftaran berhasil.
     */
    protected function handleRegistrationCreated(array $data): void
    {
        Notification::create([
            'user_id' => $data['user_id'],
            'title'   => 'Pendaftaran Berhasil',
            'message' => "Kamu berhasil mendaftar ke event (ID: {$data['event_id']}). Selamat!",
            'is_read' => false,
        ]);

        $this->info("  → Notifikasi pendaftaran dibuat untuk user_id={$data['user_id']}");
    }

    /**
     * Handle: event.created
     * Broadcast informasi event baru (opsional — bisa diabaikan atau simpan sebagai notifikasi global).
     */
    protected function handleEventCreated(array $data): void
    {
        // Untuk saat ini, log saja. Implementasi bisa diperluas untuk broadcast ke semua user.
        $this->info("  → Event baru dibuat: ID={$data['event_id']}, title={$data['title']}");
    }

    /**
     * Handle: event.finished
     * Generate sertifikat untuk semua peserta yang hadir.
     * Karena notification-service tidak punya data attendance,
     * kita buat sertifikat berdasarkan data yang dikirim event-service.
     */
    protected function handleEventFinished(array $data): void
    {
        $eventId = $data['event_id'];

        // Data peserta dikirim oleh event-service jika ada, atau kita buat placeholder
        $participants = $data['participants'] ?? [];

        if (empty($participants)) {
            $this->warn("  → event.finished diterima untuk event_id={$eventId}, tapi tidak ada data participants. Sertifikat tidak dibuat.");
            return;
        }

        foreach ($participants as $userId) {
            // Cek kalau sertifikat sudah ada
            $exists = Certificate::where('user_id', $userId)
                ->where('event_id', $eventId)
                ->exists();

            if ($exists) {
                continue;
            }

            Certificate::create([
                'user_id'            => $userId,
                'event_id'           => $eventId,
                'certificate_number' => Certificate::generateNumber(),
                'issued_at'          => now(),
                'verification_code'  => Certificate::generateVerificationCode(),
            ]);

            // Kirim notifikasi sertifikat tersedia
            Notification::create([
                'user_id' => $userId,
                'title'   => 'Sertifikat Tersedia',
                'message' => "Sertifikat kehadiran event (ID: {$eventId}) sudah tersedia. Silakan unduh di halaman Sertifikat.",
                'is_read' => false,
            ]);
        }

        $this->info("  → Sertifikat dibuat untuk " . count($participants) . " peserta event_id={$eventId}");
    }
}
