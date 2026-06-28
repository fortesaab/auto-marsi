import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAdminToken } from '@/hooks/useAdminToken'
import { createAdminVehicleFeature } from '../api/createAdminVehicleFeature'
import { deleteAdminVehicleFeature } from '../api/deleteAdminVehicleFeature'
import { getAdminVehicleFeatures } from '../api/getAdminVehicleFeatures'
import { installDefaultVehicleFeatures } from '../api/installDefaultVehicleFeatures'
import { updateAdminVehicleFeature } from '../api/updateAdminVehicleFeature'
import type {
  AdminVehicleFeature,
  CreateAdminVehicleFeaturePayload,
  UpdateAdminVehicleFeaturePayload,
} from '../types'

export function useVehicleFeaturesCatalog() {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()

  const [isCreateFeatureOpen, setIsCreateFeatureOpen] = useState(false)
  const [editingFeature, setEditingFeature] =
    useState<AdminVehicleFeature | null>(null)

  const featuresQuery = useQuery({
    queryKey: ['admin', 'catalog', 'vehicle-features'],
    enabled: isAuthReady,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminVehicleFeatures({ token })
    },
  })

  const createFeatureMutation = useMutation({
    mutationFn: async (payload: CreateAdminVehicleFeaturePayload) => {
      const token = await getAdminToken()

      return createAdminVehicleFeature({
        token,
        payload,
      })
    },
    onSuccess: async () => {
      setIsCreateFeatureOpen(false)

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'catalog', 'vehicle-features'],
      })
    },
  })

  const updateFeatureMutation = useMutation({
    mutationFn: async ({
      featureId,
      payload,
    }: {
      featureId: number
      payload: UpdateAdminVehicleFeaturePayload
    }) => {
      const token = await getAdminToken()

      return updateAdminVehicleFeature({
        token,
        featureId,
        payload,
      })
    },
    onSuccess: async () => {
      setEditingFeature(null)

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'catalog', 'vehicle-features'],
      })
    },
  })

  const deleteFeatureMutation = useMutation({
    mutationFn: async (featureId: number) => {
      const token = await getAdminToken()

      return deleteAdminVehicleFeature({
        token,
        featureId,
      })
    },
    onSuccess: async () => {
      setEditingFeature(null)

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'catalog', 'vehicle-features'],
      })
    },
  })

  const installDefaultsMutation = useMutation({
    mutationFn: async () => {
      const token = await getAdminToken()

      return installDefaultVehicleFeatures({ token })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['admin', 'catalog', 'vehicle-features'],
      })
    },
  })

  const features = featuresQuery.data ?? []

  const featuresErrorMessage =
    featuresQuery.error instanceof Error ? featuresQuery.error.message : null

  const createErrorMessage =
    createFeatureMutation.error instanceof Error
      ? createFeatureMutation.error.message
      : null

  const updateErrorMessage =
    updateFeatureMutation.error instanceof Error
      ? updateFeatureMutation.error.message
      : null

  const deleteErrorMessage =
    deleteFeatureMutation.error instanceof Error
      ? deleteFeatureMutation.error.message
      : null

  const installDefaultsErrorMessage =
    installDefaultsMutation.error instanceof Error
      ? installDefaultsMutation.error.message
      : null

  return {
    features,
    featuresQuery,
    featuresErrorMessage,

    isCreateFeatureOpen,
    setIsCreateFeatureOpen,

    editingFeature,
    setEditingFeature,

    createFeatureMutation,
    createErrorMessage,

    updateFeatureMutation,
    updateErrorMessage,

    deleteFeatureMutation,
    deleteErrorMessage,

    installDefaultsMutation,
    installDefaultsErrorMessage,
  }
}
