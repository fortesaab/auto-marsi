import { Plus } from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import CreateMakeForm from '@/features/admin-catalog/makes/components/CreateMakeForm'
import MakesPanel from '@/features/admin-catalog/makes/components/MakesPanel'
import ModelsPanel from '@/features/admin-catalog/makes/components/ModelsPanel'
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

      {catalog.isCreateMakeOpen ? (
        <CreateMakeForm
          isSubmitting={catalog.createMakeMutation.isPending}
          errorMessage={
            catalog.createMakeMutation.error instanceof Error
              ? catalog.createMakeMutation.error.message
              : null
          }
          onSubmit={async (payload) => {
            await catalog.createMakeMutation.mutateAsync(payload)
          }}
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <MakesPanel catalog={catalog} />
        <ModelsPanel catalog={catalog} />
      </div>
    </section>
  )
}

export default CatalogMakesPage