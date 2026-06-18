<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('events', function (Blueprint $table) {

        $table->id();

        $table->string('title');

        $table->text('description');

        $table->string('location');

        $table->dateTime('start_date');

        $table->dateTime('end_date');

        $table->integer('quota');

        $table->foreignId('category_id')
            ->constrained('categories')
            ->cascadeOnDelete();

        $table->unsignedBigInteger('created_by');

        $table->enum('status', [
            'draft',
            'published',
            'finished'
        ])->default('draft');

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
