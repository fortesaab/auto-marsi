import { Plus, RefreshCw } from 'lucide-react'
import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'
import LoadingState from '../../components/admin/LoadingState'
import { Button } from '@/components/ui/button'
import ListingsTable from '@/features/admin-listings/components/ListingsTable'
import { useAdminListings } from '@/features/admin-listings/hooks/useAdminListings'

type ListingsPageProps = {
  onNavigate: (path: string) => void
}

function ListingsPage({ onNavigate }: ListingsPageProps) {
  const { listings, listingsQuery, errorMessage } = useAdminListings()

  const hasListings = listings.length > 0

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Inventory
          </p>
          <h2 className="text-2xl font-semibold">Listings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage vehicle inventory, photos, status, and listing details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => void listingsQuery.refetch()}
            disabled={listingsQuery.isFetching}
          >
            <RefreshCw />
            Refresh
          </Button>

          <Button type="button" onClick={() => onNavigate('/admin/listings/new')}>
            <Plus />
            Add listing
          </Button>
        </div>
      </div>

      <DataTableShell
        title="Car listings"
        description="A compact overview of the vehicles currently managed by the dealership."
      >
        {listingsQuery.isLoading ? (
          <LoadingState label="Loading listings" />
        ) : null}

        {!listingsQuery.isLoading && errorMessage ? (
          <EmptyState
            title="Could not load listings"
            description={errorMessage}
          />
        ) : null}

        {!listingsQuery.isLoading && !errorMessage && !hasListings ? (
          <EmptyState
            title="No listings found"
            description="Create the first listing from the admin panel or adjust your filters."
          />
        ) : null}

        {!listingsQuery.isLoading && !errorMessage && hasListings ? (
          <ListingsTable listings={listings} onNavigate={onNavigate} />
        ) : null}
      </DataTableShell>
    </section>
  )
}

export default ListingsPage
