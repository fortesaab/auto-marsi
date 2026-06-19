import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/hooks/useAdminToken'
import { createAdminListing } from '../api/createAdminListing'
import {
  buildListingPayload,
  initialListingFormState,
} from '../form/listingFormState'
import type { AdminListing } from '../types'
import { useListingFormFields } from './useListingFormFields'

type UseListingCreateFormParams = {
  onCreated: (listing: AdminListing) => void
}

export function useListingCreateForm({
  onCreated,
}: UseListingCreateFormParams) {
  const { getAdminToken } = useAdminToken()
  const fields = useListingFormFields(
    initialListingFormState
  )

  const createListingMutation = useMutation({
    mutationFn: async () => {
      const token = await getAdminToken()

      return createAdminListing({
        token,
        payload: buildListingPayload(fields.formState),
      })
    },
    onSuccess: (createdListing) => {
      fields.resetForm(initialListingFormState)
      toast.success('Listing saved. Add its photos next.')
      onCreated(createdListing)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create listing.'
      )
    },
  })

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await createListingMutation.mutateAsync()
  }

  const errorMessage = fields.optionsErrorMessage ??
    (createListingMutation.error instanceof Error
      ? createListingMutation.error.message
      : null)

  return {
    ...fields,
    isSubmitting: createListingMutation.isPending,
    errorMessage,
    submit,
  }
}
