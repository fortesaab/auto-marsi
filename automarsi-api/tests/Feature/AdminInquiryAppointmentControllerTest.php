<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Jobs\SendAppointmentEmail;
use App\Models\Appointment;
use App\Models\CarModel;
use App\Models\Inquiry;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Tests\TestCase;

class AdminInquiryAppointmentControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware([
            VerifyClerkToken::class,
            EnsureIsAdmin::class,
        ]);

        Bus::fake();
    }

    public function test_admin_can_convert_inquiry_to_appointment(): void
    {
        $listing = $this->createListing('audi-a6');

        $inquiry = Inquiry::create([
            'listing_id' => $listing->id,
            'name' => 'Elira Berisha',
            'email' => 'elira@example.com',
            'phone' => '+38345123456',
            'message' => 'I want to schedule a showroom visit.',
            'status' => 'new',
        ]);

        $response = $this->postJson("/api/admin/inquiries/{$inquiry->id}/appointment", [
            'preferred_at' => now()->addDay()->toDateTimeString(),
            'message' => 'Appointment confirmed after phone call.',
            'status' => 'confirmed',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.inquiry_id', $inquiry->id)
            ->assertJsonPath('data.listing_id', $listing->id)
            ->assertJsonPath('data.name', 'Elira Berisha')
            ->assertJsonPath('data.phone', '+38345123456')
            ->assertJsonPath('data.email', 'elira@example.com')
            ->assertJsonPath('data.message', 'Appointment confirmed after phone call.')
            ->assertJsonPath('data.status', 'confirmed');

        $this->assertDatabaseHas('appointments', [
            'inquiry_id' => $inquiry->id,
            'listing_id' => $listing->id,
            'name' => 'Elira Berisha',
            'phone' => '+38345123456',
            'email' => 'elira@example.com',
            'message' => 'Appointment confirmed after phone call.',
            'status' => 'confirmed',
        ]);

        $this->assertDatabaseHas('inquiries', [
            'id' => $inquiry->id,
            'status' => 'closed',
        ]);

        $this->getJson('/api/admin/inquiries')
            ->assertOk()
            ->assertJsonPath('data.0.has_appointment', true);

        Bus::assertDispatched(SendAppointmentEmail::class);
    }

    public function test_converted_appointment_defaults_to_pending_and_uses_inquiry_message(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'Ardian Krasniqi',
            'email' => 'ardian@example.com',
            'phone' => '+38344111222',
            'message' => 'Original customer message.',
            'status' => 'new',
        ]);

        $response = $this->postJson("/api/admin/inquiries/{$inquiry->id}/appointment", [
            'preferred_at' => now()->addDay()->toDateTimeString(),
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.inquiry_id', $inquiry->id)
            ->assertJsonPath('data.message', 'Original customer message.')
            ->assertJsonPath('data.status', 'pending');

        $this->assertDatabaseHas('appointments', [
            'inquiry_id' => $inquiry->id,
            'message' => 'Original customer message.',
            'status' => 'pending',
        ]);
    }

    public function test_admin_cannot_convert_inquiry_to_appointment_with_invalid_status(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'Invalid Status Lead',
            'phone' => '+38344111222',
            'status' => 'new',
        ]);

        $response = $this->postJson("/api/admin/inquiries/{$inquiry->id}/appointment", [
            'preferred_at' => now()->addDay()->toDateTimeString(),
            'status' => 'completed',
        ]);

        $response->assertUnprocessable();
    }

    public function test_admin_cannot_convert_inquiry_to_appointment_in_the_past(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'Past Appointment Lead',
            'phone' => '+38344111222',
            'status' => 'new',
        ]);

        $response = $this->postJson("/api/admin/inquiries/{$inquiry->id}/appointment", [
            'preferred_at' => now()->subDay()->toDateTimeString(),
            'status' => 'pending',
        ]);

        $response->assertUnprocessable();
    }

    public function test_admin_cannot_convert_same_inquiry_twice(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'Duplicate Lead',
            'phone' => '+38344111222',
            'status' => 'new',
        ]);

        Appointment::create([
            'inquiry_id' => $inquiry->id,
            'name' => 'Duplicate Lead',
            'phone' => '+38344111222',
            'preferred_at' => now()->addDay(),
            'status' => 'pending',
        ]);

        $response = $this->postJson("/api/admin/inquiries/{$inquiry->id}/appointment", [
            'preferred_at' => now()->addDays(2)->toDateTimeString(),
            'status' => 'pending',
        ]);

        $response->assertUnprocessable();

        $this->assertDatabaseCount('appointments', 1);
    }

    public function test_database_prevents_duplicate_appointments_for_an_inquiry(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'Unique Lead',
            'phone' => '+38344111222',
            'status' => 'new',
        ]);

        Appointment::create([
            'inquiry_id' => $inquiry->id,
            'name' => 'Unique Lead',
            'phone' => '+38344111222',
            'preferred_at' => now()->addDay(),
            'status' => 'pending',
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);

        Appointment::create([
            'inquiry_id' => $inquiry->id,
            'name' => 'Unique Lead',
            'phone' => '+38344111222',
            'preferred_at' => now()->addDays(2),
            'status' => 'pending',
        ]);
    }

    private function createListing(string $slug): Listing
    {
        $make = Make::create([
            'name' => "Make {$slug}",
            'slug' => "make-{$slug}",
        ]);

        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => "Model {$slug}",
            'slug' => "model-{$slug}",
        ]);

        return Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => "Listing {$slug}",
            'slug' => $slug,
            'year' => 2021,
            'price' => 25000,
            'kilometers' => 90000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'active',
        ]);
    }
}
