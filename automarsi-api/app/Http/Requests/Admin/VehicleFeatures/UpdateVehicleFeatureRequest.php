<?php

namespace App\Http\Requests\Admin\VehicleFeatures;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleFeatureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $vehicleFeature = $this->route('vehicle_feature');

        return [
            'name' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('vehicle_features', 'name')->ignore($vehicleFeature?->id),
            ],
            'icon' => ['sometimes', 'nullable', 'string', 'max:100'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
