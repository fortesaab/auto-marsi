import { publicApi } from '@/lib/publicApi'
import type {
  PublicListingFilters,
  PublicListingsResponse,
} from '../types'

export function getPublicListings(filters: PublicListingFilters) {
  return publicApi<PublicListingsResponse>({
    path: '/listings',
    query: {
      page: filters.page,
      search: filters.search,
      year: filters.year,
      min_price: filters.min_price,
      max_price: filters.max_price,
      fuel_type: filters.fuel_type,
      transmission: filters.transmission,
      body_type: filters.body_type,
      per_page: 9,
    },
  })
}
