<?php

namespace App\Actions\CarModels;

use App\Models\CarModel;
use App\Models\VehicleFeature;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class SyncCarModelFeatures
{
    public function handle(
        CarModel $carModel,
        array $featureIds
    ): Collection {
        return DB::transaction(function () use ($carModel, $featureIds) {
            $activeFeatureIds = VehicleFeature::query()
                ->whereIn('id', $featureIds)
                ->where('is_active', true)
                ->pluck('id')
                ->all();

            $carModel->suggestedFeatures()->syncWithPivotValues(
                $activeFeatureIds,
                ['source' => 'manual']
            );

            return $carModel->suggestedFeatures()
                ->where('vehicle_features.is_active', true)
                ->orderBy('name')
                ->get();
        });
    }
}
