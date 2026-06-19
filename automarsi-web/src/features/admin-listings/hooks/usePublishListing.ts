import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/hooks/useAdminToken'
import { publishAdminListing } from '../api/publishAdminListing'

type UsePublishListingParams = {
  listingId: string
}

export function usePublishListing({
  listingId,
}: UsePublishListingParams) {
  const queryClient = useQueryClient()
  const { getAdminToken } = useAdminToken()

  return useMutation({
    mutationFn: async () => {
      const token = await getAdminToken()

      return publishAdminListing({
        token,
        listingId,
      })
    },
    onSuccess: async (listing) => {
      queryClient.setQueryData(
        ['admin', 'listings', listingId],
        listing
      )

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'listings'],
      })

      toast.success('Listing published successfully.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to publish listing.'
      )
    },
  })
}
