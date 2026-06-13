import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'

export function useAdminToken() {
  const { getToken, isLoaded, isSignedIn } = useAuth()

  const tokenQuery = useQuery({
    queryKey: ['admin', 'auth-token'],
    enabled: isLoaded,
    queryFn: async () => {
      if (!isSignedIn) {
        throw new Error('Please sign in before continuing.')
      }

      const token = await getToken()

      if (!token) {
        throw new Error('Please sign in again before continuing.')
      }

      return token
    },
  })

  const errorMessage =
    tokenQuery.error instanceof Error ? tokenQuery.error.message : null

  return {
    token: tokenQuery.data ?? null,
    tokenQuery,
    errorMessage,
  }
}
