<?php

namespace App\Actions\ListingImages;

use App\Models\ListingImage;

class UpdateListingImage
{
    public function handle(ListingImage $listingImage, array $data): ListingImage
    {
        $listingImage->update($data);

        return $listingImage->fresh();
    }
}