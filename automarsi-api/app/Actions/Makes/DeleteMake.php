<?php

namespace App\Actions\Makes;

use App\Models\Make;
use Illuminate\Validation\ValidationException;

class DeleteMake
{
    public function handle(Make $make): void
    {
        if ($make->listings()->exists()) {
            throw ValidationException::withMessages([
                'make' => ['This make cannot be deleted because it has listings.'],
            ]);
        }

        $make->delete();
    }
}
