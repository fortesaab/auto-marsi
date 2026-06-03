<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use App\Models\VehicleFeature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminVehicleFeatureControllerTest extends TestCase
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

    public function test_admin_can_list_vehicle_features(): void
    {
        VehicleFeature::create(['name' => 'Navigation', 'slug' => 'navigation']);
        VehicleFeature::create(['name' => 'Bluetooth', 'slug' => 'bluetooth']);

        $response = $this->getJson('/api/admin/vehicle-features');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Bluetooth')
            ->assertJsonPath('data.1.name', 'Navigation');
    }

    public function test_admin_can_create_vehicle_feature(): void
    {
        $response = $this->postJson('/api/admin/vehicle-features', [
            'name' => 'Parking Sensors',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.name', 'Parking Sensors')
            ->assertJsonPath('data.slug', 'parking-sensors');

        $this->assertDatabaseHas('vehicle_features', [
            'name' => 'Parking Sensors',
            'slug' => 'parking-sensors',
        ]);
    }

    public function test_admin_can_update_vehicle_feature(): void
    {
        $feature = VehicleFeature::create([
            'name' => 'Rear Camera',
            'slug' => 'rear-camera',
        ]);

        $response = $this->patchJson("/api/admin/vehicle-features/{$feature->id}", [
            'name' => 'Backup Camera',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.name', 'Backup Camera')
            ->assertJsonPath('data.slug', 'backup-camera');
    }

    public function test_admin_cannot_delete_feature_that_is_used_by_listings(): void
    {
        $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);
        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'A6',
            'slug' => 'a6',
        ]);
        $feature = VehicleFeature::create([
            'name' => 'Navigation',
            'slug' => 'navigation',
        ]);
        $listing = Listing::create([
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

        $listing->features()->attach($feature->id);

        $response = $this->deleteJson("/api/admin/vehicle-features/{$feature->id}");

        $response->assertUnprocessable();
        $this->assertDatabaseHas('vehicle_features', ['id' => $feature->id]);
    }
}
