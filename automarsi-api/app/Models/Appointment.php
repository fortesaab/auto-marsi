<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'inquiry_id',
        'name',
        'phone',
        'email',
        'preferred_at',
        'message',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'preferred_at' => 'datetime',
        ];
    }

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
    public function inquiry()
    {
        return $this->belongsTo(Inquiry::class);
    }
}
