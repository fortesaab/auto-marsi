<?php

namespace App\Http\Requests\Admin\Appointments;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'listing_id' => ['nullable', 'integer', 'exists:listings,id'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'preferred_at' => ['required', 'date', 'after_or_equal:now'],
            'message' => ['nullable', 'string', 'max:5000'],
            'status' => ['nullable', Rule::in(['pending', 'confirmed', 'completed', 'cancelled'])],
        ];
    }
}
