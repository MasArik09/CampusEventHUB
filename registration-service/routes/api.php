<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;

// Registrations — static routes HARUS di atas dynamic {id}
Route::get('/registrations', [RegistrationController::class, 'index']);
Route::post('/registrations', [RegistrationController::class, 'store']);
Route::get('/registrations/history', [RegistrationController::class, 'history']); // ✅ static dulu
Route::delete('/registrations/{id}', [RegistrationController::class, 'destroy']);

// Attendance Routes (nested di bawah registration)
Route::get('/registrations/{id}/attendance', [AttendanceController::class, 'show']);
Route::post('/registrations/{id}/attendance', [AttendanceController::class, 'store']);

// Health check
Route::get('/health', function () {
    return response()->json(['success' => true, 'message' => 'registration-service is healthy']);
});
