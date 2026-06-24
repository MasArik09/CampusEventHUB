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

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        \App\Models\Notification::create([
            'user_id' => $user->id,
            'title' => 'Peringatan Event',
            'message' => 'Event Workshop UI/UX akan segera dimulai.',
            'is_read' => false,
        ]);
    }
}
