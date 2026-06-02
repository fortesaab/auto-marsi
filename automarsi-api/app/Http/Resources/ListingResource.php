<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'make' => new MakeResource($this->whenLoaded('make')),
            'car_model' => new CarModelResource($this->whenLoaded('carModel')),

            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,

            'year' => $this->year,
            'price' => $this->price,
            'currency' => $this->currency,
            'kilometers' => $this->kilometers,

            'fuel_type' => $this->fuel_type,
            'transmission' => $this->transmission,
            'body_type' => $this->body_type,
            'color' => $this->color,

            'engine_size' => $this->engine_size,
            'horsepower' => $this->horsepower,
            'vin' => $this->vin,
            'registration_until' => $this->registration_until?->toDateString(),

            'condition' => $this->condition,
            'status' => $this->status,
            'is_featured' => $this->is_featured,
            'location' => $this->location,

            'published_at' => $this->published_at?->toISOString(),
            'sold_at' => $this->sold_at?->toISOString(),

            'primary_image' => new ListingImageResource($this->whenLoaded('primaryImage')),
            'images' => ListingImageResource::collection($this->whenLoaded('images')),
            'features' => VehicleFeatureResource::collection($this->whenLoaded('features')),
        ];
    }
}