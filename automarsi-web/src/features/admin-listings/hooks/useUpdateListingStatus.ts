import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/hooks/useAdminToken'
import {
  updateAdminListingStatus,
  type AdminListingStatusAction,
} from '../api/updateAdminListingStatus'

type UseUpdateListingStatusParams = {
  listingId: string
}

export function useUpdateListingStatus({
  listingId,
}: UseUpdateListingStatusParams) {
  const queryClient = useQueryClient()
  const { getAdminToken } = useAdminToken()

  return useMutation({
    mutationFn: async (status: AdminListingStatusAction) => {
      const token = await getAdminToken()

      await updateAdminListingStatus({
        token,
        listingId: Number(listingId),
        status,
      })

      return status
    },
    onSuccess: async (status) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin', 'listings', listingId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin', 'listings'],
        }),
      ])

      toast.success(`Listing marked as ${status}.`)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update listing status.'
      )
    },
  })
}
