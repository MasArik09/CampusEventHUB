<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
