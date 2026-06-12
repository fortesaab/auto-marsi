import { ArrowLeft, Pencil } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'

type ListingViewPageProps = {
  listingId: string
  onNavigate: (path: string) => void
}

function ListingViewPage({ listingId, onNavigate }: ListingViewPageProps) {
  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title={`Listing #${listingId}`}
        description="Review listing details before editing or managing images."
        action={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/admin/listings')}
            >
              <ArrowLeft />
              Back
            </Button>
            <Button
              type="button"
              onClick={() => onNavigate(`/admin/listings/${listingId}/edit`)}
            >
              <Pencil />
              Edit
            </Button>
          </>
        }
      />

      <DataTableShell
        title="Listing details"
        description="The detail view route is ready for the next data-fetching pass."
      >
        <EmptyState
          title="Listing detail page is ready"
          description="Next we will fetch this single listing from the API and show a clean overview of specs, price, status, features, and images."
        />
      </DataTableShell>
    </section>
  )
}

export default ListingViewPage
