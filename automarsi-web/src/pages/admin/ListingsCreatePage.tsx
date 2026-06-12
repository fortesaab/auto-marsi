import { ArrowLeft } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'

type ListingsCreatePageProps = {
  onNavigate: (path: string) => void
}

function ListingsCreatePage({ onNavigate }: ListingsCreatePageProps) {
  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title="Add listing"
        description="Create a new vehicle listing for the dealership inventory."
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

      <DataTableShell
        title="Listing form"
        description="The create form will use the admin makes, models, features, and listing endpoints."
      >
        <EmptyState
          title="Create form is the next implementation step"
          description="This route is ready. Next we will add shadcn inputs, selects, validation, and submit to the Laravel admin listing API."
        />
      </DataTableShell>
    </section>
  )
}

export default ListingsCreatePage
