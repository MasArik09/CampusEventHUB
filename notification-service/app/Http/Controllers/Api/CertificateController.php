<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /**
     * GET /api/certificates?user_id=xxx
     * Ambil semua sertifikat milik user.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $certificates = Certificate::where('user_id', $request->user_id)
            ->orderBy('issued_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $certificates,
        ]);
    }

    /**
     * GET /api/certificates/verify/{code}
     * Verifikasi sertifikat berdasarkan verification_code.
     */
    public function verify(string $code): JsonResponse
    {
        $certificate = Certificate::where('verification_code', $code)->first();

        if (! $certificate) {
            return response()->json([
                'success' => false,
                'message' => 'Certificate not found or invalid verification code.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Certificate is valid.',
            'data'    => $certificate,
        ]);
    }
}
