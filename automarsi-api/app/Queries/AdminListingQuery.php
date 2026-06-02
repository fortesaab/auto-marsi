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
            ->when($filters['search'] ?? null, function ($query, string $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('vin', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['condition'] ?? null, fn ($query, $condition) => $query->where('condition', $condition))
            ->when($filters['make_id'] ?? null, fn ($query, $makeId) => $query->where('make_id', $makeId))
            ->when($filters['car_model_id'] ?? null, fn ($query, $modelId) => $query->where('car_model_id', $modelId))
            ->when(isset($filters['is_featured']), fn ($query) => $query->where('is_featured', $filters['is_featured']))
            ->latest()
            ->paginate($filters['per_page'] ?? 15);
    }
}
