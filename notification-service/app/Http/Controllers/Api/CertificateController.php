<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        $certificates = Certificate::where('user_id', $userId)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $certificates
        ]);
    }

    public function verify($code)
    {
        $certificate = Certificate::where(
            'verification_code',
            $code
        )->first();

        if (!$certificate) {
            return response()->json([
                'success' => false,
                'message' => 'Certificate not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $certificate
        ]);
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'event_id' => 'required|integer',
        ]);

        $certificate = Certificate::create([
            'user_id' => $validated['user_id'],
            'event_id' => $validated['event_id'],
            'certificate_number' => 'CERT-' . now()->format('YmdHis') . '-' . $validated['user_id'],
            'issued_at' => now(),
            'verification_code' => strtoupper(bin2hex(random_bytes(8))),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Certificate generated successfully',
            'data' => $certificate
        ], 201);
    }

    public function download($id)
    {
        $certificate = Certificate::findOrFail($id);

        $pdf = Pdf::loadView('certificates.template', [
            'certificate' => $certificate
        ])->setPaper('a4', 'landscape');

        return $pdf->download('certificate-' . $certificate->certificate_number . '.pdf');
    }
}
