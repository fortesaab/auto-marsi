<?php

namespace App\Actions\Inquiries;

use App\Models\Appointment;
use App\Models\Inquiry;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Jobs\SendAppointmentEmail;

class ConvertInquiryToAppointment
{
    public function handle(Inquiry $inquiry, array $data): Appointment
    {
        return DB::transaction(function () use ($inquiry, $data) {
            $lockedInquiry = Inquiry::query()
                ->lockForUpdate()
                ->findOrFail($inquiry->id);

            if ($lockedInquiry->appointments()->exists()) {
                throw ValidationException::withMessages([
                    'inquiry_id' => ['This inquiry already has an appointment.'],
                ]);
            }

            $appointment = Appointment::create([
                'listing_id' => $lockedInquiry->listing_id,
                'inquiry_id' => $lockedInquiry->id,
                'name' => $lockedInquiry->name,
                'phone' => $lockedInquiry->phone,
                'email' => $lockedInquiry->email,
                'preferred_at' => $data['preferred_at'],
                'message' => $data['message'] ?? $lockedInquiry->message,
                'status' => $data['status'] ?? 'pending',
            ]);

            SendAppointmentEmail::dispatch($appointment);

            $lockedInquiry->update([
                'status' => 'closed',
            ]);

            return $appointment->load(['listing.make', 'listing.carModel', 'inquiry']);
        });
    }
}
