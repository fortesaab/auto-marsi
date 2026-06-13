import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function CatalogFeaturesPage() {
  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Catalog"
        title="Features"
        description="Manage reusable vehicle features for listings."
        action={
          <Button type="button">
            <Plus />
            Add feature
          </Button>
        }
      />

      <DataTableShell
        title="Vehicle features"
        description="Features like leather seats, navigation, camera, parking sensors, and more."
      >
        <EmptyState
          title="Features manager is ready"
          description="Next we will connect this page to the admin vehicle features API."
        />
      </DataTableShell>
    </section>
  )
}

export default CatalogFeaturesPage