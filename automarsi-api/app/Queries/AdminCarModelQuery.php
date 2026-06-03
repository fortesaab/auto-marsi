<?php

namespace App\Queries;

use App\Models\CarModel;
use Illuminate\Database\Eloquent\Collection;

class AdminCarModelQuery
{
    public function all(array $filters): Collection
    {
        return CarModel::query()
            ->with('make')
            ->when($filters['make_id'] ?? null, fn ($query, $makeId) =>
                $query->where('make_id', $makeId)
            )
            ->orderBy('name')
            ->get();
    }
}
