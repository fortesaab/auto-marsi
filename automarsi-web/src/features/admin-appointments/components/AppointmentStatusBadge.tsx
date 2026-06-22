import AdminStatusPill from '@/components/admin/AdminStatusPill'
import type { AppointmentStatus } from '../types'

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus
}

function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  return <AdminStatusPill status={status} />
}

export default AppointmentStatusBadge
