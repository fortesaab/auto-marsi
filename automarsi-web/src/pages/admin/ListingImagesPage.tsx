import { ArrowLeft, Upload } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'

type ListingImagesPageProps = {
  listingId: string
  onNavigate: (path: string) => void
}

function ListingImagesPage({ listingId, onNavigate }: ListingImagesPageProps) {
  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Media"
        title={`Images for listing #${listingId}`}
        description="Manage gallery order, alt text, primary image, and uploads."
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
            <Button type="button">
              <Upload />
              Upload
            </Button>
          </>
        }
      />

      <DataTableShell
        title="Listing images"
        description="This route is ready for the upload and image management UI."
      >
        <EmptyState
          title="Image manager is the next implementation step"
          description="Next we will connect this page to the listing image endpoints, then support upload, primary image selection, sorting, and deletion."
        />
      </DataTableShell>
    </section>
  )
}

export default ListingImagesPage
