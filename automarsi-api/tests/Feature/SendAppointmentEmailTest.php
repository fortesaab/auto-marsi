<?php

namespace Tests\Feature;

use App\Jobs\SendAppointmentEmail;
use App\Mail\AppointmentScheduledMail;
use App\Models\Appointment;
use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class SendAppointmentEmailTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_sends_appointment_email_to_customer(): void
    {
        Mail::fake();

        $listing = $this->createListing();

        $appointment = Appointment::create([
            'listing_id' => $listing->id,
            'name' => 'John Doe',
            'phone' => '+38344111222',
            'email' => 'john@example.com',
            'preferred_at' => now()->addDay(),
            'message' => 'See you then.',
            'status' => 'pending',
        ]);

        (new SendAppointmentEmail($appointment))->handle();

        Mail::assertSent(AppointmentScheduledMail::class, function ($mail) {
            return $mail->hasTo('john@example.com');
        });
    }

    public function test_it_does_not_send_appointment_email_without_customer_email(): void
    {
        Mail::fake();

        $appointment = Appointment::create([
            'name' => 'Phone Only Customer',
            'phone' => '+38344111222',
            'email' => null,
            'preferred_at' => now()->addDay(),
            'message' => 'Call customer.',
            'status' => 'pending',
        ]);

        (new SendAppointmentEmail($appointment))->handle();

        Mail::assertNothingSent();
    }

    public function test_appointment_email_displays_showroom_timezone(): void
    {
        config()->set('automarsi.timezone', 'Europe/Tirane');

        $appointment = Appointment::create([
            'name' => 'Timezone Customer',
            'phone' => '+38344111222',
            'email' => 'timezone@example.com',
            'preferred_at' => Carbon::parse('2026-06-29 16:30:00', 'UTC'),
            'status' => 'pending',
        ]);

        $html = (new AppointmentScheduledMail($appointment))->render();

        $this->assertStringContainsString('29 Jun 2026, 18:30', $html);
    }

    private function createListing(): Listing
    {
        $make = Make::create([
            'name' => 'BMW',
            'slug' => 'bmw',
        ]);

        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'X5',
            'slug' => 'x5',
        ]);

        return Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => 'BMW X5',
            'slug' => 'bmw-x5',
            'year' => 2020,
            'price' => 35000,
            'currency' => 'EUR',
            'kilometers' => 85000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'condition' => 'used',
            'status' => 'active',
        ]);
    }
}
