<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\CarModels\SyncCarModelFeatures;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CarModels\SyncCarModelFeaturesRequest;
use App\Http\Resources\VehicleFeatureResource;
use App\Models\CarModel;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CarModelFeatureSuggestionsController extends Controller
{
    public function index(
        CarModel $carModel
    ): AnonymousResourceCollection {
        return VehicleFeatureResource::collection(
            $carModel->suggestedFeatures()
                ->where('vehicle_features.is_active', true)
                ->orderBy('name')
                ->get()
        );
    }

    public function update(
        SyncCarModelFeaturesRequest $request,
        CarModel $carModel,
        SyncCarModelFeatures $syncCarModelFeatures
    ): AnonymousResourceCollection {
        return VehicleFeatureResource::collection(
            $syncCarModelFeatures->handle(
                $carModel,
                $request->validated('feature_ids')
            )
        );
    }
}
