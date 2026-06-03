<?php

namespace App\Http\Requests\Admin\VehicleFeatures;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleFeatureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:vehicle_features,name'],
        ];
    }
}
