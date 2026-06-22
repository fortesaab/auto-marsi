<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'listing_id' => $this->listing_id,
            'inquiry_id' => $this->inquiry_id,

            'listing' => new ListingResource($this->whenLoaded('listing')),

            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'preferred_at' => $this->preferred_at?->toISOString(),
            'message' => $this->message,
            'status' => $this->status,

            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
