<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Services\RabbitMQService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    /**
     * GET /api/registrations?user_id=xxx
     * Ambil daftar registrasi aktif milik seorang user.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $registrations = Registration::with('attendance')
            ->where('user_id', $request->user_id)
            ->where('status', 'registered')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Registrations retrieved successfully.',
            'data'    => $registrations,
        ]);
    }

    /**
     * POST /api/registrations
     * Daftarkan user ke sebuah event.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'user_id'  => 'required|integer',
            'event_id' => 'required|integer',
        ]);

        // Cek apakah user sudah terdaftar di event yang sama
        $exists = Registration::where('user_id', $request->user_id)
            ->where('event_id', $request->event_id)
            ->where('status', 'registered')
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'User already registered for this event.',
            ], 409);
        }

        $registration = Registration::create([
            'user_id'       => $request->user_id,
            'event_id'      => $request->event_id,
            'status'        => 'registered',
            'registered_at' => now(),
        ]);

        // Publish event ke RabbitMQ → Notification Service
        app(RabbitMQService::class)->publish('registration.created', [
            'registration_id' => $registration->id,
            'user_id'         => $registration->user_id,
            'event_id'        => $registration->event_id,
            'registered_at'   => $registration->registered_at->toIso8601String(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registration created successfully.',
            'data'    => $registration,
        ], 201);
    }

    /**
     * GET /api/registrations/{id}
     * Tampilkan detail satu registrasi.
     */
    public function show(Registration $registration): JsonResponse
    {
        $registration->load('attendance');

        return response()->json([
            'success' => true,
            'data'    => $registration,
        ]);
    }

    /**
     * GET /api/registrations/history?user_id=xxx
     * Riwayat semua pendaftaran user (termasuk yang cancelled).
     */
    public function history(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $registrations = Registration::with('attendance')
            ->where('user_id', $request->user_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Registration history retrieved successfully.',
            'data'    => $registrations,
        ]);
    }

    /**
     * DELETE /api/registrations/{id}
     * Cancel pendaftaran.
     */
    public function destroy(Registration $registration): JsonResponse
    {
        if ($registration->status === 'cancelled') {
            return response()->json([
                'success' => false,
                'message' => 'Registration is already cancelled.',
            ], 409);
        }

        $registration->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Registration cancelled successfully.',
            'data'    => $registration,
        ]);
    }
}
