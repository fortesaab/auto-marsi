import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { getAdminListings } from '../api/getAdminListings'

export function useAdminListings() {
  const { getToken, isLoaded, isSignedIn } = useAuth()

  async function getAuthToken() {
    const token = await getToken()

    if (!token) {
      throw new Error('Missing authentication token.')
    }

    return token
  }

  const listingsQuery = useQuery({
    queryKey: ['admin', 'listings'],
    enabled: isLoaded && isSignedIn,
    queryFn: async () => {
      const token = await getAuthToken()

      return getAdminListings({ token })
    },
  })

  const listings = listingsQuery.data?.data ?? []
  const errorMessage =
    listingsQuery.error instanceof Error
      ? listingsQuery.error.message
      : null

  return {
    listings,
    listingsQuery,
    errorMessage,
  }
}
