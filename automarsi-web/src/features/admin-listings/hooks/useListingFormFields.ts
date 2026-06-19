import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getListingCarModels } from '../api/getListingCarModels'
import { getListingMakes } from '../api/getListingMakes'
import type { ListingFormState } from '../form/listingFormState'
import { useListingEquipment } from './useListingEquipment'

type ListingFormStateInitializer =
  | ListingFormState
  | (() => ListingFormState)

export function useListingFormFields(
  initialState: ListingFormStateInitializer
) {
  const [formState, setFormState] =
    useState<ListingFormState>(initialState)
  const selectedMakeId = Number(formState.makeId)
  const selectedCarModelId = Number(formState.carModelId)

  const makesQuery = useQuery({
    queryKey: ['listing-form', 'makes'],
    queryFn: getListingMakes,
  })

  const carModelsQuery = useQuery({
    queryKey: ['listing-form', 'car-models', selectedMakeId],
    enabled: selectedMakeId > 0,
    queryFn: () => getListingCarModels(selectedMakeId),
  })

  const equipment = useListingEquipment({
    carModelId: selectedCarModelId,
    selectedFeatureIds: formState.featureIds,
    onSelectionChange: (featureIds) => {
      setFormState((currentState) => ({
        ...currentState,
        featureIds,
      }))
    },
  })

  async function updateField(
    field: keyof ListingFormState,
    value: string
  ) {
    if (field === 'makeId') {
      setFormState((currentState) => ({
        ...currentState,
        makeId: value,
        carModelId: '',
        featureIds: [],
      }))
      return
    }

    if (field === 'carModelId') {
      setFormState((currentState) => ({
        ...currentState,
        carModelId: value,
        featureIds: [],
      }))

      const inheritedFeatureIds =
        await equipment.getInheritedFeatureIds(Number(value))

      setFormState((currentState) =>
        currentState.carModelId === value
          ? {
              ...currentState,
              featureIds: inheritedFeatureIds,
            }
          : currentState
      )
      return
    }

    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  const optionsErrorMessage =
    makesQuery.error instanceof Error
      ? makesQuery.error.message
      : carModelsQuery.error instanceof Error
        ? carModelsQuery.error.message
        : null

  return {
    formState,
    resetForm: setFormState,
    makes: makesQuery.data ?? [],
    carModels: carModelsQuery.data ?? [],
    equipment,
    isLoadingOptions:
      makesQuery.isLoading ||
      (selectedMakeId > 0 && carModelsQuery.isLoading),
    optionsErrorMessage,
    updateField,
  }
}
