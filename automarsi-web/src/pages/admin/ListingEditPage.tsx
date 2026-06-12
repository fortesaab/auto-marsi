import { ArrowLeft, Images } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'

type ListingEditPageProps = {
  listingId: string
  onNavigate: (path: string) => void
}

function ListingEditPage({ listingId, onNavigate }: ListingEditPageProps) {
  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title={`Edit listing #${listingId}`}
        description="Update vehicle details, pricing, publication status, and features."
        action={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate(`/admin/listings`)}
            >
              <ArrowLeft />
              Back
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onNavigate(`/admin/listings/${listingId}/images`)}
            >
              <Images />
              Images
            </Button>
          </>
        }
      />

      <DataTableShell
        title="Edit form"
        description="The edit route is ready for the real listing form."
      >
        <EmptyState
          title="Edit form is the next implementation step"
          description="Next we will reuse the create form, prefill the listing data, and submit updates to the Laravel admin listing API."
        />
      </DataTableShell>
    </section>
  )
}

export default ListingEditPage
