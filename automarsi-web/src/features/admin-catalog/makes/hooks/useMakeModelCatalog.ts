import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { createAdminMake } from '../api/createAdminMake'
import { createAdminModel } from '../api/createAdminModel'
import { deleteAdminMake } from '../api/deleteAdminMake'
import { deleteAdminModel } from '../api/deleteAdminModel'
import { getAdminMakes } from '../api/getAdminMakes'
import { getAdminModels } from '../api/getAdminModels'
import { getCatalogModelSuggestions } from '../api/getCatalogModelSuggestions'
import { importCatalogModels } from '../api/importCatalogModels'
import { updateAdminMake } from '../api/updateAdminMake'
import { updateAdminModel } from '../api/updateAdminModel'
import type { AdminMake, AdminModel } from '../types'

export function useMakeModelCatalog() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const queryClient = useQueryClient()

  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null)
  const [isCreateMakeOpen, setIsCreateMakeOpen] = useState(false)
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false)
  const [isImportModelsOpen, setIsImportModelsOpen] = useState(false)
  const [editingMake, setEditingMake] = useState<AdminMake | null>(null)
  const [editingModel, setEditingModel] = useState<AdminModel | null>(null)
  const [deletingMakeId, setDeletingMakeId] = useState<number | null>(null)
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

  const updateMakeMutation = useMutation({
    mutationFn: async (payload: {
      makeId: number
      name: string
      logo_url: string | null
    }) => {
      const token = await getAuthToken()

      return updateAdminMake({
        token,
        makeId: payload.makeId,
        payload: {
          name: payload.name,
          logo_url: payload.logo_url,
        },
      })
    },
    onSuccess: async () => {
      setEditingMake(null)

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'catalog', 'makes'],
      })
    },
  })

  const deleteMakeMutation = useMutation({
    mutationFn: async (make: AdminMake) => {
      const token = await getAuthToken()

      setDeletingMakeId(make.id)

      return deleteAdminMake({
        token,
        makeId: make.id,
      })
    },
    onSuccess: async (_, deletedMake) => {
      setEditingMake(null)

      if (selectedMakeId === deletedMake.id) {
        setSelectedMakeId(null)
      }

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'catalog', 'makes'],
      })
    },
    onSettled: () => {
      setDeletingMakeId(null)
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

  return {
    makes,
    models,
    selectedMake,
    selectedMakeId,
    isCreateMakeOpen,
    isCreateModelOpen,
    isImportModelsOpen,
    editingMake,
    editingModel,
    deletingMakeId,
    deletingModelId,

    makesQuery,
    modelsQuery,
    modelSuggestionsQuery,
    createMakeMutation,
    createModelMutation,
    updateMakeMutation,
    deleteMakeMutation,
    updateModelMutation,
    deleteModelMutation,
    importModelsMutation,

    makesErrorMessage,
    modelsErrorMessage,
    importErrorMessage,

    setIsCreateMakeOpen,
    setIsCreateModelOpen,
    setIsImportModelsOpen,
    setEditingMake,
    setEditingModel,

    selectMake(makeId: number) {
      setSelectedMakeId(makeId)
      setEditingMake(null)
      setIsCreateModelOpen(false)
      setIsImportModelsOpen(false)
      setEditingModel(null)
    },
  }
}
