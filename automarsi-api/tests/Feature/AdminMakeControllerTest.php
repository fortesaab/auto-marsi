<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminMakeControllerTest extends TestCase
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

    public function test_admin_can_list_makes(): void
    {
        Make::create(['name' => 'BMW', 'slug' => 'bmw']);
        Make::create(['name' => 'Audi', 'slug' => 'audi']);

        $response = $this->getJson('/api/admin/makes');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Audi')
            ->assertJsonPath('data.1.name', 'BMW');
    }

    public function test_admin_can_create_make(): void
    {
        $response = $this->postJson('/api/admin/makes', [
            'name' => 'Mercedes Benz',
            'logo_url' => 'https://example.com/mercedes.png',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.name', 'Mercedes Benz')
            ->assertJsonPath('data.slug', 'mercedes-benz');

        $this->assertDatabaseHas('makes', [
            'name' => 'Mercedes Benz',
            'slug' => 'mercedes-benz',
        ]);
    }

    public function test_admin_can_update_make_and_regenerate_slug(): void
    {
        $make = Make::create(['name' => 'Mercedes', 'slug' => 'mercedes']);

        $response = $this->patchJson("/api/admin/makes/{$make->id}", [
            'name' => 'Mercedes Benz',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.name', 'Mercedes Benz')
            ->assertJsonPath('data.slug', 'mercedes-benz');
    }

    public function test_admin_cannot_delete_make_that_has_listings(): void
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
            'title' => 'Audi A6',
            'slug' => 'audi-a6',
            'year' => 2021,
            'price' => 25000,
            'kilometers' => 90000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
        ]);

        $response = $this->deleteJson("/api/admin/makes/{$make->id}");

        $response->assertUnprocessable();
        $this->assertDatabaseHas('makes', ['id' => $make->id]);
    }
}
