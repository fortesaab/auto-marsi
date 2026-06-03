<?php

namespace App\Http\Requests\Admin\ListingImages;

use Illuminate\Foundation\Http\FormRequest;

class UpdateListingImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'alt_text' => ['sometimes', 'nullable', 'string', 'max:255'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}