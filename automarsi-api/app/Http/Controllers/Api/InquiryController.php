<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Listing;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'listing_id' => ['nullable', 'exists:listings,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'message' => ['nullable', 'string', 'max:5000'],
            'source' => ['nullable', 'string', 'max:50'],
        ]);

        if (! empty($data['listing_id'])) {
            Listing::query()
                ->where('status', 'active')
                ->findOrFail($data['listing_id']);
        }

        $inquiry = Inquiry::create([
            ...$data,
            'status' => 'new',
        ]);

        return response()->json([
            'data' => $inquiry,
            'message' => 'Inquiry submitted successfully.',
        ], 201);
    }
}