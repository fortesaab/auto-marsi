<?php

namespace App\Queries;

use App\Models\Listing;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PublicListingQuery
{
    public function paginate(array $filters): LengthAwarePaginator
    {
        return Listing::query()
            ->with(['make', 'carModel', 'primaryImage', 'images'])
            ->where('status', 'active')
            ->when(
                $filters['make_id'] ?? null,
                fn($query, $makeId) =>
                $query->where('make_id', $makeId)
            )
            ->when(
                $filters['car_model_id'] ?? null,
                fn($query, $modelId) =>
                $query->where('car_model_id', $modelId)
            )
            ->when(
                $filters['year'] ?? null,
                fn($query, $year) =>
                $query->where('year', $year)
            )
            ->when(isset($filters['min_price']), function ($query) use ($filters) {
                return $query->where('price', '>=', $filters['min_price']);
            })
            ->when(isset($filters['max_price']), function ($query) use ($filters) {
                return $query->where('price', '<=', $filters['max_price']);
            })
            ->when(
                $filters['fuel_type'] ?? null,
                fn($query, $fuelType) =>
                $query->where('fuel_type', $fuelType)
            )
            ->when(
                $filters['transmission'] ?? null,
                fn($query, $transmission) =>
                $query->where('transmission', $transmission)
            )
            ->when(
                $filters['body_type'] ?? null,
                fn($query, $bodyType) =>
                $query->where('body_type', $bodyType)
            )
            ->when(isset($filters['search']) && $filters['search'] !== null, function ($query) use ($filters) {
                $search = '%' . strtolower($filters['search']) . '%';

                $query->where(function ($query) use ($search) {
                    $query->whereRaw('lower(title) like ?', [$search])
                        ->orWhereRaw('lower(description) like ?', [$search])
                        ->orWhereRaw('lower(location) like ?', [$search]);
                });
            })
            ->latest('published_at')
            ->paginate($filters['per_page'] ?? 12);
    }
}
