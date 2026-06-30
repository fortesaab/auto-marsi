<?php

namespace App\Http\Requests\Admin\Listings;

use Illuminate\Foundation\Http\FormRequest;

class StoreListingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'make_id' => ['required', 'integer', 'exists:makes,id'],
            'car_model_id' => ['required', 'integer', 'exists:car_models,id'],

            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            'year' => ['required', 'integer', 'min:1900', 'max:' . now()->addYear()->year],
            'price' => ['required', 'numeric', 'min:0'],
            'purchase_price' => ['nullable', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0'],
            'sales_expenses' => ['nullable', 'numeric', 'min:0'],
            'sale_notes' => ['nullable', 'string'],
            'currency' => ['nullable', 'string', 'size:3'],

            'kilometers' => ['nullable', 'integer', 'min:0'],
            'fuel_type' => ['required', 'string', 'max:50'],
            'transmission' => ['required', 'string', 'max:50'],
            'body_type' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:50'],

            'engine_size' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'horsepower' => ['nullable', 'integer', 'min:0'],
            'vin' => ['nullable', 'string', 'max:255', 'unique:listings,vin'],
            'registration_until' => ['nullable', 'date'],

            'condition' => ['nullable', 'string', 'max:30'],
            'status' => ['nullable', 'string', 'max:30'],
            'is_featured' => ['nullable', 'boolean'],
            'location' => ['nullable', 'string', 'max:255'],

            'published_at' => ['nullable', 'date'],
            'sold_at' => ['nullable', 'date'],

            'feature_ids' => ['nullable', 'array'],
            'feature_ids.*' => ['integer', 'exists:vehicle_features,id'],
        ];
    }
}
