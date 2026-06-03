<?php

namespace App\Queries;

use App\Models\Listing;
use Illuminate\Database\Eloquent\Collection;

class AdminListingImageQuery
{
    public function allForListing(Listing $listing): Collection
    {
        return $listing->images()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }
}