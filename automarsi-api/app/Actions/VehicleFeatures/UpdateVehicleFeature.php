<?php

namespace App\Actions\VehicleFeatures;

use App\Models\VehicleFeature;
use App\Services\SlugService;

class UpdateVehicleFeature
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(VehicleFeature $vehicleFeature, array $data): VehicleFeature
    {
        if (isset($data['name']) && $data['name'] !== $vehicleFeature->name) {
            $data['slug'] = $this->slugService->unique(
                VehicleFeature::class,
                $data['name'],
                $vehicleFeature->id
            );
        }

        $vehicleFeature->update($data);

        return $vehicleFeature->fresh();
    }
}
