import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { createAdminListing } from '../api/createAdminListing'
import { getListingCarModels } from '../api/getListingCarModels'
import { getListingMakes } from '../api/getListingMakes'
import {
  buildCreateListingPayload,
  initialListingFormState,
  type ListingFormState,
} from '../form/listingFormState'

type UseListingCreateFormParams = {
  token: string
  onCreated: () => void
}

export function useListingCreateForm({
  token,
  onCreated,
}: UseListingCreateFormParams) {
  const [formState, setFormState] = useState<ListingFormState>(
    initialListingFormState
  )

  const selectedMakeId = Number(formState.makeId)

  const makesQuery = useQuery({
    queryKey: ['listing-form', 'makes'],
    queryFn: getListingMakes,
  })

  const carModelsQuery = useQuery({
    queryKey: ['listing-form', 'car-models', selectedMakeId],
    enabled: Boolean(selectedMakeId),
    queryFn: () => getListingCarModels(selectedMakeId),
  })

  const createListingMutation = useMutation({
    mutationFn: () => {
      return createAdminListing({
        token,
        payload: buildCreateListingPayload(formState),
      })
    },
    onSuccess: () => {
      setFormState(initialListingFormState)
      onCreated()
    },
  })

  function updateField(field: keyof ListingFormState, value: string) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
      ...(field === 'makeId' ? { carModelId: '' } : {}),
    }))
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await createListingMutation.mutateAsync()
  }

  const errorMessage =
    makesQuery.error instanceof Error
      ? makesQuery.error.message
      : carModelsQuery.error instanceof Error
        ? carModelsQuery.error.message
        : createListingMutation.error instanceof Error
          ? createListingMutation.error.message
          : null

  return {
    formState,
    makes: makesQuery.data ?? [],
    carModels: carModelsQuery.data ?? [],
    isLoadingOptions: makesQuery.isLoading,
    isSubmitting: createListingMutation.isPending,
    errorMessage,
    updateField,
    submit,
  }
}
