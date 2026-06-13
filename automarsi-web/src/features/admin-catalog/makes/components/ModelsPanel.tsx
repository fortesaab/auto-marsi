import { Download, Plus } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import { Button } from '@/components/ui/button'
import CreateModelForm from './CreateModelForm'
import EditModelForm from './EditModelForm'
import ImportModelsPanel from './ImportModelsPanel'
import ModelsTable from './ModelsTable'
import type { useMakeModelCatalog } from '../hooks/useMakeModelCatalog'

type ModelsPanelProps = {
  catalog: ReturnType<typeof useMakeModelCatalog>
}

function ModelsPanel({ catalog }: ModelsPanelProps) {
  const hasModels = catalog.models.length > 0

  return (
    <DataTableShell
      title={catalog.selectedMake ? catalog.selectedMake.name : 'Models'}
      description={
        catalog.selectedMake
          ? `Manage models under ${catalog.selectedMake.name}.`
          : 'Select a make to manage its models.'
      }
      action={
        catalog.selectedMake ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                catalog.setIsImportModelsOpen((isOpen) => !isOpen)
                catalog.setIsCreateModelOpen(false)
              }}
            >
              <Download />
              {catalog.isImportModelsOpen ? 'Close import' : 'Import models'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                catalog.setIsCreateModelOpen((isOpen) => !isOpen)
                catalog.setIsImportModelsOpen(false)
              }}
            >
              <Plus />
              {catalog.isCreateModelOpen ? 'Close' : 'Add model'}
            </Button>
          </>
        ) : null
      }
    >
      <div className="grid gap-4 p-4">
        {catalog.editingModel ? (
          <EditModelForm
            model={catalog.editingModel}
            isSubmitting={catalog.updateModelMutation.isPending}
            errorMessage={
              catalog.updateModelMutation.error instanceof Error
                ? catalog.updateModelMutation.error.message
                : null
            }
            onCancel={() => catalog.setEditingModel(null)}
            onSubmit={async (payload) => {
              if (!catalog.editingModel) {
                return
              }

              await catalog.updateModelMutation.mutateAsync({
                modelId: catalog.editingModel.id,
                name: payload.name,
              })
            }}
          />
        ) : null}

        {catalog.isImportModelsOpen && catalog.selectedMake ? (
          <ImportModelsPanel
            makeName={catalog.selectedMake.name}
            existingModels={catalog.models}
            suggestions={catalog.modelSuggestionsQuery.data ?? []}
            isLoading={catalog.modelSuggestionsQuery.isLoading}
            isImporting={catalog.importModelsMutation.isPending}
            errorMessage={catalog.importErrorMessage}
            onImport={async (modelNames) => {
              await catalog.importModelsMutation.mutateAsync(modelNames)
            }}
          />
        ) : null}

        {catalog.isCreateModelOpen && catalog.selectedMake ? (
          <CreateModelForm
            makeName={catalog.selectedMake.name}
            isSubmitting={catalog.createModelMutation.isPending}
            errorMessage={
              catalog.createModelMutation.error instanceof Error
                ? catalog.createModelMutation.error.message
                : null
            }
            onSubmit={async (payload) => {
              await catalog.createModelMutation.mutateAsync(payload)
            }}
          />
        ) : null}

        {!catalog.selectedMake ? (
          <EmptyState
            title="Select a make"
            description="Choose a brand from the left side to view and create models."
          />
        ) : null}

        {catalog.selectedMake && catalog.modelsQuery.isLoading ? (
          <LoadingState label="Loading models" />
        ) : null}

        {catalog.selectedMake &&
        !catalog.modelsQuery.isLoading &&
        catalog.modelsErrorMessage ? (
          <EmptyState
            title="Could not load models"
            description={catalog.modelsErrorMessage}
          />
        ) : null}

        {catalog.selectedMake &&
        !catalog.modelsQuery.isLoading &&
        !catalog.modelsErrorMessage &&
        !hasModels ? (
          <EmptyState
            title="No models found"
            description={`Add the first model under ${catalog.selectedMake.name}.`}
          />
        ) : null}

        {catalog.selectedMake &&
        !catalog.modelsQuery.isLoading &&
        !catalog.modelsErrorMessage &&
        hasModels ? (
          <ModelsTable
            models={catalog.models}
            isDeletingModelId={catalog.deletingModelId}
            onEditModel={(model) => {
              catalog.setEditingModel(model)
              catalog.setIsCreateModelOpen(false)
              catalog.setIsImportModelsOpen(false)
            }}
            onDeleteModel={(model) => {
              const shouldDelete = window.confirm(
                `Delete ${model.name}? This cannot be undone.`
              )

              if (!shouldDelete) {
                return
              }

              void catalog.deleteModelMutation.mutateAsync(model)
            }}
          />
        ) : null}
      </div>
    </DataTableShell>
  )
}

export default ModelsPanel