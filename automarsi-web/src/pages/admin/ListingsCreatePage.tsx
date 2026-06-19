import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingCreatePanel from '@/features/admin-listings/components/ListingCreatePanel'
import ListingWorkflowSteps from '@/features/admin-listings/components/ListingWorkflowSteps'

type ListingsCreatePageProps = {
  onNavigate: (path: string) => void
}

function ListingsCreatePage({
  onNavigate,
}: ListingsCreatePageProps) {
  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title="Add listing"
        description="Enter the vehicle details, then add photos and review it."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => onNavigate('/admin/listings')}
          >
            <ArrowLeft />
            Back to listings
          </Button>
        }
      />

      <div className="rounded-lg border bg-card p-4">
        <ListingWorkflowSteps currentStep="details" />
      </div>

      <ListingCreatePanel
        onCancel={() => onNavigate('/admin/listings')}
        onCreated={(listing) =>
          onNavigate(`/admin/listings/${listing.id}/images`)
        }
      />
    </section>
  )
}

export default ListingsCreatePage