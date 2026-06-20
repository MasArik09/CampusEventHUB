<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Certificate extends Model
{
    protected $fillable = [
        'user_id',
        'event_id',
        'certificate_number',
        'issued_at',
        'verification_code',
    ];

    protected $casts = [
        'issued_at' => 'datetime',
    ];

    /**
     * Generate a unique certificate number.
     */
    public static function generateNumber(): string
    {
        return 'CERT-' . strtoupper(Str::random(4)) . '-' . date('Y') . '-' . str_pad(static::count() + 1, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Generate a unique verification code.
     */
    public static function generateVerificationCode(): string
    {
        return strtoupper(Str::random(16));
    }
}
