<?php

use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\RegistrationController;
use Illuminate\Support\Facades\Route;

// Registrations — static routes HARUS di atas dynamic {registration}
Route::get('registrations', [RegistrationController::class, 'index']);
Route::post('registrations', [RegistrationController::class, 'store']);
Route::get('registrations/history/user',   [RegistrationController::class, 'history']); // ✅ static dulu
Route::get('registrations/{registration}', [RegistrationController::class, 'show']);    // ✅ dynamic belakang
Route::delete('registrations/{registration}', [RegistrationController::class, 'destroy']);

// Attendances — static routes HARUS di atas dynamic {registration_id}
Route::post('attendances', [AttendanceController::class, 'store']);
Route::get('attendances/event/{event_id}', [AttendanceController::class, 'byEvent']);  // ✅ static dulu
Route::get('attendances/{registration_id}', [AttendanceController::class, 'show']);    // ✅ dynamic belakang

// Health check
Route::get('health', function () {
    return response()->json(['success' => true, 'message' => 'registration-service is healthy']);
});
