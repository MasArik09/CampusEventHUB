<?php

namespace App\Http\Controllers;

use App\Jobs\PublishRegistrationCreated;
use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    /**
     * List registrasi aktif milik user.
     */
    public function index(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $registrations = Registration::with('attendance')
            ->where('user_id', $request->user_id)
            ->where('status', 'registered')
            ->get();

        return response()->json([
            'message' => 'Registrations retrieved successfully.',
            'data'    => $registrations,
        ]);
    }

    /**
     * Daftar event baru.
     */
    public function store(Request $request)
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
        PublishRegistrationCreated::dispatch(
            registrationId: $registration->id,
            userId: $registration->user_id,
            eventId: $registration->event_id,
            registeredAt: $registration->registered_at->toIso8601String(),
        );

        return response()->json([
            'message' => 'Registration created successfully.',
            'data'    => $registration,
        ], 201);
    }

    /**
     * Riwayat semua pendaftaran user (termasuk yang cancelled).
     */
    public function history(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $registrations = Registration::with('attendance')
            ->where('user_id', $request->user_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Registration history retrieved successfully.',
            'data'    => $registrations,
        ]);
    }

    /**
     * Cancel pendaftaran.
     */
    public function destroy($id)
    {
        $registration = Registration::find($id);

        if (!$registration) {
            return response()->json([
                'message' => 'Registration not found.',
            ], 404);
        }

        if ($registration->status === 'cancelled') {
            return response()->json([
                'message' => 'Registration is already cancelled.',
            ], 409);
        }

        $registration->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Registration cancelled successfully.',
            'data'    => $registration,
        ]);
    }
}
