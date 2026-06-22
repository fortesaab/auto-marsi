import AdminStatusPill from '@/components/admin/AdminStatusPill'

type ListingStatusBadgeProps = {
  status: string
}

function ListingStatusBadge({ status }: ListingStatusBadgeProps) {
  return <AdminStatusPill status={status} />
}

export default ListingStatusBadge
