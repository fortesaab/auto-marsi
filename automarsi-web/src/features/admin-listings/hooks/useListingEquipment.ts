import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createAdminVehicleFeature } from '@/features/admin-catalog/features/api/createAdminVehicleFeature'
import { getAdminVehicleFeatures } from '@/features/admin-catalog/features/api/getAdminVehicleFeatures'
import type {
  AdminVehicleFeature,
  CreateAdminVehicleFeaturePayload,
} from '@/features/admin-catalog/features/types'
import { getCarModelFeatureSuggestions } from '@/features/admin-catalog/makes/api/getCarModelFeatureSuggestions'
import { useAdminToken } from '@/hooks/useAdminToken'

type UseListingEquipmentParams = {
  carModelId: number
  selectedFeatureIds: string[]
  onSelectionChange: (featureIds: string[]) => void
}

const featuresQueryKey = [
  'admin',
  'catalog',
  'vehicle-features',
] as const

function suggestionsQueryKey(carModelId: number) {
  return [
    'admin',
    'catalog',
    'car-models',
    carModelId,
    'feature-suggestions',
  ] as const
}

export function useListingEquipment({
  carModelId,
  selectedFeatureIds,
  onSelectionChange,
}: UseListingEquipmentParams) {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()

  const featuresQuery = useQuery({
    queryKey: featuresQueryKey,
    enabled: isAuthReady,
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminVehicleFeatures({ token })
    },
  })

  const suggestionsQuery = useQuery({
    queryKey: suggestionsQueryKey(carModelId),
    enabled: isAuthReady && carModelId > 0,
    queryFn: async () => {
      const token = await getAdminToken()

      return getCarModelFeatureSuggestions({
        token,
        modelId: carModelId,
      })
    },
  })

  const createFeatureMutation = useMutation({
    mutationFn: async (payload: CreateAdminVehicleFeaturePayload) => {
      const token = await getAdminToken()

      return createAdminVehicleFeature({ token, payload })
    },
    onSuccess: (createdFeature) => {
      queryClient.setQueryData<AdminVehicleFeature[]>(
        featuresQueryKey,
        (features = []) =>
          [...features, createdFeature].sort((first, second) =>
            first.name.localeCompare(second.name)
          )
      )

      onSelectionChange([
        ...new Set([...selectedFeatureIds, String(createdFeature.id)]),
      ])
      toast.success(`${createdFeature.name} added to this listing.`)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to create vehicle feature.'
      )
    },
  })

  function toggleFeature(featureId: number) {
    const value = String(featureId)

    onSelectionChange(
      selectedFeatureIds.includes(value)
        ? selectedFeatureIds.filter((id) => id !== value)
        : [...selectedFeatureIds, value]
    )
  }

  async function getInheritedFeatureIds(modelId: number): Promise<string[]> {
    if (modelId <= 0) {
      return []
    }

    try {
      const token = await getAdminToken()
      const suggestions = await queryClient.fetchQuery({
        queryKey: suggestionsQueryKey(modelId),
        queryFn: () =>
          getCarModelFeatureSuggestions({
            token,
            modelId,
          }),
      })

      return suggestions.map((feature) => String(feature.id))
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Could not load the model equipment preset.'
      )

      return []
    }
  }

  return {
    features: featuresQuery.data ?? [],
    suggestions: suggestionsQuery.data ?? [],
    isLoading:
      !isAuthReady ||
      featuresQuery.isLoading ||
      (carModelId > 0 && suggestionsQuery.isLoading),
    catalogErrorMessage:
      featuresQuery.error instanceof Error
        ? featuresQuery.error.message
        : null,
    presetErrorMessage:
      suggestionsQuery.error instanceof Error
        ? suggestionsQuery.error.message
        : null,
    toggleFeature,
    getInheritedFeatureIds,
    createFeatureMutation,
    retry: async () => {
      await Promise.all([
        featuresQuery.refetch(),
        carModelId > 0
          ? suggestionsQuery.refetch()
          : Promise.resolve(),
      ])
    },
  }
}
