import { useAuth } from '@clerk/clerk-react'
import { Plus, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'
import LoadingState from '../../components/admin/LoadingState'
import { Button } from '@/components/ui/button'
import { getAdminListings } from '@/features/admin-listings/api/getAdminListings'
import ListingCreatePanel from '@/features/admin-listings/components/ListingCreatePanel'
import ListingsTable from '@/features/admin-listings/components/ListingsTable'
import type { AdminListing } from '@/features/admin-listings/types'

type ListingsPageProps = {
  onNavigate: (path: string) => void
}

function ListingsPage({ onNavigate }: ListingsPageProps) {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [listings, setListings] = useState<AdminListing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function loadListings() {
    if (!isLoaded || !isSignedIn) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const token = await getToken()

      if (!token) {
        throw new Error('Missing authentication token.')
      }

      setAuthToken(token)

      const response = await getAdminListings({ token })

      setListings(response.data)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to load listings.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleListingCreated() {
    setIsCreatePanelOpen(false)
    await loadListings()
  }

  async function openCreatePanel() {
    setErrorMessage(null)

    const token = await getToken()

    if (!token) {
      setErrorMessage('Please sign in again before creating a listing.')
      return
    }

    setAuthToken(token)
    setIsCreatePanelOpen(true)
  }

  useEffect(() => {
    void loadListings()
  }, [isLoaded, isSignedIn])

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
            onClick={loadListings}
            disabled={isLoading}
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
        {isLoading ? (
          <LoadingState label="Loading listings" />
        ) : null}

          {!isLoading && errorMessage ? (
            <EmptyState
              title="Could not load listings"
              description={errorMessage}
            />
          ) : null}

          {!isLoading && !errorMessage && !hasListings ? (
            <EmptyState
              title="No listings found"
              description="Create the first listing from the admin panel or adjust your filters."
            />
          ) : null}

        {!isLoading && !errorMessage && hasListings ? (
          <ListingsTable listings={listings} onNavigate={onNavigate} />
        ) : null}
      </DataTableShell>
    </section>
  )
}

export default ListingsPage
