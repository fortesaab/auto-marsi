<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarModelResource;
use App\Http\Resources\MakeResource;
use App\Models\Make;
use Illuminate\Http\Request;

class MakeController extends Controller
{
    public function index()
    {
        $makes = Make::query()
            ->orderBy('name')
            ->get();

        return MakeResource::collection($makes);
    }

    public function models(Make $make)
    {
        $models = $make->carModels()
            ->orderBy('name')
            ->get();

        return CarModelResource::collection($models);
    }
}
