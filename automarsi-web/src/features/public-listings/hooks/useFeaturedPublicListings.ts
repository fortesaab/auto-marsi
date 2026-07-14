import { useQuery } from '@tanstack/react-query'
import { getPublicListings } from '../api/getPublicListings'
import type { PublicListingFilters } from '../types'

const homepageListingFilters: PublicListingFilters = {
  page: 1,
  make_id: '',
  car_model_id: '',
  search: '',
  year: '',
  min_price: '',
  max_price: '',
  fuel_type: '',
  transmission: '',
  body_type: '',
  per_page: 6,
}

export function useFeaturedPublicListings() {
  const listingsQuery = useQuery({
    queryKey: ['public', 'homepage-listings'],
    queryFn: () => getPublicListings(homepageListingFilters),
    staleTime: 60_000,
  })

  return {
    listings: listingsQuery.data?.data ?? [],
    listingsQuery,
    errorMessage:
      listingsQuery.error instanceof Error ? listingsQuery.error.message : null,
  }
}
