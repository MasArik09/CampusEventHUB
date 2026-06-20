<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    protected ?AMQPStreamConnection $connection = null;
    protected $channel = null;
    protected string $exchange;

    public function __construct()
    {
        $this->exchange = env('RABBITMQ_EXCHANGE', 'campus_eventhub');
    }

    /**
     * Get or create AMQP connection.
     */
    protected function connect(): void
    {
        if ($this->connection === null) {
            $this->connection = new AMQPStreamConnection(
                env('RABBITMQ_HOST', 'rabbitmq'),
                env('RABBITMQ_PORT', 5672),
                env('RABBITMQ_USER', 'guest'),
                env('RABBITMQ_PASSWORD', 'guest')
            );
            $this->channel = $this->connection->channel();

            // Declare exchange to make sure it exists
            $this->channel->exchange_declare(
                $this->exchange,
                'topic', // exchange type
                false,   // passive
                true,    // durable
                false    // auto-delete
            );
        }
    }

    /**
     * Publish a message to a routing key.
     */
    public function publish(string $routingKey, array $data): void
    {
        try {
            $this->connect();

            $msgBody = json_encode($data);
            $msg = new AMQPMessage($msgBody, [
                'content_type'  => 'application/json',
                'delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT,
            ]);

            $this->channel->basic_publish($msg, $this->exchange, $routingKey);
        } catch (\Exception $e) {
            // Log the error so it doesn't crash the REST API if RabbitMQ is down
            \Log::error('RabbitMQ Publish Failed: ' . $e->getMessage(), [
                'routing_key' => $routingKey,
                'data'        => $data,
            ]);
        }
    }

    public function __destruct()
    {
        if ($this->channel) {
            $this->channel->close();
        }
        if ($this->connection) {
            $this->connection->close();
        }
    }
}
