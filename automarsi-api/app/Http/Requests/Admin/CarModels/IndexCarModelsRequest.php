<?php

namespace App\Http\Requests\Admin\CarModels;

use Illuminate\Foundation\Http\FormRequest;

class IndexCarModelsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'make_id' => ['nullable', 'integer', 'exists:makes,id'],
        ];
    }
}
