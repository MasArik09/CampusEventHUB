<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'registration_id',
        'attendance_status',
        'attendance_time',
    ];

    protected $casts = [
        'attendance_time' => 'datetime',
    ];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }
}
