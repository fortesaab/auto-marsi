<?php

namespace App\Http\Requests\Admin\Listings;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateListingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $listing = $this->route('listing');

        return [
            'make_id' => ['sometimes', 'integer', 'exists:makes,id'],
            'car_model_id' => ['sometimes', 'integer', 'exists:car_models,id'],

            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],

            'year' => ['sometimes', 'integer', 'min:1900', 'max:' . now()->addYear()->year],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['sometimes', 'string', 'size:3'],

            'kilometers' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'fuel_type' => ['sometimes', 'string', 'max:50'],
            'transmission' => ['sometimes', 'string', 'max:50'],
            'body_type' => ['sometimes', 'nullable', 'string', 'max:50'],
            'color' => ['sometimes', 'nullable', 'string', 'max:50'],

            'engine_size' => ['sometimes', 'nullable', 'numeric', 'min:0', 'max:99.9'],
            'horsepower' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'vin' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
                Rule::unique('listings', 'vin')->ignore($listing?->id),
            ],
            'registration_until' => ['sometimes', 'nullable', 'date'],

            'condition' => ['sometimes', 'string', 'max:30'],
            'status' => ['sometimes', 'string', 'max:30'],
            'is_featured' => ['sometimes', 'boolean'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],

            'published_at' => ['sometimes', 'nullable', 'date'],
            'sold_at' => ['sometimes', 'nullable', 'date'],

            'feature_ids' => ['sometimes', 'nullable', 'array'],
            'feature_ids.*' => ['integer', 'exists:vehicle_features,id'],
        ];
    }
}
