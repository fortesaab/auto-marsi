<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Listing extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'make_id',
        'car_model_id',
        'created_by',
        'title',
        'slug',
        'description',
        'year',
        'price',
        'purchase_price',
        'sale_price',
        'sales_expenses',
        'sale_notes',
        'currency',
        'kilometers',
        'fuel_type',
        'transmission',
        'body_type',
        'color',
        'engine_size',
        'horsepower',
        'vin',
        'registration_until',
        'condition',
        'status',
        'is_featured',
        'location',
        'published_at',
        'sold_at',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'purchase_price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'sales_expenses' => 'decimal:2',
            'engine_size' => 'decimal:1',
            'is_featured' => 'boolean',
            'registration_until' => 'date',
            'published_at' => 'datetime',
            'sold_at' => 'datetime',
        ];
    }

    public function make()
    {
        return $this->belongsTo(Make::class);
    }

    public function carModel()
    {
        return $this->belongsTo(CarModel::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function images()
    {
        return $this->hasMany(ListingImage::class)->orderBy('sort_order');
    }

    public function primaryImage()
    {
        return $this->hasOne(ListingImage::class)->where('is_primary', true);
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function features()
    {
        return $this->belongsToMany(VehicleFeature::class, 'listing_feature')
            ->withTimestamps();
    }
}
