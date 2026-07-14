<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\Appointment;
use App\Models\CarModel;
use App\Models\Inquiry;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDashboardControllerTest extends TestCase
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

    public function test_admin_can_view_dashboard_summary(): void
    {
        $activeListing = $this->createListing('active-listing', 'active');
        $this->createListing('draft-listing', 'draft');
        $this->createListing('sold-listing', 'sold', [
            'price' => 23000,
            'purchase_price' => 21000,
            'sale_price' => 23000,
            'sales_expenses' => 500,
            'sold_at' => now(),
        ]);

        $inquiry = Inquiry::create([
            'listing_id' => $activeListing->id,
            'name' => 'Dashboard Lead',
            'phone' => '+38344111222',
            'status' => 'new',
        ]);

        Appointment::create([
            'listing_id' => $activeListing->id,
            'name' => 'Upcoming Visitor',
            'phone' => '+38344222333',
            'preferred_at' => now()->addDay(),
            'status' => 'confirmed',
        ]);

        Appointment::create([
            'listing_id' => $activeListing->id,
            'name' => 'Past Visitor',
            'phone' => '+38344333444',
            'preferred_at' => now()->subDay(),
            'status' => 'confirmed',
        ]);

        $response = $this->getJson('/api/admin/dashboard');

        $response
            ->assertOk()
            ->assertJsonPath('data.listings.total', 3)
            ->assertJsonPath('data.listings.active', 1)
            ->assertJsonPath('data.listings.draft', 1)
            ->assertJsonPath('data.listings.sold', 1)
            ->assertJsonPath('data.new_inquiries', 1)
            ->assertJsonPath('data.open_appointments', 2)
            ->assertJsonMissingPath('data.sales')
            ->assertJsonPath('data.recent_inquiries.0.id', $inquiry->id)
            ->assertJsonCount(1, 'data.upcoming_appointments')
            ->assertJsonPath(
                'data.upcoming_appointments.0.name',
                'Upcoming Visitor'
            );
    }

    public function test_financial_report_route_is_not_exposed(): void
    {
        $this->get('/api/admin/reports/sales')->assertNotFound();
    }

    private function createListing(
        string $slug,
        string $status,
        array $overrides = []
    ): Listing
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

        return Listing::create(array_merge([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => "Listing {$slug}",
            'slug' => $slug,
            'year' => 2024,
            'price' => 25000,
            'kilometers' => 30000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => $status,
        ], $overrides));
    }
}
