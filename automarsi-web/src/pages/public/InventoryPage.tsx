import { useState } from 'react'
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'
import PublicListingFilters from '@/features/public-listings/components/PublicListingFilters'
import PublicListingGrid from '@/features/public-listings/components/PublicListingGrid'
import PublicListingPagination from '@/features/public-listings/components/PublicListingPagination'
import { usePublicListings } from '@/features/public-listings/hooks/usePublicListings'
import type { PublicListingFilters as PublicListingFiltersType } from '@/features/public-listings/types'

const initialFilters: PublicListingFiltersType = {
  page: 1,
  search: '',
  year: '',
  min_price: '',
  max_price: '',
  fuel_type: '',
  transmission: '',
  body_type: '',
}

function InventoryPage() {
  const [filters, setFilters] =
    useState<PublicListingFiltersType>(initialFilters)

  const { listings, meta, listingsQuery, errorMessage } = usePublicListings({
    filters,
  })

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Inventory"
          title="Browse selected vehicles."
          description="Explore active vehicles published from the AutoMarsi admin dashboard."
        />

        <div className="text-sm text-muted-foreground">
          {meta ? `${meta.total} vehicles found` : 'Loading vehicles'}
        </div>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <PublicListingFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="grid min-w-0 gap-5">
          {listingsQuery.isLoading ? (
            <div className="rounded-lg border bg-card p-8 text-sm text-muted-foreground">
              Loading vehicles...
            </div>
          ) : null}

          {errorMessage ? (
            <div className="grid gap-3 rounded-lg border bg-card p-8">
              <p className="font-medium">Could not load inventory.</p>
              <p className="text-sm text-muted-foreground">{errorMessage}</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => listingsQuery.refetch()}
              >
                Try again
              </Button>
            </div>
          ) : null}

          {!listingsQuery.isLoading && !errorMessage && listings.length === 0 ? (
            <div className="rounded-lg border bg-card p-8 text-sm text-muted-foreground">
              No vehicles matched your filters.
            </div>
          ) : null}

          {!listingsQuery.isLoading && !errorMessage && listings.length > 0 ? (
            <>
              <PublicListingGrid listings={listings} />

              {meta ? (
                <PublicListingPagination
                  meta={meta}
                  onPageChange={(page) =>
                    setFilters((currentFilters) => ({
                      ...currentFilters,
                      page,
                    }))
                  }
                />
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default InventoryPage
