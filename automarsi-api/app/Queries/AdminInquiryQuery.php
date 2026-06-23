<?php

namespace App\Queries;

use App\Models\Inquiry;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AdminInquiryQuery
{
    public function paginate(array $filters): LengthAwarePaginator
    {
        return Inquiry::query()
            ->with(['listing.make', 'listing.carModel'])
            ->withExists('appointments')
            ->when($filters['status'] ?? null, fn ($query, string $status) =>
                $query->where('status', $status)
            )
            ->when($filters['listing_id'] ?? null, fn ($query, int $listingId) =>
                $query->where('listing_id', $listingId)
            )
            ->when($filters['search'] ?? null, function ($query, string $searchTerm) {
                $search = '%' . strtolower($searchTerm) . '%';

                $query->where(function ($query) use ($search) {
                    $query->whereRaw('lower(name) like ?', [$search])
                        ->orWhereRaw('lower(email) like ?', [$search])
                        ->orWhereRaw('lower(phone) like ?', [$search])
                        ->orWhereRaw('lower(message) like ?', [$search]);
                });
            })
            ->latest()
            ->paginate($filters['per_page'] ?? 15);
    }

}
