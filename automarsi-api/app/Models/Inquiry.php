<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'name',
        'email',
        'phone',
        'message',
        'source',
        'status',
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
