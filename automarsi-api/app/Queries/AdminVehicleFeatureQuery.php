<?php

namespace App\Queries;

use App\Models\VehicleFeature;
use Illuminate\Database\Eloquent\Collection;

class AdminVehicleFeatureQuery
{
    public function all(): Collection
    {
        return VehicleFeature::query()
            ->withCount('listings')
            ->orderBy('name')
            ->get();
    }
}
