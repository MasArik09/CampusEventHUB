<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            CategorySeeder::class,
        ]);

        \App\Models\Event::create([
            'title' => 'Webinar Cloud Computing & DevOps',
            'description' => 'Belajar cara mendesain arsitektur cloud menggunakan AWS dan mengotomatiskan deployment menggunakan Docker & CI/CD.',
            'location' => 'Zoom Meeting',
            'start_date' => now()->addDays(2),
            'end_date' => now()->addDays(2)->addHours(3),
            'quota' => 150,
            'category_id' => 3, // Webinar
            'created_by' => 1,
            'status' => 'published',
        ]);

        \App\Models\Event::create([
            'title' => 'Workshop UI/UX Design for Beginners',
            'description' => 'Praktik langsung mendesain wireframe dan membuat prototype interaktif menggunakan Figma.',
            'location' => 'Gedung Lab Komputer 3',
            'start_date' => now()->addDays(5),
            'end_date' => now()->addDays(5)->addHours(4),
            'quota' => 40,
            'category_id' => 2, // Workshop
            'created_by' => 1,
            'status' => 'draft',
        ]);
    }
}
