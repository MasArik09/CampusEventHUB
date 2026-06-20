<?php

use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\RegistrationController;
use Illuminate\Support\Facades\Route;

// Registrations
Route::get('registrations', [RegistrationController::class, 'index']);
Route::post('registrations', [RegistrationController::class, 'store']);
Route::get('registrations/{registration}', [RegistrationController::class, 'show']);
Route::delete('registrations/{registration}', [RegistrationController::class, 'destroy']);
Route::get('registrations/history/user', [RegistrationController::class, 'history']);

// Attendances
Route::post('attendances', [AttendanceController::class, 'store']);
Route::get('attendances/{registration_id}', [AttendanceController::class, 'show']);
Route::get('attendances/event/{event_id}', [AttendanceController::class, 'byEvent']);

// Health check
Route::get('health', function () {
    return response()->json(['success' => true, 'message' => 'registration-service is healthy']);
});
