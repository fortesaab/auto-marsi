<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MakeResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'logo_url' => $this->logo_url,
            'models_count' => $this->whenCounted('carModels'),
            'listings_count' => $this->whenCounted('listings'),
            'models' => CarModelResource::collection(
                $this->whenLoaded('carModels')
            ),
        ];
    }
}
