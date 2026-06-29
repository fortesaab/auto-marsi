<?php

namespace App\Actions\Appointments;

use App\Jobs\SendAppointmentEmail;
use App\Models\Appointment;

class CreateAppointment
{
    public function handle(array $data): Appointment
    {
        $appointment = Appointment::create([
            ...$data,
            'status' => $data['status'] ?? 'pending',
        ])->load(['listing']);

        SendAppointmentEmail::dispatch($appointment);

        return $appointment;
    }
}