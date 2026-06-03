<?php

namespace Tests\Feature;

use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_listing_index_only_returns_active_listings(): void
    {
        $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);
        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'A6',
            'slug' => 'a6',
        ]);

        Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => 'Published Audi A6',
            'slug' => 'published-audi-a6',
            'year' => 2021,
            'price' => 25000,
            'kilometers' => 90000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'active',
            'published_at' => now(),
        ]);

        Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => 'Draft Audi A6',
            'slug' => 'draft-audi-a6',
            'year' => 2022,
            'price' => 30000,
            'kilometers' => 50000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'draft',
        ]);

        $response = $this->getJson('/api/listings');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Published Audi A6');
    }

    public function test_public_listing_show_hides_non_active_listing(): void
    {
        $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);
        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'A6',
            'slug' => 'a6',
        ]);
        $listing = Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => 'Draft Audi A6',
            'slug' => 'draft-audi-a6',
            'year' => 2022,
            'price' => 30000,
            'kilometers' => 50000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'draft',
        ]);

        $this->getJson("/api/listings/{$listing->id}")
            ->assertNotFound();
    }
}
