import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EditMakeForm from './EditMakeForm'
import MakesList from './MakesList'
import type { useMakeModelCatalog } from '../hooks/useMakeModelCatalog'

type MakesPanelProps = {
  catalog: ReturnType<typeof useMakeModelCatalog>
}

function MakesPanel({ catalog }: MakesPanelProps) {
  const hasMakes = catalog.makes.length > 0

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Makes</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 p-3">
        {catalog.editingMake ? (
          <EditMakeForm
            make={catalog.editingMake}
            isSubmitting={catalog.updateMakeMutation.isPending}
            errorMessage={
              catalog.updateMakeMutation.error instanceof Error
                ? catalog.updateMakeMutation.error.message
                : null
            }
            onCancel={() => catalog.setEditingMake(null)}
            onSubmit={async (payload) => {
              if (!catalog.editingMake) {
                return
              }

              await catalog.updateMakeMutation.mutateAsync({
                makeId: catalog.editingMake.id,
                name: payload.name,
                logo_url: payload.logo_url,
              })
            }}
          />
        ) : null}

        {catalog.makesQuery.isLoading ? (
          <LoadingState label="Loading makes" />
        ) : null}

        {!catalog.makesQuery.isLoading && catalog.makesErrorMessage ? (
          <EmptyState
            title="Could not load makes"
            description={catalog.makesErrorMessage}
          />
        ) : null}

        {!catalog.makesQuery.isLoading &&
        !catalog.makesErrorMessage &&
        !hasMakes ? (
          <EmptyState
            title="No makes found"
            description="Add BMW, Audi, Mercedes-Benz, Volkswagen, Toyota, and the other brands you sell."
          />
        ) : null}

        {!catalog.makesQuery.isLoading && hasMakes ? (
          <MakesList
            makes={catalog.makes}
            selectedMakeId={catalog.selectedMakeId}
            isDeletingMakeId={catalog.deletingMakeId}
            modelCounts={Object.fromEntries(
              catalog.makes.map((make) => [
                make.id,
                make.id === catalog.selectedMakeId
                  ? catalog.models.length
                  : make.models_count ?? 0,
              ])
            )}
            onSelectMake={catalog.selectMake}
            onEditMake={(make) => {
              catalog.setEditingMake(make)
              catalog.setIsCreateMakeOpen(false)
            }}
            onDeleteMake={(make) => {
              const shouldDelete = window.confirm(
                `Delete ${make.name}? This can only work if the make has no models or listings.`
              )

              if (!shouldDelete) {
                return
              }

              void catalog.deleteMakeMutation.mutateAsync(make)
            }}
          />
        ) : null}
      </CardContent>
    </Card>
  )
}

export default MakesPanel
