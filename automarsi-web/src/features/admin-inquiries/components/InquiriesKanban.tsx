import { CalendarPlus, CheckCircle2, Eye } from 'lucide-react'
import AdminAvatar from '@/components/admin/AdminAvatar'
import AdminBoardColumn from '@/components/admin/AdminBoardColumn'
import { Button } from '@/components/ui/button'
import type { AdminInquiry, InquiryStatus } from '../types'
import InquiryStatusBadge from './InquiryStatusBadge'

type InquiriesKanbanProps = {
  inquiries: AdminInquiry[]
  isUpdating: boolean
  onScheduleAppointment: (inquiry: AdminInquiry) => void
  onStatusChange: (inquiryId: number, status: InquiryStatus) => void
}

const columns = [
  {
    title: 'New',
    matches: (inquiry: AdminInquiry) => inquiry.status === 'new',
  },
  {
    title: 'Contacted',
    matches: (inquiry: AdminInquiry) =>
      inquiry.status === 'read' && !inquiry.has_appointment,
  },
  {
    title: 'Booked',
    matches: (inquiry: AdminInquiry) => inquiry.has_appointment,
  },
]

function formatListing(inquiry: AdminInquiry): string {
  return inquiry.listing?.title ?? 'General inquiry'
}

function formatAge(value: string | null): string {
  if (!value) {
    return ''
  }

  const minutes = Math.max(
    1,
    Math.round((Date.now() - new Date(value).getTime()) / 60_000)
  )

  if (minutes < 60) {
    return `${minutes}m`
  }

  const hours = Math.round(minutes / 60)

  if (hours < 24) {
    return `${hours}h`
  }

  return `${Math.round(hours / 24)}d`
}

function sourceLabel(source: string | null): string {
  if (!source) {
    return 'Lead'
  }

  return source.replaceAll('_', ' ')
}

function InquiriesKanban({
  inquiries,
  isUpdating,
  onScheduleAppointment,
  onStatusChange,
}: InquiriesKanbanProps) {
  return (
    <div className="grid gap-4 p-4 xl:grid-cols-3">
      {columns.map((column) => {
        const columnInquiries = inquiries.filter(column.matches)

        return (
          <AdminBoardColumn
            key={column.title}
            title={column.title}
            count={columnInquiries.length}
            className="min-h-[360px]"
          >
            {columnInquiries.map((inquiry) => (
              <article
                key={inquiry.id}
                className="rounded-2xl border bg-background p-4 shadow-[0_14px_35px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-start gap-3">
                  <AdminAvatar name={inquiry.name} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="truncate text-sm font-bold tracking-[-0.02em]">
                          {inquiry.name}
                        </h4>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          {sourceLabel(inquiry.source)}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatAge(inquiry.created_at)}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm font-semibold text-foreground/80">
                      {formatListing(inquiry)}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <InquiryStatusBadge status={inquiry.status} />
                      {inquiry.has_appointment ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-bold text-emerald-700">
                          Appointment
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {inquiry.status === 'new' ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      onClick={() => onStatusChange(inquiry.id, 'read')}
                    >
                      <CheckCircle2 className="size-4" />
                      Contacted
                    </Button>
                  ) : null}

                  {!inquiry.has_appointment ? (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onScheduleAppointment(inquiry)}
                    >
                      <CalendarPlus className="size-4" />
                      Book
                    </Button>
                  ) : null}

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={isUpdating || inquiry.status === 'closed'}
                    onClick={() => onStatusChange(inquiry.id, 'closed')}
                  >
                    <Eye className="size-4" />
                    Close
                  </Button>
                </div>
              </article>
            ))}

            {columnInquiries.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-background/50 p-5 text-center text-sm text-muted-foreground">
                No leads here.
              </div>
            ) : null}
          </AdminBoardColumn>
        )
      })}
    </div>
  )
}

export default InquiriesKanban
