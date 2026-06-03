<?php

namespace App\Http\Requests\Admin\CarModels;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCarModelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $carModel = $this->route('car_model');
        $makeId = $this->input('make_id', $carModel?->make_id);

        return [
            'make_id' => ['sometimes', 'integer', 'exists:makes,id'],
            'name' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('car_models', 'name')
                    ->where('make_id', $makeId)
                    ->ignore($carModel?->id),
            ],
        ];
    }
}
