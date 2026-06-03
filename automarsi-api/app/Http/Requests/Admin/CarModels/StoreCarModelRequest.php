<?php

namespace App\Http\Requests\Admin\CarModels;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCarModelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'make_id' => ['required', 'integer', 'exists:makes,id'],
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('car_models', 'name')
                    ->where('make_id', $this->input('make_id')),
            ],
        ];
    }
}
