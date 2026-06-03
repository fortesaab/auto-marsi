<?php

namespace App\Actions\Makes;

use App\Models\Make;
use App\Services\SlugService;

class UpdateMake
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(Make $make, array $data): Make
    {
        if (isset($data['name']) && $data['name'] !== $make->name) {
            $data['slug'] = $this->slugService->unique(Make::class, $data['name'], $make->id);
        }

        $make->update($data);

        return $make->fresh();
    }
}
