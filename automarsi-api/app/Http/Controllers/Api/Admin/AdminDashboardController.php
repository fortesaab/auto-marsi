<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\InquiryResource;
use App\Models\Appointment;
use App\Models\Inquiry;
use App\Models\Listing;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $listingCounts = Listing::query()
            ->selectRaw('status, count(*) as aggregate')
            ->groupBy('status')
            ->pluck('aggregate', 'status');

        $recentInquiries = Inquiry::query()
            ->with(['listing.make', 'listing.carModel'])
            ->withExists('appointments')
            ->latest()
            ->limit(5)
            ->get();

        $upcomingAppointments = Appointment::query()
            ->with(['listing.make', 'listing.carModel'])
            ->whereIn('status', ['pending', 'confirmed'])
            ->where('preferred_at', '>=', now())
            ->orderBy('preferred_at')
            ->limit(5)
            ->get();

        return response()->json([
            'data' => [
                'listings' => [
                    'total' => (int) $listingCounts->sum(),
                    'active' => (int) ($listingCounts['active'] ?? 0),
                    'draft' => (int) ($listingCounts['draft'] ?? 0),
                    'sold' => (int) ($listingCounts['sold'] ?? 0),
                    'archived' => (int) ($listingCounts['archived'] ?? 0),
                ],
                'new_inquiries' => Inquiry::query()
                    ->where('status', 'new')
                    ->count(),
                'open_appointments' => Appointment::query()
                    ->whereIn('status', ['pending', 'confirmed'])
                    ->count(),
                'recent_inquiries' => InquiryResource::collection(
                    $recentInquiries
                )->resolve(request()),
                'upcoming_appointments' => AppointmentResource::collection(
                    $upcomingAppointments
                )->resolve(request()),
            ],
        ]);
    }
}
