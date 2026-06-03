<?php

namespace App\Http\Requests\Admin\Makes;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMakeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $make = $this->route('make');

        return [
            'name' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('makes', 'name')->ignore($make?->id),
            ],
            'logo_url' => ['sometimes', 'nullable', 'url', 'max:2048'],
        ];
    }
}
