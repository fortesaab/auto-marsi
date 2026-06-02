<?php

namespace App\Http\Requests\Admin\Listings;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexListingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:30'],
            'condition' => ['nullable', 'string', 'max:30'],
            'make_id' => ['nullable', 'integer', 'exists:makes,id'],
            'car_model_id' => ['nullable', 'integer', 'exists:car_models,id'],
            'is_featured' => ['nullable', 'boolean'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }
}
