<?php

namespace App\Actions\Listings;

use App\Models\Listing;

class DeleteListing
{
    public function handle(Listing $listing): void
    {
        $listing->delete();
    }
}
