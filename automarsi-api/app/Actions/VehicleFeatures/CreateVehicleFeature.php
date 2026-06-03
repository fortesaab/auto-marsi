<?php

namespace App\Actions\VehicleFeatures;

use App\Models\VehicleFeature;
use App\Services\SlugService;

class CreateVehicleFeature
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(array $data): VehicleFeature
    {
        $data['slug'] = $this->slugService->unique(VehicleFeature::class, $data['name']);

        return VehicleFeature::create($data);
    }
}
