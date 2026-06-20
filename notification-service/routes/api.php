<?php

use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\NotificationController;
use Illuminate\Support\Facades\Route;

// Notifications
Route::get('notifications', [NotificationController::class, 'index']);
Route::patch('notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::post('notifications/clear', [NotificationController::class, 'clear']);

// Certificates
Route::get('certificates', [CertificateController::class, 'index']);
Route::get('certificates/verify/{code}', [CertificateController::class, 'verify']);

// Health check
Route::get('health', function () {
    return response()->json(['success' => true, 'message' => 'notification-service is healthy']);
});
