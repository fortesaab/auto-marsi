import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function CatalogModelsPage() {
  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Catalog"
        title="Models"
        description="Manage vehicle models and connect them to their make."
        action={
          <Button type="button">
            <Plus />
            Add model
          </Button>
        }
      />

      <DataTableShell
        title="Vehicle models"
        description="Models like X5, Golf, C-Class, A4, Corolla, and more."
      >
        <EmptyState
          title="Models manager is ready"
          description="Next we will connect this page to the admin car models API."
        />
      </DataTableShell>
    </section>
  )
}

export default CatalogModelsPage