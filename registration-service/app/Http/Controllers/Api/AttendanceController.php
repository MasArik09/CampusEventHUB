<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    /**
     * POST /api/attendances
     * Catat kehadiran peserta event.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'registration_id'   => 'required|integer|exists:registrations,id',
            'attendance_status' => 'required|in:present,absent',
            'attendance_time'   => 'required|date',
        ]);

        // Cek apakah sudah pernah dicatat
        $exists = Attendance::where('registration_id', $request->registration_id)->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Attendance already recorded for this registration.',
            ], 409);
        }

        $attendance = Attendance::create([
            'registration_id'   => $request->registration_id,
            'attendance_status' => $request->attendance_status,
            'attendance_time'   => $request->attendance_time,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Attendance recorded successfully.',
            'data'    => $attendance,
        ], 201);
    }

    /**
     * GET /api/attendances/{registration_id}
     * Tampilkan kehadiran berdasarkan registration.
     */
    public function show(int $registrationId): JsonResponse
    {
        $attendance = Attendance::where('registration_id', $registrationId)->first();

        if (! $attendance) {
            return response()->json([
                'success' => false,
                'message' => 'Attendance not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $attendance,
        ]);
    }

    /**
     * GET /api/attendances/event/{event_id}
     * Tampilkan semua peserta + status kehadiran untuk sebuah event.
     */
    public function byEvent(int $eventId): JsonResponse
    {
        $registrations = Registration::with('attendance')
            ->where('event_id', $eventId)
            ->where('status', 'registered')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Participants retrieved successfully.',
            'data'    => $registrations,
        ]);
    }
}
