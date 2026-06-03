<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCarModelControllerTest extends TestCase
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

    public function test_admin_can_filter_car_models_by_make(): void
    {
        $audi = Make::create(['name' => 'Audi', 'slug' => 'audi']);
        $bmw = Make::create(['name' => 'BMW', 'slug' => 'bmw']);

        CarModel::create(['make_id' => $audi->id, 'name' => 'A6', 'slug' => 'a6']);
        CarModel::create(['make_id' => $bmw->id, 'name' => 'X5', 'slug' => 'x5']);

        $response = $this->getJson("/api/admin/car-models?make_id={$audi->id}");

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'A6');
    }

    public function test_admin_can_create_car_model(): void
    {
        $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);

        $response = $this->postJson('/api/admin/car-models', [
            'make_id' => $make->id,
            'name' => 'A6',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.name', 'A6')
            ->assertJsonPath('data.slug', 'a6');

        $this->assertDatabaseHas('car_models', [
            'make_id' => $make->id,
            'name' => 'A6',
            'slug' => 'a6',
        ]);
    }

    public function test_admin_can_update_car_model(): void
    {
        $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);
        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'A6',
            'slug' => 'a6',
        ]);

        $response = $this->patchJson("/api/admin/car-models/{$carModel->id}", [
            'name' => 'A7',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.name', 'A7')
            ->assertJsonPath('data.slug', 'a7');
    }

    public function test_admin_cannot_delete_car_model_that_has_listings(): void
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

        $response = $this->deleteJson("/api/admin/car-models/{$carModel->id}");

        $response->assertUnprocessable();
        $this->assertDatabaseHas('car_models', ['id' => $carModel->id]);
    }
}
