<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarModelResource;
use App\Http\Resources\MakeResource;
use App\Models\Make;
use App\Queries\MakeCatalogQuery;

class MakeController extends Controller
{
    public function index(MakeCatalogQuery $query)
    {
        return MakeResource::collection($query->allMakes());
    }

    public function models(Make $make, MakeCatalogQuery $query)
    {
        return CarModelResource::collection($query->modelsForMake($make));
    }
}
