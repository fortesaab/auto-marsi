<?php

namespace App\Actions\CarModels;

use App\Models\CarModel;
use App\Services\SlugService;

class UpdateCarModel
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(CarModel $carModel, array $data): CarModel
    {
        if (isset($data['name']) && $data['name'] !== $carModel->name) {
            $data['slug'] = $this->slugService->unique(CarModel::class, $data['name'], $carModel->id);
        }

        $carModel->update($data);

        return $carModel->fresh();
    }
}
