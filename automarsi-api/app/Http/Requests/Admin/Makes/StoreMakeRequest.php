<?php

namespace App\Http\Requests\Admin\Makes;

use Illuminate\Foundation\Http\FormRequest;

class StoreMakeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:makes,name'],
            'logo_url' => ['nullable', 'url', 'max:2048'],
        ];
    }
}
