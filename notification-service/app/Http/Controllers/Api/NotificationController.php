<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        $notifications = Notification::where('user_id', $userId)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $notifications
        ]);
    }

    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);

        $notification->update([
            'is_read' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read'
        ]);
    }

    public function clear(Request $request)
    {
        $userId = $request->user_id;

        Notification::where('user_id', $userId)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Notifications cleared'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = Notification::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Notification created successfully',
            'data' => $notification
        ], 201);
    }
}
