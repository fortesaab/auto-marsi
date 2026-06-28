import { useQuery } from '@tanstack/react-query'
import { getPublicListing } from '../api/getPublicListing'

type UsePublicListingParams = {
  listingId: number
}

export function usePublicListing({ listingId }: UsePublicListingParams) {
  const listingQuery = useQuery({
    queryKey: ['public', 'listing', listingId],
    enabled: Number.isFinite(listingId) && listingId > 0,
    queryFn: () => getPublicListing({ listingId }),
    staleTime: 60_000,
  })

  return {
    listing: listingQuery.data?.data ?? null,
    listingQuery,
    errorMessage:
      listingQuery.error instanceof Error ? listingQuery.error.message : null,
  }
}
