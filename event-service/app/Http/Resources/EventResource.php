<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'location'    => $this->location,
            'start_date'  => $this->start_date,
            'end_date'    => $this->end_date,
            'quota'       => $this->quota,
            'status'      => $this->status,
            'created_by'  => $this->created_by,
            'category'    => [
                'id'   => $this->category?->id,
                'name' => $this->category?->name,
            ],
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
        ];
    }
}
