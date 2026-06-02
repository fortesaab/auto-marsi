<?php

namespace App\Actions\Listings;

use App\Models\Listing;
use App\Models\User;
use App\Services\SlugService;
use Illuminate\Support\Facades\DB;

class CreateListing
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(array $data, ?User $user): Listing
    {
        return DB::transaction(function () use ($data, $user) {
            $featureIds = $data['feature_ids'] ?? [];
            unset($data['feature_ids']);

            $data['slug'] = $this->slugService->unique(Listing::class, $data['title']);
            $data['created_by'] = $user?->id;

            $listing = Listing::create($data);
            $listing->features()->sync($featureIds);

            return $listing;
        });
    }
}
