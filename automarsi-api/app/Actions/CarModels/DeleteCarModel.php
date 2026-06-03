<?php

namespace App\Actions\CarModels;

use App\Models\CarModel;
use Illuminate\Validation\ValidationException;

class DeleteCarModel
{
    public function handle(CarModel $carModel): void
    {
        if ($carModel->listings()->exists()) {
            throw ValidationException::withMessages([
                'car_model' => ['This car model cannot be deleted because it has listings.'],
            ]);
        }

        $carModel->delete();
    }
}
