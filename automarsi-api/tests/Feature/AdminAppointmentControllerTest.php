<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\Appointment;
use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAppointmentControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware([
            VerifyClerkToken::class,
            EnsureIsAdmin::class,
        ]);
    }

    public function test_admin_can_list_appointments(): void
    {
        Appointment::create([
            'name' => 'John Doe',
            'phone' => '+38344111222',
            'email' => 'john@example.com',
            'preferred_at' => now()->addDay(),
            'message' => 'I want to see the car.',
            'status' => 'pending',
        ]);

        $response = $this->getJson('/api/admin/appointments');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'John Doe');
    }

    public function test_admin_can_filter_appointments_by_status(): void
    {
        Appointment::create([
            'name' => 'Pending Visitor',
            'phone' => '+38344111111',
            'preferred_at' => now()->addDay(),
            'status' => 'pending',
        ]);

        Appointment::create([
            'name' => 'Confirmed Visitor',
            'phone' => '+38344222222',
            'preferred_at' => now()->addDays(2),
            'status' => 'confirmed',
        ]);

        $response = $this->getJson('/api/admin/appointments?status=confirmed');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Confirmed Visitor');
    }

    public function test_admin_can_filter_appointments_by_listing_id(): void
    {
        $firstListing = $this->createListing('audi-a6');
        $secondListing = $this->createListing('bmw-x5');

        Appointment::create([
            'listing_id' => $firstListing->id,
            'name' => 'Audi Visitor',
            'phone' => '+38344111111',
            'preferred_at' => now()->addDay(),
            'status' => 'pending',
        ]);

        Appointment::create([
            'listing_id' => $secondListing->id,
            'name' => 'BMW Visitor',
            'phone' => '+38344222222',
            'preferred_at' => now()->addDays(2),
            'status' => 'pending',
        ]);

        $response = $this->getJson("/api/admin/appointments?listing_id={$secondListing->id}");

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'BMW Visitor');
    }

    public function test_admin_can_search_appointments(): void
    {
        Appointment::create([
            'name' => 'John Doe',
            'phone' => '+38344111111',
            'email' => 'john@example.com',
            'preferred_at' => now()->addDay(),
            'message' => 'Interested in Audi.',
            'status' => 'pending',
        ]);

        Appointment::create([
            'name' => 'Jane Smith',
            'phone' => '+38344222222',
            'email' => 'jane@example.com',
            'preferred_at' => now()->addDays(2),
            'message' => 'Interested in BMW.',
            'status' => 'pending',
        ]);

        $response = $this->getJson('/api/admin/appointments?search=BMW');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Jane Smith');
    }

    public function test_admin_can_view_single_appointment(): void
    {
        $listing = $this->createListing('audi-a6');

        $appointment = Appointment::create([
            'listing_id' => $listing->id,
            'name' => 'John Doe',
            'phone' => '+38344111111',
            'email' => 'john@example.com',
            'preferred_at' => now()->addDay(),
            'message' => 'Interested in this car.',
            'status' => 'pending',
        ]);

        $response = $this->getJson("/api/admin/appointments/{$appointment->id}");

        $response
            ->assertOk()
            ->assertJsonPath('data.id', $appointment->id)
            ->assertJsonPath('data.name', 'John Doe')
            ->assertJsonPath('data.listing.id', $listing->id);
    }

    public function test_admin_can_create_manual_appointment(): void
    {
        $listing = $this->createListing('audi-a6');

        $response = $this->postJson('/api/admin/appointments', [
            'listing_id' => $listing->id,
            'name' => 'Ardian Krasniqi',
            'phone' => '+38344111222',
            'email' => 'ardian@example.com',
            'preferred_at' => now()->addDay()->toDateTimeString(),
            'message' => 'Customer wants to visit the showroom.',
            'status' => 'confirmed',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.listing_id', $listing->id)
            ->assertJsonPath('data.name', 'Ardian Krasniqi')
            ->assertJsonPath('data.status', 'confirmed');

        $this->assertDatabaseHas('appointments', [
            'listing_id' => $listing->id,
            'name' => 'Ardian Krasniqi',
            'phone' => '+38344111222',
            'status' => 'confirmed',
        ]);
    }

    public function test_manual_appointment_defaults_status_to_pending(): void
    {
        $response = $this->postJson('/api/admin/appointments', [
            'name' => 'Pending Customer',
            'phone' => '+38344111222',
            'preferred_at' => now()->addDay()->toDateTimeString(),
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.name', 'Pending Customer')
            ->assertJsonPath('data.status', 'pending');

        $this->assertDatabaseHas('appointments', [
            'name' => 'Pending Customer',
            'status' => 'pending',
        ]);
    }

    public function test_admin_cannot_create_appointment_with_invalid_status(): void
    {
        $response = $this->postJson('/api/admin/appointments', [
            'name' => 'Invalid Status Customer',
            'phone' => '+38344111222',
            'preferred_at' => now()->addDay()->toDateTimeString(),
            'status' => 'invalid',
        ]);

        $response->assertUnprocessable();
    }

    public function test_admin_cannot_create_appointment_in_the_past(): void
    {
        $response = $this->postJson('/api/admin/appointments', [
            'name' => 'Past Appointment Customer',
            'phone' => '+38344111222',
            'preferred_at' => now()->subDay()->toDateTimeString(),
            'status' => 'pending',
        ]);

        $response->assertUnprocessable();
    }

    public function test_admin_can_update_appointment_status(): void
    {
        $appointment = Appointment::create([
            'name' => 'John Doe',
            'phone' => '+38344111222',
            'preferred_at' => now()->addDay(),
            'status' => 'pending',
        ]);

        $response = $this->patchJson("/api/admin/appointments/{$appointment->id}", [
            'status' => 'confirmed',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.status', 'confirmed');

        $this->assertDatabaseHas('appointments', [
            'id' => $appointment->id,
            'status' => 'confirmed',
        ]);
    }

    public function test_admin_cannot_update_appointment_to_invalid_status(): void
    {
        $appointment = Appointment::create([
            'name' => 'John Doe',
            'phone' => '+38344111222',
            'preferred_at' => now()->addDay(),
            'status' => 'pending',
        ]);

        $response = $this->patchJson("/api/admin/appointments/{$appointment->id}", [
            'status' => 'invalid',
        ]);

        $response->assertUnprocessable();
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
