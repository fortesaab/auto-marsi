import { useQuery } from '@tanstack/react-query'
import { useAdminToken } from '@/hooks/useAdminToken'
import { getAdminDashboard } from '../api/getAdminDashboard'

export function useAdminOverview() {
  const { isAuthReady, getAdminToken } = useAdminToken()

  const overviewQuery = useQuery({
    queryKey: ['admin', 'overview'],
    enabled: isAuthReady,
    staleTime: 30_000,
    queryFn: async () => {
      const token = await getAdminToken()
      const response = await getAdminDashboard({ token })

      return {
        totalListings: response.data.listings.total,
        activeListings: response.data.listings.active,
        draftListings: response.data.listings.draft,
        soldListings: response.data.listings.sold,
        archivedListings: response.data.listings.archived,
        newInquiries: response.data.new_inquiries,
        openAppointments: response.data.open_appointments,
        recentInquiries: response.data.recent_inquiries,
        upcomingAppointments: response.data.upcoming_appointments,
      }
    },
  })

  return {
    overview: overviewQuery.data ?? null,
    overviewQuery,
    errorMessage:
      overviewQuery.error instanceof Error
        ? overviewQuery.error.message
        : null,
  }
}
