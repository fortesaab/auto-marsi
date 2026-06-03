<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\ListingImages\CreateListingImage;
use App\Actions\ListingImages\DeleteListingImage;
use App\Actions\ListingImages\SetPrimaryListingImage;
use App\Actions\ListingImages\UpdateListingImage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ListingImages\StoreListingImageRequest;
use App\Http\Requests\Admin\ListingImages\UpdateListingImageRequest;
use App\Http\Resources\ListingImageResource;
use App\Models\Listing;
use App\Models\ListingImage;
use App\Queries\AdminListingImageQuery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminListingImageController extends Controller
{
    public function index(
        Listing $listing,
        AdminListingImageQuery $query
    ): AnonymousResourceCollection {
        return ListingImageResource::collection(
            $query->allForListing($listing)
        );
    }

    public function store(
        StoreListingImageRequest $request,
        Listing $listing,
        CreateListingImage $createListingImage
    ): ListingImageResource {
        $listingImage = $createListingImage->handle(
            $listing,
            $request->file('image'),
            $request->validated()
        );

        return new ListingImageResource($listingImage);
    }

    public function update(
        UpdateListingImageRequest $request,
        ListingImage $listingImage,
        UpdateListingImage $updateListingImage
    ): ListingImageResource {
        return new ListingImageResource(
            $updateListingImage->handle($listingImage, $request->validated())
        );
    }

    public function destroy(
        ListingImage $listingImage,
        DeleteListingImage $deleteListingImage
    ): JsonResponse {
        $deleteListingImage->handle($listingImage);

        return response()->json(status: 204);
    }

    public function primary(
        ListingImage $listingImage,
        SetPrimaryListingImage $setPrimaryListingImage
    ): ListingImageResource {
        return new ListingImageResource(
            $setPrimaryListingImage->handle($listingImage)
        );
    }
}