<?php

namespace App\Actions\Listings;

use App\Models\Listing;
use App\Services\SlugService;
use Illuminate\Support\Facades\DB;

class UpdateListing
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(Listing $listing, array $data): Listing
    {
        return DB::transaction(function () use ($listing, $data) {
            $featureIds = $data['feature_ids'] ?? null;
            unset($data['feature_ids']);

            if (isset($data['title']) && $data['title'] !== $listing->title) {
                $data['slug'] = $this->slugService->unique(Listing::class, $data['title'], $listing->id);
            }

            $listing->update($data);

            if ($featureIds !== null) {
                $listing->features()->sync($featureIds);
            }

            return $listing->fresh();
        });
    }
}
