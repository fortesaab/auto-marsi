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
            'purchase_price' => $this->purchase_price,
            'sale_price' => $this->sale_price,
            'sales_expenses' => $this->sales_expenses,
            'sale_notes' => $this->sale_notes,
            'sales_summary' => $this->salesSummary(),
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

    /**
     * @return array{profit: float|null, margin_percent: float|null}
     */
    private function salesSummary(): array
    {
        if ($this->sale_price === null) {
            return [
                'profit' => null,
                'margin_percent' => null,
            ];
        }

        $salePrice = (float) $this->sale_price;
        $purchasePrice = (float) ($this->purchase_price ?? 0);
        $expenses = (float) ($this->sales_expenses ?? 0);
        $profit = $salePrice - $purchasePrice - $expenses;

        return [
            'profit' => round($profit, 2),
            'margin_percent' => $salePrice > 0
                ? round(($profit / $salePrice) * 100, 2)
                : null,
        ];
    }
}
