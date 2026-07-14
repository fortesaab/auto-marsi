import type { AdminAppointment } from '@/features/admin-appointments/types'
import type { AdminInquiry } from '@/features/admin-inquiries/types'
import { adminApi } from '@/lib/adminApi'

export type AdminDashboardData = {
  listings: {
    total: number
    active: number
    draft: number
    sold: number
    archived: number
  }
  new_inquiries: number
  open_appointments: number
  recent_inquiries: AdminInquiry[]
  upcoming_appointments: AdminAppointment[]
}

type AdminDashboardResponse = { data: AdminDashboardData }

export function getAdminDashboard({ token }: { token: string }) {
  return adminApi<AdminDashboardResponse>({ token, path: '/admin/dashboard' })
}
