import { useQuery } from '@tanstack/react-query'
import { getPublicListings } from '../api/getPublicListings'
import type { PublicListingFilters } from '../types'

type UsePublicListingsParams = {
  filters: PublicListingFilters
}

export function usePublicListings({ filters }: UsePublicListingsParams) {
  const listingsQuery = useQuery({
    queryKey: ['public', 'listings', filters],
    queryFn: () => getPublicListings(filters),
    staleTime: 60_000,
  })

  return {
    listings: listingsQuery.data?.data ?? [],
    meta: listingsQuery.data?.meta ?? null,
    listingsQuery,
    errorMessage:
      listingsQuery.error instanceof Error ? listingsQuery.error.message : null,
  }
}
