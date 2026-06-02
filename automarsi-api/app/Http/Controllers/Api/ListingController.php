<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ListingCollection;
use App\Http\Resources\ListingResource;
use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        $listings = Listing::query()
            ->with(['make', 'carModel', 'primaryImage', 'images'])
            ->where('status', 'active')
            ->when($request->filled('make_id'), fn ($query) =>
                $query->where('make_id', $request->integer('make_id'))
            )
            ->when($request->filled('car_model_id'), fn ($query) =>
                $query->where('car_model_id', $request->integer('car_model_id'))
            )
            ->when($request->filled('year'), fn ($query) =>
                $query->where('year', $request->integer('year'))
            )
            ->when($request->filled('min_price'), fn ($query) =>
                $query->where('price', '>=', $request->input('min_price'))
            )
            ->when($request->filled('max_price'), fn ($query) =>
                $query->where('price', '<=', $request->input('max_price'))
            )
            ->when($request->filled('fuel_type'), fn ($query) =>
                $query->where('fuel_type', $request->string('fuel_type'))
            )
            ->when($request->filled('transmission'), fn ($query) =>
                $query->where('transmission', $request->string('transmission'))
            )
            ->when($request->filled('body_type'), fn ($query) =>
                $query->where('body_type', $request->string('body_type'))
            )
            ->when($request->filled('q'), function ($query) use ($request) {
                $search = $request->string('q');

                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->latest('published_at')
            ->paginate($request->integer('per_page', 12));

        return new ListingCollection($listings);
    }

    public function show(Listing $listing)
    {
        abort_unless($listing->status === 'active', 404);

        $listing->load(['make', 'carModel', 'images', 'features']);

        return new ListingResource($listing);
    }
}