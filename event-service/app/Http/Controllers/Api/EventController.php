<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EventController extends Controller
{
    /**
     * GET /api/events
     * Tampilkan semua event beserta kategorinya (dengan Filter & Search).
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Event::with('category');

        // Search by title or description
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by category_id
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by a specific date falling within event duration
        if ($request->filled('date')) {
            $query->whereDate('start_date', '<=', $request->date)
                  ->whereDate('end_date', '>=', $request->date);
        }

        $events = $query->latest()->paginate(10);

        return EventResource::collection($events)->additional([
            'success' => true,
        ]);
    }

    /**
     * POST /api/events
     * Buat event baru.
     */
    public function store(StoreEventRequest $request): JsonResponse
    {
        $event = Event::create($request->validated());

        $event->load('category');

        // Publish to RabbitMQ
        app(\App\Services\RabbitMQService::class)->publish('event.created', [
            'event_id' => $event->id,
            'title'    => $event->title,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event berhasil dibuat.',
            'data'    => new EventResource($event),
        ], 201);
    }

    /**
     * GET /api/events/{id}
     * Tampilkan detail satu event.
     */
    public function show(Event $event): JsonResponse
    {
        $event->load('category');

        return response()->json([
            'success' => true,
            'data'    => new EventResource($event),
        ]);
    }

    /**
     * PUT /api/events/{id}
     * Update event.
     */
    public function update(UpdateEventRequest $request, Event $event): JsonResponse
    {
        $event->update($request->validated());

        $event->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Event berhasil diperbarui.',
            'data'    => new EventResource($event),
        ]);
    }

    /**
     * DELETE /api/events/{id}
     * Hapus event.
     */
    public function destroy(Event $event): JsonResponse
    {
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event berhasil dihapus.',
        ]);
    }

    /**
     * PATCH /api/events/{id}/publish
     * Publish event (ubah status menjadi published).
     */
    public function publish(Event $event): JsonResponse
    {
        if ($event->status === 'published') {
            return response()->json([
                'success' => false,
                'message' => 'Event sudah dalam status published.',
            ], 422);
        }

        $event->update([
            'status' => 'published',
        ]);

        $event->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Event berhasil dipublish.',
            'data'    => new EventResource($event),
        ]);
    }

    /**
     * PATCH /api/events/{id}/finish
     * Selesaikan event (ubah status menjadi finished).
     */
    public function finish(Event $event): JsonResponse
    {
        if ($event->status === 'finished') {
            return response()->json([
                'success' => false,
                'message' => 'Event sudah dalam status finished.',
            ], 422);
        }

        $event->update([
            'status' => 'finished',
        ]);

        $event->load('category');

        // Publish to RabbitMQ
        app(\App\Services\RabbitMQService::class)->publish('event.finished', [
            'event_id' => $event->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event finished successfully',
            'data'    => new EventResource($event),
        ]);
    }
}
