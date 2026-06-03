<?php

namespace App\Queries;

use App\Models\Make;
use Illuminate\Database\Eloquent\Collection;

class MakeCatalogQuery
{
    public function allMakes(): Collection
    {
        return Make::query()
            ->orderBy('name')
            ->get();
    }

    public function modelsForMake(Make $make): Collection
    {
        return $make->carModels()
            ->orderBy('name')
            ->get();
    }
}
