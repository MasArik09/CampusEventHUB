<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;

Route::apiResource('events', EventController::class);

Route::patch('events/{event}/publish', [EventController::class, 'publish']);
Route::patch('events/{event}/finish', [EventController::class, 'finish']);

Route::get('/health', function () {
    return response()->json(['success' => true, 'message' => 'event-service is healthy']);
});
