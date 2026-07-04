import { Plus } from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import MakeModelCards from '@/features/admin-catalog/makes/components/MakeModelCards'
import { useMakeModelCatalog } from '@/features/admin-catalog/makes/hooks/useMakeModelCatalog'

function CatalogMakesPage() {
  const catalog = useMakeModelCatalog()

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Catalog"
        title="Make & Model Catalog"
        description="Manage the vehicle brands and model names used when creating listings."
        action={
          <Button
            type="button"
            onClick={() =>
              catalog.setIsCreateMakeOpen((isOpen) => !isOpen)
            }
          >
            <Plus />
            {catalog.isCreateMakeOpen ? 'Close' : 'Add make'}
          </Button>
        }
      />

      <MakeModelCards catalog={catalog} />
    </section>
  )
}

export default CatalogMakesPage
