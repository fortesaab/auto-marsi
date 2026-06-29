<?php

namespace App\Mail;

use App\Models\Appointment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class AppointmentScheduledMail extends Mailable
{
    public function __construct(
        public Appointment $appointment,
        public string $context = 'scheduled'
    )
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->context === 'updated'
                ? 'Your AutoMarsi appointment was updated'
                : 'Your AutoMarsi appointment is scheduled'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.appointments.scheduled',
            with: [
                'appointment' => $this->appointment,
                'context' => $this->context,
            ]
        );
    }
}
