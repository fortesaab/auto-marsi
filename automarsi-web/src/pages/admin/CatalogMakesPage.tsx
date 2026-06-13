import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Download, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createAdminMake } from '@/features/admin-catalog/makes/api/createAdminMake'
import { createAdminModel } from '@/features/admin-catalog/makes/api/createAdminModel'
import { getAdminMakes } from '@/features/admin-catalog/makes/api/getAdminMakes'
import { getAdminModels } from '@/features/admin-catalog/makes/api/getAdminModels'
import { getCatalogModelSuggestions } from '@/features/admin-catalog/makes/api/getCatalogModelSuggestions'
import { importCatalogModels } from '@/features/admin-catalog/makes/api/importCatalogModels'
import CreateMakeForm from '@/features/admin-catalog/makes/components/CreateMakeForm'
import CreateModelForm from '@/features/admin-catalog/makes/components/CreateModelForm'
import ImportModelsPanel from '@/features/admin-catalog/makes/components/ImportModelsPanel'
import MakesList from '@/features/admin-catalog/makes/components/MakesList'
import ModelsTable from '@/features/admin-catalog/makes/components/ModelsTable'
import { deleteAdminModel } from '@/features/admin-catalog/makes/api/deleteAdminModel'
import { updateAdminModel } from '@/features/admin-catalog/makes/api/updateAdminModel'
import EditModelForm from '@/features/admin-catalog/makes/components/EditModelForm'
import type { AdminModel } from '@/features/admin-catalog/makes/types'

function CatalogMakesPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const queryClient = useQueryClient()

  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null)
  const [isCreateMakeOpen, setIsCreateMakeOpen] = useState(false)
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false)
  const [isImportModelsOpen, setIsImportModelsOpen] = useState(false)
  const [editingModel, setEditingModel] = useState<AdminModel | null>(null)
  const [deletingModelId, setDeletingModelId] = useState<number | null>(null)

  async function getAuthToken() {
    const token = await getToken()

    if (!token) {
      throw new Error('Please sign in again.')
    }

    return token
  }

  const makesQuery = useQuery({
    queryKey: ['admin', 'catalog', 'makes'],
    enabled: isLoaded && isSignedIn,
    queryFn: async () => {
      const token = await getAuthToken()

      return getAdminMakes({ token })
    },
  })

  const makes = makesQuery.data ?? []

  const selectedMake = useMemo(() => {
    return makes.find((make) => make.id === selectedMakeId) ?? null
  }, [makes, selectedMakeId])

  const modelsQuery = useQuery({
    queryKey: ['admin', 'catalog', 'models', selectedMakeId],
    enabled: isLoaded && isSignedIn && selectedMakeId !== null,
    queryFn: async () => {
      if (selectedMakeId === null) {
        return []
      }

      const token = await getAuthToken()

      return getAdminModels({
        token,
        makeId: selectedMakeId,
      })
    },
  })

  const modelSuggestionsQuery = useQuery({
    queryKey: ['admin', 'catalog', 'model-suggestions', selectedMake?.name],
    enabled:
      isLoaded &&
      isSignedIn &&
      isImportModelsOpen &&
      selectedMake !== null,
    queryFn: async () => {
      if (!selectedMake) {
        return []
      }

      const token = await getAuthToken()

      return getCatalogModelSuggestions({
        token,
        make: selectedMake.name,
      })
    },
  })

  const createMakeMutation = useMutation({
    mutationFn: async (payload: { name: string; logo_url: string | null }) => {
      const token = await getAuthToken()

      return createAdminMake({
        token,
        payload,
      })
    },
    onSuccess: async (createdMake) => {
      setIsCreateMakeOpen(false)
      setSelectedMakeId(createdMake.id)

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'catalog', 'makes'],
      })
    },
  })

  const createModelMutation = useMutation({
    mutationFn: async (payload: { name: string }) => {
      if (selectedMakeId === null) {
        throw new Error('Select a make before creating a model.')
      }

      const token = await getAuthToken()

      return createAdminModel({
        token,
        payload: {
          make_id: selectedMakeId,
          name: payload.name,
        },
      })
    },
    onSuccess: async () => {
      setIsCreateModelOpen(false)

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin', 'catalog', 'models', selectedMakeId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin', 'catalog', 'makes'],
        }),
      ])
    },
  })

  const updateModelMutation = useMutation({
    mutationFn: async (payload: { modelId: number; name: string }) => {
      const token = await getAuthToken()

      return updateAdminModel({
        token,
        modelId: payload.modelId,
        payload: {
          name: payload.name,
        },
      })
    },
    onSuccess: async () => {
      setEditingModel(null)

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'catalog', 'models', selectedMakeId],
      })
    },
  })

  const deleteModelMutation = useMutation({
    mutationFn: async (model: AdminModel) => {
      const token = await getAuthToken()

      setDeletingModelId(model.id)

      return deleteAdminModel({
        token,
        modelId: model.id,
      })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin', 'catalog', 'models', selectedMakeId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin', 'catalog', 'makes'],
        }),
      ])
    },
    onSettled: () => {
      setDeletingModelId(null)
    },
  })

  const importModelsMutation = useMutation({
    mutationFn: async (modelNames: string[]) => {
      if (selectedMakeId === null) {
        throw new Error('Select a make before importing models.')
      }

      const token = await getAuthToken()

      return importCatalogModels({
        token,
        payload: {
          make_id: selectedMakeId,
          models: modelNames,
        },
      })
    },
    onSuccess: async () => {
      setIsImportModelsOpen(false)

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin', 'catalog', 'models', selectedMakeId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin', 'catalog', 'makes'],
        }),
      ])
    },
  })

  useEffect(() => {
    if (selectedMakeId !== null || makes.length === 0) {
      return
    }

    setSelectedMakeId(makes[0].id)
  }, [makes, selectedMakeId])

  const models = modelsQuery.data ?? []
  const hasMakes = makes.length > 0
  const hasModels = models.length > 0

  const makesErrorMessage =
    makesQuery.error instanceof Error ? makesQuery.error.message : null

  const modelsErrorMessage =
    modelsQuery.error instanceof Error ? modelsQuery.error.message : null

  const importErrorMessage =
    modelSuggestionsQuery.error instanceof Error
      ? modelSuggestionsQuery.error.message
      : importModelsMutation.error instanceof Error
        ? importModelsMutation.error.message
        : null

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Catalog"
        title="Make & Model Catalog"
        description="Manage the vehicle brands and model names used when creating listings."
        action={
          <Button
            type="button"
            onClick={() => setIsCreateMakeOpen((isOpen) => !isOpen)}
          >
            <Plus />
            {isCreateMakeOpen ? 'Close' : 'Add make'}
          </Button>
        }
      />

      {isCreateMakeOpen ? (
        <CreateMakeForm
          isSubmitting={createMakeMutation.isPending}
          errorMessage={
            createMakeMutation.error instanceof Error
              ? createMakeMutation.error.message
              : null
          }
          onSubmit={async (payload) => {
            await createMakeMutation.mutateAsync(payload)
          }}
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Makes</CardTitle>
          </CardHeader>

          <CardContent className="p-3">
            {makesQuery.isLoading ? (
              <LoadingState label="Loading makes" />
            ) : null}

            {!makesQuery.isLoading && makesErrorMessage ? (
              <EmptyState
                title="Could not load makes"
                description={makesErrorMessage}
              />
            ) : null}

            {!makesQuery.isLoading && !makesErrorMessage && !hasMakes ? (
              <EmptyState
                title="No makes found"
                description="Add BMW, Audi, Mercedes-Benz, Volkswagen, Toyota, and the other brands you sell."
              />
            ) : null}

            {!makesQuery.isLoading && hasMakes ? (
              <MakesList
                makes={makes}
                selectedMakeId={selectedMakeId}
                modelCounts={Object.fromEntries(
                  makes.map((make) => [
                    make.id,
                    make.id === selectedMakeId
                      ? models.length
                      : make.models_count ?? 0,
                  ])
                )}
                onSelectMake={(makeId) => {
                  setSelectedMakeId(makeId)
                  setIsCreateModelOpen(false)
                  setIsImportModelsOpen(false)
                  setEditingModel(null)
                }}
              />
            ) : null}
          </CardContent>
        </Card>

        <DataTableShell
          title={selectedMake ? selectedMake.name : 'Models'}
          description={
            selectedMake
              ? `Manage models under ${selectedMake.name}.`
              : 'Select a make to manage its models.'
          }
          action={
            selectedMake ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsImportModelsOpen((isOpen) => !isOpen)
                    setIsCreateModelOpen(false)
                  }}
                >
                  <Download />
                  {isImportModelsOpen ? 'Close import' : 'Import models'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateModelOpen((isOpen) => !isOpen)
                    setIsImportModelsOpen(false)
                  }}
                >
                  <Plus />
                  {isCreateModelOpen ? 'Close' : 'Add model'}
                </Button>
              </>
            ) : null
          }
        >
          <div className="grid gap-4 p-4">
            {editingModel ? (
              <EditModelForm
                model={editingModel}
                isSubmitting={updateModelMutation.isPending}
                errorMessage={
                  updateModelMutation.error instanceof Error
                    ? updateModelMutation.error.message
                    : null
                }
                onCancel={() => setEditingModel(null)}
                onSubmit={async (payload) => {
                  await updateModelMutation.mutateAsync({
                    modelId: editingModel.id,
                    name: payload.name,
                  })
                }}
              />
            ) : null}
            {isImportModelsOpen && selectedMake ? (
              <ImportModelsPanel
                makeName={selectedMake.name}
                existingModels={models}
                suggestions={modelSuggestionsQuery.data ?? []}
                isLoading={modelSuggestionsQuery.isLoading}
                isImporting={importModelsMutation.isPending}
                errorMessage={importErrorMessage}
                onImport={async (modelNames) => {
                  await importModelsMutation.mutateAsync(modelNames)
                }}
              />
            ) : null}

            {isCreateModelOpen && selectedMake ? (
              <CreateModelForm
                makeName={selectedMake.name}
                isSubmitting={createModelMutation.isPending}
                errorMessage={
                  createModelMutation.error instanceof Error
                    ? createModelMutation.error.message
                    : null
                }
                onSubmit={async (payload) => {
                  await createModelMutation.mutateAsync(payload)
                }}
              />
            ) : null}

            {!selectedMake ? (
              <EmptyState
                title="Select a make"
                description="Choose a brand from the left side to view and create models."
              />
            ) : null}

            {selectedMake && modelsQuery.isLoading ? (
              <LoadingState label="Loading models" />
            ) : null}

            {selectedMake && !modelsQuery.isLoading && modelsErrorMessage ? (
              <EmptyState
                title="Could not load models"
                description={modelsErrorMessage}
              />
            ) : null}

            {selectedMake &&
            !modelsQuery.isLoading &&
            !modelsErrorMessage &&
            !hasModels ? (
              <EmptyState
                title="No models found"
                description={`Add the first model under ${selectedMake.name}.`}
              />
            ) : null}

            {selectedMake &&
            !modelsQuery.isLoading &&
            !modelsErrorMessage &&
            hasModels ? (
              <ModelsTable
                models={models}
                isDeletingModelId={deletingModelId}
                onEditModel={(model) => {
                  setEditingModel(model)
                  setIsCreateModelOpen(false)
                  setIsImportModelsOpen(false)
                }}
                onDeleteModel={(model) => {
                  const shouldDelete = window.confirm(
                    `Delete ${model.name}? This cannot be undone.`
                  )

                  if (!shouldDelete) {
                    return
                  }

                  void deleteModelMutation.mutateAsync(model)
                }}
              />
            ) : null}
          </div>
        </DataTableShell>
      </div>
    </section>
  )
}

export default CatalogMakesPage
