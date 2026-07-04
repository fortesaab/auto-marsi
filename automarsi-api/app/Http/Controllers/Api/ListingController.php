<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Public\Listings\IndexListingsRequest;
use App\Http\Resources\ListingCollection;
use App\Http\Resources\ListingResource;
use App\Models\Listing;
use App\Queries\PublicListingQuery;

class ListingController extends Controller
{
    public function index(IndexListingsRequest $request, PublicListingQuery $query): ListingCollection
    {
        return new ListingCollection(
            $query->paginate($request->validated())
        );
    }

    public function show(Listing $listing): ListingResource
    {
        abort_unless($listing->status === 'active', 404);

        return new ListingResource(
            $listing->load([
                'make',
                'carModel',
                'primaryImage',
                'images',
                'features' => fn ($query) => $query->where('vehicle_features.is_active', true),
            ])
        );
    }
}
