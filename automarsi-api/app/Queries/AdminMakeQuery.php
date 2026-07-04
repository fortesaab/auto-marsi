<?php

namespace App\Queries;

use App\Models\Make;
use Illuminate\Database\Eloquent\Collection;

class AdminMakeQuery
{
    public function all(): Collection
    {
        return Make::query()
            ->with([
                'carModels' => fn ($query) => $query->orderBy('name'),
            ])
            ->withCount(['carModels', 'listings'])
            ->orderBy('name')
            ->get();
    }
}
