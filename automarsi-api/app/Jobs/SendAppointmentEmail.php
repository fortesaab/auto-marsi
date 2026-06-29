<?php

namespace App\Jobs;

use App\Mail\AppointmentScheduledMail;
use App\Models\Appointment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendAppointmentEmail implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Appointment $appointment,
        public string $context = 'scheduled'
    )
    {
    }

    public function handle(): void
    {
        $appointment = $this->appointment->loadMissing(['listing']);

        if (! $appointment->email) {
            return;
        }

        Mail::to($appointment->email)->send(
            new AppointmentScheduledMail($appointment, $this->context)
        );
    }
}
