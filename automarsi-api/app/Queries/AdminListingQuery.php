<?php

namespace App\Queries;

use App\Models\Listing;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AdminListingQuery
{
    public function paginate(array $filters): LengthAwarePaginator
    {
        return Listing::query()
            ->with(['make', 'carModel', 'primaryImage'])
            ->when($filters['search'] ?? null, function ($query, string $searchTerm) {
                $escapedSearchTerm = $this->escapeLikeSearch($searchTerm);

                $query->where(function ($query) use ($escapedSearchTerm) {
                    $query->whereRaw("title like ? escape '\\'", ["%{$escapedSearchTerm}%"])
                        ->orWhereRaw("vin like ? escape '\\'", ["%{$escapedSearchTerm}%"])
                        ->orWhereRaw("location like ? escape '\\'", ["%{$escapedSearchTerm}%"]);
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['condition'] ?? null, fn ($query, $condition) => $query->where('condition', $condition))
            ->when($filters['make_id'] ?? null, fn ($query, $makeId) => $query->where('make_id', $makeId))
            ->when($filters['car_model_id'] ?? null, fn ($query, $carModelId) => $query->where('car_model_id', $carModelId))
            ->when(array_key_exists('is_featured', $filters), fn ($query) => $query->where('is_featured', $filters['is_featured']))
            ->latest()
            ->paginate($filters['per_page'] ?? 15);
    }

    private function escapeLikeSearch(string $searchTerm): string
    {
        return str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $searchTerm);
    }
}
