import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getListingCarModels } from '../api/getListingCarModels'
import { getListingMakes } from '../api/getListingMakes'
import {
  buildGeneratedListingTitle,
  type ListingFormState,
} from '../form/listingFormState'
import { useListingEquipment } from './useListingEquipment'

type ListingFormStateInitializer =
  | ListingFormState
  | (() => ListingFormState)

type UseListingFormFieldsOptions = {
  autoGenerateTitle?: boolean
}

export function useListingFormFields(
  initialState: ListingFormStateInitializer,
  { autoGenerateTitle = false }: UseListingFormFieldsOptions = {}
) {
  const [formState, setFormState] =
    useState<ListingFormState>(initialState)
  const [isTitleAutomatic, setIsTitleAutomatic] =
    useState(autoGenerateTitle)
  const selectedMakeId = Number(formState.makeId)
  const selectedCarModelId = Number(formState.carModelId)

  const makesQuery = useQuery({
    queryKey: ['listing-form', 'makes'],
    queryFn: getListingMakes,
    staleTime: 5 * 60_000,
  })

  const carModelsQuery = useQuery({
    queryKey: ['listing-form', 'car-models', selectedMakeId],
    enabled: selectedMakeId > 0,
    queryFn: () => getListingCarModels(selectedMakeId),
    staleTime: 5 * 60_000,
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

  function generatedTitle({
    year = formState.year,
    makeId = formState.makeId,
    carModelId = formState.carModelId,
  }: {
    year?: string
    makeId?: string
    carModelId?: string
  } = {}) {
    const make = makesQuery.data?.find(
      (item) => String(item.id) === makeId
    )
    const model = carModelsQuery.data?.find(
      (item) => String(item.id) === carModelId
    )

    return buildGeneratedListingTitle({
      year,
      make: make?.name,
      model: model?.name,
    })
  }

  function useGeneratedTitle() {
    setIsTitleAutomatic(true)
    setFormState((currentState) => ({
      ...currentState,
      title: generatedTitle(),
    }))
  }

  async function updateField(
    field: keyof ListingFormState,
    value: string
  ) {
    if (field === 'makeId') {
      const nextTitle = isTitleAutomatic
        ? generatedTitle({
            makeId: value,
            carModelId: '',
          })
        : formState.title

      setFormState((currentState) => ({
        ...currentState,
        makeId: value,
        carModelId: '',
        featureIds: [],
        title: nextTitle,
      }))
      return
    }

    if (field === 'carModelId') {
      const nextTitle = isTitleAutomatic
        ? generatedTitle({ carModelId: value })
        : formState.title

      setFormState((currentState) => ({
        ...currentState,
        carModelId: value,
        featureIds: [],
        title: nextTitle,
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

    if (field === 'year') {
      setFormState((currentState) => ({
        ...currentState,
        year: value,
        title: isTitleAutomatic
          ? generatedTitle({ year: value })
          : currentState.title,
      }))
      return
    }

    if (field === 'title') {
      setIsTitleAutomatic(false)
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

  function resetForm(nextState: ListingFormState) {
    setFormState(nextState)
    setIsTitleAutomatic(autoGenerateTitle)
  }

  return {
    formState,
    resetForm,
    makes: makesQuery.data ?? [],
    carModels: carModelsQuery.data ?? [],
    equipment,
    isTitleAutomatic,
    useGeneratedTitle,
    isLoadingOptions:
      makesQuery.isLoading ||
      (selectedMakeId > 0 && carModelsQuery.isLoading),
    optionsErrorMessage,
    updateField,
  }
}
