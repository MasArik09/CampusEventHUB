<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * GET /api/notifications?user_id=xxx
     * Ambil semua notifikasi milik user.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $notifications = Notification::where('user_id', $request->user_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $notifications,
        ]);
    }

    /**
     * PATCH /api/notifications/{id}/read
     * Tandai notifikasi sebagai sudah dibaca.
     */
    public function markAsRead(int $id): JsonResponse
    {
        $notification = Notification::find($id);

        if (! $notification) {
            return response()->json([
                'success' => false,
                'message' => 'Notification not found.',
            ], 404);
        }

        $notification->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read.',
            'data'    => $notification,
        ]);
    }

    /**
     * POST /api/notifications/clear
     * Hapus semua notifikasi milik user.
     */
    public function clear(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $deleted = Notification::where('user_id', $request->user_id)->delete();

        return response()->json([
            'success' => true,
            'message' => "{$deleted} notifications cleared.",
        ]);
    }
}
