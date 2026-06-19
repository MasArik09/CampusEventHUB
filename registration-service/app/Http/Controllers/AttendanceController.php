<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Registration;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    /**
     * Lihat status kehadiran untuk sebuah registrasi.
     */
    public function show($id)
    {
        $registration = Registration::find($id);

        if (!$registration) {
            return response()->json([
                'message' => 'Registration not found.',
            ], 404);
        }

        $attendance = $registration->attendance;

        if (!$attendance) {
            return response()->json([
                'message' => 'Attendance not recorded yet.',
            ], 404);
        }

        return response()->json([
            'message' => 'Attendance retrieved successfully.',
            'data'    => $attendance,
        ]);
    }

    /**
     * Catat kehadiran peserta.
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'attendance_status' => 'required|in:present,absent',
            'attendance_time'   => 'required|date',
        ]);

        $registration = Registration::find($id);

        if (!$registration) {
            return response()->json([
                'message' => 'Registration not found.',
            ], 404);
        }

        if ($registration->status === 'cancelled') {
            return response()->json([
                'message' => 'Cannot record attendance for a cancelled registration.',
            ], 409);
        }

        // Cek apakah kehadiran sudah dicatat sebelumnya
        if ($registration->attendance) {
            return response()->json([
                'message' => 'Attendance already recorded for this registration.',
            ], 409);
        }

        $attendance = Attendance::create([
            'registration_id'   => $registration->id,
            'attendance_status' => $request->attendance_status,
            'attendance_time'   => $request->attendance_time,
        ]);

        return response()->json([
            'message' => 'Attendance recorded successfully.',
            'data'    => $attendance,
        ], 201);
    }
}
