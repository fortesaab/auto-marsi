import { Plus, RefreshCw } from 'lucide-react'
import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'
import LoadingState from '../../components/admin/LoadingState'
import PageHeader from '../../components/admin/PageHeader'
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
      <PageHeader
        eyebrow="Inventory"
        title="Listings"
        description="Manage vehicles, photos, status, and listing details."
        action={
          <>
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
          </>
        }
      />

      <DataTableShell
        title="Car listings"
        description={`${listings.length} vehicles on this page`}
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
