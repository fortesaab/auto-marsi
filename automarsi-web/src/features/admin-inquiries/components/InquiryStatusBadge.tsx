import AdminStatusPill from '@/components/admin/AdminStatusPill'
import type { InquiryStatus } from '../types'

type InquiryStatusBadgeProps = {
  status: InquiryStatus
}

function InquiryStatusBadge({ status }: InquiryStatusBadgeProps) {
  return <AdminStatusPill status={status} />
}

export default InquiryStatusBadge
