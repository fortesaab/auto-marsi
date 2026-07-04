<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function listings()
    {
        return $this->belongsToMany(Listing::class, 'listing_feature')
            ->withTimestamps();
    }

    public function carModels()
    {
        return $this->belongsToMany(
            CarModel::class,
            'car_model_feature'
        )
            ->withPivot('source')
            ->withTimestamps();
    }
}
