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
            subject: $this->subjectText()
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.appointments.scheduled',
            with: [
                'appointment' => $this->appointment,
                'context' => $this->context,
                'titleText' => $this->titleText(),
                'introText' => $this->introText(),
                'noteText' => $this->noteText(),
            ]
        );
    }

    public function subjectText(): string
    {
        return match ($this->appointment->status) {
            'cancelled' => 'Your AutoMarsi appointment was cancelled',
            'confirmed' => 'Your AutoMarsi appointment is confirmed',
            'completed' => 'Your AutoMarsi appointment was completed',
            default => $this->context === 'updated'
                ? 'Your AutoMarsi appointment was updated'
                : 'Your AutoMarsi appointment is scheduled',
        };
    }

    public function titleText(): string
    {
        return match ($this->appointment->status) {
            'cancelled' => 'Your appointment was cancelled',
            'confirmed' => 'Your appointment is confirmed',
            'completed' => 'Your appointment was completed',
            default => $this->context === 'updated'
                ? 'Your appointment was updated'
                : 'Your appointment is scheduled',
        };
    }

    public function introText(): string
    {
        return match ($this->appointment->status) {
            'cancelled' => 'your AutoMarsi appointment has been cancelled.',
            'confirmed' => 'your AutoMarsi appointment is confirmed.',
            'completed' => 'your AutoMarsi appointment has been completed. Thank you for visiting AutoMarsi.',
            default => $this->context === 'updated'
                ? 'your AutoMarsi appointment details have changed.'
                : 'we have scheduled your visit with AutoMarsi.',
        };
    }

    public function noteText(): string
    {
        return match ($this->appointment->status) {
            'cancelled' => 'If this was unexpected or you want to book a new time, please contact the AutoMarsi team.',
            'completed' => 'If you have any follow-up questions, the AutoMarsi team is here to help.',
            default => 'If you need to change the time, please contact the AutoMarsi team before your appointment.',
        };
    }
}
