<?php

namespace App\Actions\Appointments;

use App\Models\Appointment;

class CreateAppointment
{
    public function handle(array $data): Appointment
    {
        $data['status'] = $data['status'] ?? 'pending';

        return Appointment::create($data)
            ->load(['listing.make', 'listing.carModel', 'inquiry']);
    }
}
