<?php

namespace App\Actions\ListingImages;

use App\Models\ListingImage;
use Illuminate\Support\Facades\DB;

class SetPrimaryListingImage
{
    public function handle(ListingImage $listingImage): ListingImage
    {
        return DB::transaction(function () use ($listingImage) {
            $listingImage->listing
                ->images()
                ->update(['is_primary' => false]);

            $listingImage->update(['is_primary' => true]);

            return $listingImage->fresh();
        });
    }
}