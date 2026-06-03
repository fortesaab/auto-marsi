<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\CarModels\CreateCarModel;
use App\Actions\CarModels\DeleteCarModel;
use App\Actions\CarModels\UpdateCarModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CarModels\IndexCarModelsRequest;
use App\Http\Requests\Admin\CarModels\StoreCarModelRequest;
use App\Http\Requests\Admin\CarModels\UpdateCarModelRequest;
use App\Http\Resources\CarModelResource;
use App\Models\CarModel;
use App\Queries\AdminCarModelQuery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminCarModelController extends Controller
{
    public function index(
        IndexCarModelsRequest $request,
        AdminCarModelQuery $query
    ): AnonymousResourceCollection {
        return CarModelResource::collection(
            $query->all($request->validated())
        );
    }

    public function store(
        StoreCarModelRequest $request,
        CreateCarModel $createCarModel
    ): CarModelResource {
        return new CarModelResource(
            $createCarModel->handle($request->validated())
        );
    }

    public function show(CarModel $carModel): CarModelResource
    {
        return new CarModelResource($carModel);
    }

    public function update(
        UpdateCarModelRequest $request,
        CarModel $carModel,
        UpdateCarModel $updateCarModel
    ): CarModelResource {
        return new CarModelResource(
            $updateCarModel->handle($carModel, $request->validated())
        );
    }

    public function destroy(CarModel $carModel, DeleteCarModel $deleteCarModel): JsonResponse
    {
        $deleteCarModel->handle($carModel);

        return response()->json(status: 204);
    }
}
