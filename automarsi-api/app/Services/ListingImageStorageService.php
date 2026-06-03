<?php

namespace App\Services;

use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ListingImageStorageService
{
    public function store(UploadedFile $file, int $listingId): array
    {
        $disk = 'public';
        $path = $file->store("listings/{$listingId}", $disk);

        /** @var FilesystemAdapter $storage */
        $storage = Storage::disk($disk);

        return [
            'disk' => $disk,
            'path' => $path,
            'image_url' => $storage->url($path),
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ];
    }

    public function delete(?string $disk, ?string $path): void
    {
        if (! $disk || ! $path) {
            return;
        }

        Storage::disk($disk)->delete($path);
    }
}