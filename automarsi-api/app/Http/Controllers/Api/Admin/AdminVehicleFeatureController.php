<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\VehicleFeatures\CreateVehicleFeature;
use App\Actions\VehicleFeatures\DeleteVehicleFeature;
use App\Actions\VehicleFeatures\UpdateVehicleFeature;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\VehicleFeatures\StoreVehicleFeatureRequest;
use App\Http\Requests\Admin\VehicleFeatures\UpdateVehicleFeatureRequest;
use App\Http\Resources\VehicleFeatureResource;
use App\Models\VehicleFeature;
use App\Queries\AdminVehicleFeatureQuery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminVehicleFeatureController extends Controller
{
    public function index(AdminVehicleFeatureQuery $query): AnonymousResourceCollection
    {
        return VehicleFeatureResource::collection($query->all());
    }

    public function store(
        StoreVehicleFeatureRequest $request,
        CreateVehicleFeature $createVehicleFeature
    ): VehicleFeatureResource {
        return new VehicleFeatureResource(
            $createVehicleFeature->handle($request->validated())
        );
    }

    public function show(VehicleFeature $vehicleFeature): VehicleFeatureResource
    {
        return new VehicleFeatureResource($vehicleFeature);
    }

    public function update(
        UpdateVehicleFeatureRequest $request,
        VehicleFeature $vehicleFeature,
        UpdateVehicleFeature $updateVehicleFeature
    ): VehicleFeatureResource {
        return new VehicleFeatureResource(
            $updateVehicleFeature->handle($vehicleFeature, $request->validated())
        );
    }

    public function destroy(
        VehicleFeature $vehicleFeature,
        DeleteVehicleFeature $deleteVehicleFeature
    ): JsonResponse {
        $deleteVehicleFeature->handle($vehicleFeature);

        return response()->json(status: 204);
    }
}
