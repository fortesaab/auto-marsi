<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Makes\CreateMake;
use App\Actions\Makes\DeleteMake;
use App\Actions\Makes\UpdateMake;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Makes\StoreMakeRequest;
use App\Http\Requests\Admin\Makes\UpdateMakeRequest;
use App\Http\Resources\MakeResource;
use App\Models\Make;
use App\Queries\AdminMakeQuery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminMakeController extends Controller
{
    public function index(AdminMakeQuery $query): AnonymousResourceCollection
    {
        return MakeResource::collection($query->all());
    }

    public function store(StoreMakeRequest $request, CreateMake $createMake): MakeResource
    {
        return new MakeResource(
            $createMake->handle($request->validated())
        );
    }

    public function show(Make $make): MakeResource
    {
        return new MakeResource($make);
    }

    public function update(
        UpdateMakeRequest $request,
        Make $make,
        UpdateMake $updateMake
    ): MakeResource {
        return new MakeResource(
            $updateMake->handle($make, $request->validated())
        );
    }

    public function destroy(Make $make, DeleteMake $deleteMake): JsonResponse
    {
        $deleteMake->handle($make);

        return response()->json(status: 204);
    }
}
