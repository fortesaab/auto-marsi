<?php

namespace App\Actions\VehicleFeatures;

use App\Models\VehicleFeature;
use Illuminate\Validation\ValidationException;

class DeleteVehicleFeature
{
    public function handle(VehicleFeature $vehicleFeature): void
    {
        if ($vehicleFeature->listings()->exists()) {
            throw ValidationException::withMessages([
                'vehicle_feature' => ['This feature cannot be deleted because it is used by listings.'],
            ]);
        }

        $vehicleFeature->delete();
    }
}
