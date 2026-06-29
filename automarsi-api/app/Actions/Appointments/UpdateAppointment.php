<?php

namespace App\Actions\Appointments;

use App\Jobs\SendAppointmentEmail;
use App\Models\Appointment;

class UpdateAppointment
{
    public function handle(Appointment $appointment, array $data): Appointment
    {
        $appointment->update($data);

        $updatedAppointment = $appointment->fresh([
            'listing.make',
            'listing.carModel',
            'inquiry',
        ]);

        if ($updatedAppointment->email && $appointment->wasChanged([
            'listing_id',
            'name',
            'phone',
            'email',
            'preferred_at',
            'message',
            'status',
        ])) {
            SendAppointmentEmail::dispatch($updatedAppointment, 'updated');
        }

        return $updatedAppointment;
    }
}
