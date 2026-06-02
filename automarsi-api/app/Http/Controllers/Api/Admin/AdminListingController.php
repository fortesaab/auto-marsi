<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Listings\CreateListing;
use App\Actions\Listings\DeleteListing;
use App\Actions\Listings\UpdateListing;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Listings\IndexListingsRequest;
use App\Http\Requests\Admin\Listings\StoreListingRequest;
use App\Http\Requests\Admin\Listings\UpdateListingRequest;
use App\Http\Resources\ListingCollection;
use App\Http\Resources\ListingResource;
use App\Models\Listing;
use App\Queries\AdminListingQuery;
use Illuminate\Http\JsonResponse;

class AdminListingController extends Controller
{
    public function index(IndexListingsRequest $request, AdminListingQuery $query): ListingCollection
    {
        return new ListingCollection(
            $query->paginate($request->validated())
        );
    }

    public function store(StoreListingRequest $request, CreateListing $createListing): ListingResource
    {
        $listing = $createListing->handle($request->validated(), $request->user());

        return new ListingResource(
            $listing->load(['make', 'carModel', 'primaryImage', 'images', 'features'])
        );
    }

    public function show(Listing $listing): ListingResource
    {
        return new ListingResource(
            $listing->load(['make', 'carModel', 'primaryImage', 'images', 'features'])
        );
    }

    public function update(
        UpdateListingRequest $request,
        Listing $listing,
        UpdateListing $updateListing
    ): ListingResource {
        $listing = $updateListing->handle($listing, $request->validated());

        return new ListingResource(
            $listing->load(['make', 'carModel', 'primaryImage', 'images', 'features'])
        );
    }

    public function destroy(Listing $listing, DeleteListing $deleteListing): JsonResponse
    {
        $deleteListing->handle($listing);

        return response()->json(status: 204);
    }
}
