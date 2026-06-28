import { Plus, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'
import LoadingState from '../../components/admin/LoadingState'
import PageHeader from '../../components/admin/PageHeader'
import PaginationControls from '../../components/admin/PaginationControls'
import { Button } from '@/components/ui/button'
import AdminListingsFilters from '@/features/admin-listings/components/AdminListingsFilters'
import ListingsTable from '@/features/admin-listings/components/ListingsTable'
import { useAdminListings } from '@/features/admin-listings/hooks/useAdminListings'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

type ListingsPageProps = {
  onNavigate: (path: string) => void
}

function ListingsPage({ onNavigate }: ListingsPageProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [condition, setCondition] = useState('')
  const [makeId, setMakeId] = useState('')
  const [carModelId, setCarModelId] = useState('')
  const [isFeatured, setIsFeatured] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebouncedValue(search)

  const {
    listings,
    meta,
    listingsQuery,
    errorMessage,
    deleteListing,
    isDeletingListing,
    updateListingStatus,
    isUpdatingListingStatus,
  } = useAdminListings({
    search: debouncedSearch,
    status,
    condition,
    makeId,
    carModelId,
    isFeatured,
    page,
  })

  const hasListings = listings.length > 0

  function resetPage() {
    setPage(1)
  }

  function clearFilters() {
    setSearch('')
    setStatus('')
    setCondition('')
    setMakeId('')
    setCarModelId('')
    setIsFeatured('')
    resetPage()
  }

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

            <Button
              type="button"
              onClick={() => onNavigate('/admin/listings/new')}
            >
              <Plus />
              Add listing
            </Button>
          </>
        }
      />

      <DataTableShell
        title="Car listings"
        description={`${meta.total} total vehicles`}
      >
        <AdminListingsFilters
          search={search}
          status={status}
          condition={condition}
          makeId={makeId}
          carModelId={carModelId}
          isFeatured={isFeatured}
          onSearchChange={(value) => {
            setSearch(value)
            resetPage()
          }}
          onStatusChange={(value) => {
            setStatus(value)
            resetPage()
          }}
          onConditionChange={(value) => {
            setCondition(value)
            resetPage()
          }}
          onMakeChange={(value) => {
            setMakeId(value)
            setCarModelId('')
            resetPage()
          }}
          onCarModelChange={(value) => {
            setCarModelId(value)
            resetPage()
          }}
          onFeaturedChange={(value) => {
            setIsFeatured(value)
            resetPage()
          }}
          onClearFilters={clearFilters}
        />

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
          <>
            <ListingsTable
              listings={listings}
              isDeletingListing={isDeletingListing}
              isUpdatingListingStatus={isUpdatingListingStatus}
              onNavigate={onNavigate}
              onDeleteListing={deleteListing}
              onUpdateListingStatus={updateListingStatus}
            />
            <PaginationControls
              currentPage={meta.current_page}
              lastPage={meta.last_page}
              total={meta.total}
              onPageChange={setPage}
            />
          </>
        ) : null}
      </DataTableShell>
    </section>
  )
}

export default ListingsPage
