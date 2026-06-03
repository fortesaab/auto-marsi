<?php

namespace Tests\Feature;

use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InquiryControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_submit_inquiry_for_active_listing(): void
    {
        $listing = $this->createListing(status: 'active');

        $response = $this->postJson('/api/inquiries', [
            'listing_id' => $listing->id,
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+38344111222',
            'message' => 'Is this car still available?',
            'source' => 'website',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Inquiry submitted successfully.');

        $this->assertDatabaseHas('inquiries', [
            'listing_id' => $listing->id,
            'name' => 'John Doe',
            'status' => 'new',
        ]);
    }

    public function test_customer_cannot_submit_inquiry_for_inactive_listing(): void
    {
        $listing = $this->createListing(status: 'draft');

        $response = $this->postJson('/api/inquiries', [
            'listing_id' => $listing->id,
            'name' => 'John Doe',
            'phone' => '+38344111222',
        ]);

        $response->assertUnprocessable();
        $this->assertDatabaseCount('inquiries', 0);
    }

    private function createListing(string $status): Listing
    {
        $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);
        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'A6',
            'slug' => 'a6',
        ]);

        return Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => "Audi A6 {$status}",
            'slug' => "audi-a6-{$status}",
            'year' => 2021,
            'price' => 25000,
            'kilometers' => 90000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => $status,
        ]);
    }
}
