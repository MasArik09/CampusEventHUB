<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;

// Registration Routes
Route::post('/registrations', [RegistrationController::class, 'store']);
Route::get('/registrations', [RegistrationController::class, 'index']);
Route::get('/registrations/history', [RegistrationController::class, 'history']);
Route::delete('/registrations/{id}', [RegistrationController::class, 'destroy']);

// Attendance Routes
Route::get('/registrations/{id}/attendance', [AttendanceController::class, 'show']);
Route::post('/registrations/{id}/attendance', [AttendanceController::class, 'store']);
