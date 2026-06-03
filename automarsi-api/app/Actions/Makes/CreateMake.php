<?php

namespace App\Actions\Makes;

use App\Models\Make;
use App\Services\SlugService;

class CreateMake
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(array $data): Make
    {
        $data['slug'] = $this->slugService->unique(Make::class, $data['name']);

        return Make::create($data);
    }
}
