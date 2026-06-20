<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Event;
use App\Services\RabbitMQService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventApiTest extends TestCase
{
    use RefreshDatabase;

    protected int $categoryId;

    protected function setUp(): void
    {
        parent::setUp();

        // Mock RabbitMQService globally during tests to prevent connecting to RabbitMQ
        $mock = $this->createMock(RabbitMQService::class);
        $this->app->instance(RabbitMQService::class, $mock);

        // Dynamically create a category and store its ID
        $category = Category::create(['name' => 'Seminar']);
        $this->categoryId = $category->id;
    }

    public function test_can_create_event(): void
    {
        $response = $this->postJson('/api/events', [
            'title'       => 'Test Event',
            'description' => 'Test Description',
            'location'    => 'Test Location',
            'start_date'  => '2026-07-01 09:00:00',
            'end_date'    => '2026-07-01 17:00:00',
            'quota'       => 100,
            'category_id' => $this->categoryId,
            'created_by'  => 5,
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('data.title', 'Test Event');

        $this->assertDatabaseHas('events', [
            'title' => 'Test Event',
        ]);
    }

    public function test_can_update_event(): void
    {
        $event = Event::create([
            'title'       => 'Original Event',
            'description' => 'Original Desc',
            'location'    => 'Original Loc',
            'start_date'  => '2026-07-01 09:00:00',
            'end_date'    => '2026-07-01 17:00:00',
            'quota'       => 50,
            'category_id' => $this->categoryId,
            'created_by'  => 5,
        ]);

        $response = $this->putJson("/api/events/{$event->id}", [
            'title' => 'Updated Event Title',
            'quota' => 60,
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('data.title', 'Updated Event Title')
                 ->assertJsonPath('data.quota', 60);
    }

    public function test_can_delete_event(): void
    {
        $event = Event::create([
            'title'       => 'Delete Me',
            'description' => 'Desc',
            'location'    => 'Loc',
            'start_date'  => '2026-07-01 09:00:00',
            'end_date'    => '2026-07-01 17:00:00',
            'quota'       => 50,
            'category_id' => $this->categoryId,
            'created_by'  => 5,
        ]);

        $response = $this->deleteJson("/api/events/{$event->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('success', true);

        $this->assertDatabaseMissing('events', [
            'id' => $event->id,
        ]);
    }

    public function test_can_publish_event(): void
    {
        $event = Event::create([
            'title'       => 'Publish Event',
            'description' => 'Desc',
            'location'    => 'Loc',
            'start_date'  => '2026-07-01 09:00:00',
            'end_date'    => '2026-07-01 17:00:00',
            'quota'       => 50,
            'category_id' => $this->categoryId,
            'created_by'  => 5,
            'status'      => 'draft',
        ]);

        $response = $this->patchJson("/api/events/{$event->id}/publish");

        $response->assertStatus(200)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('data.status', 'published');
    }

    public function test_can_finish_event(): void
    {
        $event = Event::create([
            'title'       => 'Finish Event',
            'description' => 'Desc',
            'location'    => 'Loc',
            'start_date'  => '2026-07-01 09:00:00',
            'end_date'    => '2026-07-01 17:00:00',
            'quota'       => 50,
            'category_id' => $this->categoryId,
            'created_by'  => 5,
            'status'      => 'published',
        ]);

        $response = $this->patchJson("/api/events/{$event->id}/finish");

        $response->assertStatus(200)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('data.status', 'finished');
    }

    public function test_graphql_query_events(): void
    {
        $event = Event::create([
            'title'       => 'GraphQL Event',
            'description' => 'Desc',
            'location'    => 'Loc',
            'start_date'  => '2026-07-01 09:00:00',
            'end_date'    => '2026-07-01 17:00:00',
            'quota'       => 50,
            'category_id' => $this->categoryId,
            'created_by'  => 5,
        ]);

        $response = $this->postJson('/graphql', [
            'query' => '
                query {
                    events {
                        id
                        title
                    }
                }
            '
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'title' => 'GraphQL Event',
                 ]);
    }
}
