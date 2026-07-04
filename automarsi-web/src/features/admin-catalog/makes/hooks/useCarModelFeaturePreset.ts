import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createAdminVehicleFeature } from '@/features/admin-catalog/features/api/createAdminVehicleFeature'
import { getAdminVehicleFeatures } from '@/features/admin-catalog/features/api/getAdminVehicleFeatures'
import type {
  AdminVehicleFeature,
  CreateAdminVehicleFeaturePayload,
} from '@/features/admin-catalog/features/types'
import { useAdminToken } from '@/hooks/useAdminToken'
import { getCarModelFeatureSuggestions } from '../api/getCarModelFeatureSuggestions'
import { updateCarModelFeatureSuggestions } from '../api/updateCarModelFeatureSuggestions'

type UseCarModelFeaturePresetParams = {
  modelId: number
}

export function useCarModelFeaturePreset({
  modelId,
}: UseCarModelFeaturePresetParams) {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()
  const suggestionsQueryKey = [
    'admin',
    'catalog',
    'car-models',
    modelId,
    'feature-suggestions',
  ] as const
  const featuresQueryKey = [
    'admin',
    'catalog',
    'vehicle-features',
  ] as const

  const featuresQuery = useQuery({
    queryKey: featuresQueryKey,
    enabled: isAuthReady,
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
    onSuccess: (createdFeature) => {
      queryClient.setQueryData<AdminVehicleFeature[]>(
        featuresQueryKey,
        (currentFeatures = []) =>
          [...currentFeatures, createdFeature].sort((first, second) =>
            first.name.localeCompare(second.name)
          )
      )

      toast.success(`${createdFeature.name} created and selected.`)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to create vehicle feature.'
      )
    },
  })

  const suggestionsQuery = useQuery({
    queryKey: suggestionsQueryKey,
    enabled: isAuthReady && modelId > 0,
    queryFn: async () => {
      const token = await getAdminToken()

      return getCarModelFeatureSuggestions({
        token,
        modelId,
      })
    },
  })

  const updatePresetMutation = useMutation({
    mutationFn: async (featureIds: number[]) => {
      const token = await getAdminToken()

      return updateCarModelFeatureSuggestions({
        token,
        modelId,
        featureIds,
      })
    },
    onMutate: async (featureIds) => {
      await queryClient.cancelQueries({
        queryKey: suggestionsQueryKey,
      })

      const previousSuggestions =
        queryClient.getQueryData<AdminVehicleFeature[]>(suggestionsQueryKey)

      const featureIdsSet = new Set(featureIds)
      const optimisticSuggestions = (featuresQuery.data ?? []).filter(
        (feature) => featureIdsSet.has(feature.id)
      )

      queryClient.setQueryData(
        suggestionsQueryKey,
        optimisticSuggestions
      )

      return { previousSuggestions }
    },
    onError: (error, _featureIds, context) => {
      queryClient.setQueryData(
        suggestionsQueryKey,
        context?.previousSuggestions
      )

      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to save model feature preset.'
      )
    },
    onSuccess: (features) => {
      queryClient.setQueryData(suggestionsQueryKey, features)
      toast.success('Model feature preset saved.')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: suggestionsQueryKey,
      })
    },
  })

  const errorMessage =
    featuresQuery.error instanceof Error
      ? featuresQuery.error.message
      : suggestionsQuery.error instanceof Error
        ? suggestionsQuery.error.message
        : null

  const activeFeatures = (featuresQuery.data ?? []).filter(
    (feature) => feature.is_active
  )
  const activeSuggestions = (suggestionsQuery.data ?? []).filter(
    (feature) => feature.is_active
  )

  return {
    features: activeFeatures,
    suggestions: activeSuggestions,
    isLoading: featuresQuery.isLoading || suggestionsQuery.isLoading,
    errorMessage,
    createFeatureMutation,
    updatePresetMutation,
  }
}
