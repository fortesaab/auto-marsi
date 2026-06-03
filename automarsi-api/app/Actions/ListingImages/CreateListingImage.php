<?php

namespace App\Actions\ListingImages;

use App\Models\Listing;
use App\Models\ListingImage;
use App\Services\ListingImageStorageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class CreateListingImage
{
    public function __construct(private ListingImageStorageService $storage)
    {
    }

    public function handle(Listing $listing, UploadedFile $file, array $data): ListingImage
    {
        return DB::transaction(function () use ($listing, $file, $data) {
            $storedFile = $this->storage->store($file, $listing->id);

            $isFirstImage = ! $listing->images()->exists();
            $isPrimary = (bool) ($data['is_primary'] ?? false) || $isFirstImage;

            if ($isPrimary) {
                $listing->images()->update(['is_primary' => false]);
            }

            return $listing->images()->create([
                ...$storedFile,
                'alt_text' => $data['alt_text'] ?? null,
                'sort_order' => $data['sort_order'] ?? $listing->images()->count(),
                'is_primary' => $isPrimary,
            ]);
        });
    }
}