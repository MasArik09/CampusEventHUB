<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'location',
        'start_date',
        'end_date',
        'quota',
        'category_id',
        'created_by',
        'status'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}