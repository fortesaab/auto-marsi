<?php

namespace App\Actions\CarModels;

use App\Models\CarModel;
use App\Services\SlugService;

class CreateCarModel
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(array $data): CarModel
    {
        $data['slug'] = $this->slugService->unique(CarModel::class, $data['name']);

        return CarModel::create($data);
    }
}
