<?php

namespace App\Actions\ListingImages;

use App\Models\ListingImage;
use App\Services\ListingImageStorageService;
use Illuminate\Support\Facades\DB;

class DeleteListingImage
{
    public function __construct(private ListingImageStorageService $storage)
    {
    }

    public function handle(ListingImage $listingImage): void
    {
        DB::transaction(function () use ($listingImage) {
            $disk = $listingImage->disk;
            $path = $listingImage->path;

            $listingImage->delete();

            $this->storage->delete($disk, $path);
        });
    }
}