<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'certificate_id',
        'user_id',
        'received_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
