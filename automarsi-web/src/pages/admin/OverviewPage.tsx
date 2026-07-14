import {
  CalendarClock,
  CarFront,
  CircleGauge,
  MessageSquareText,
  RefreshCw,
} from 'lucide-react'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import AppointmentStatusBadge from '@/features/admin-appointments/components/AppointmentStatusBadge'
import InquiryStatusBadge from '@/features/admin-inquiries/components/InquiryStatusBadge'
import InventoryStatusChart from '@/features/admin-overview/components/InventoryStatusChart'
import OverviewKpiCard from '@/features/admin-overview/components/OverviewKpiCard'
import OverviewPanel from '@/features/admin-overview/components/OverviewPanel'
import { useAdminOverview } from '@/features/admin-overview/hooks/useAdminOverview'

type OverviewPageProps = {
  onNavigate: (path: string) => void
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Tirane',
  }).format(new Date(value))
}

function OverviewPage({ onNavigate }: OverviewPageProps) {
  const { overview, overviewQuery, errorMessage } = useAdminOverview()

  return (
    <section className="grid gap-5">
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="Inventory and customer activity at a glance."
        action={
          <Button
            type="button"
            variant="outline"
            disabled={overviewQuery.isFetching}
            onClick={() => void overviewQuery.refetch()}
          >
            <RefreshCw
              className={overviewQuery.isFetching ? 'animate-spin' : ''}
            />
            Refresh
          </Button>
        }
      />

      {overviewQuery.isLoading ? (
        <LoadingState label="Loading dashboard" />
      ) : null}

      {!overviewQuery.isLoading && errorMessage ? (
        <EmptyState
          title="Could not load dashboard"
          description={errorMessage}
        />
      ) : null}

      {!overviewQuery.isLoading && !errorMessage && overview ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <OverviewKpiCard
              label="Total listings"
              value={overview.totalListings}
              detail="All inventory records"
              icon={CarFront}
            />
            <OverviewKpiCard
              label="Published"
              value={overview.activeListings}
              detail="Visible to customers"
              icon={CircleGauge}
              tone="green"
            />
            <OverviewKpiCard
              label="New inquiries"
              value={overview.newInquiries}
              detail="Waiting for follow-up"
              icon={MessageSquareText}
              tone="blue"
            />
            <OverviewKpiCard
              label="Open appointments"
              value={overview.openAppointments}
              detail="Pending or confirmed"
              icon={CalendarClock}
              tone="amber"
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
            <OverviewPanel
              title="Inventory status"
              description={`${overview.totalListings} vehicles managed`}
            >
              <InventoryStatusChart
                active={overview.activeListings}
                draft={overview.draftListings}
                sold={overview.soldListings}
                archived={overview.archivedListings}
              />
              <div className="border-t p-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => onNavigate('/admin/listings')}
                >
                  Open inventory
                </Button>
              </div>
            </OverviewPanel>

            <OverviewPanel
              title="Upcoming appointments"
              description="Next scheduled customer visits"
            >
              {overview.upcomingAppointments.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">
                  No upcoming appointments.
                </div>
              ) : (
                <div>
                  {overview.upcomingAppointments.map((appointment) => (
                    <button
                      key={appointment.id}
                      type="button"
                      onClick={() => onNavigate('/admin/appointments')}
                      className="grid w-full grid-cols-[1fr_auto] gap-4 border-b px-4 py-3 text-left last:border-b-0 hover:bg-muted/40"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">
                          {appointment.name}
                        </span>
                        <span className="mt-1 block truncate text-xs text-muted-foreground">
                          {appointment.listing?.title ?? 'General appointment'}
                          {' · '}
                          {formatDateTime(appointment.preferred_at)}
                        </span>
                      </span>
                      <AppointmentStatusBadge status={appointment.status} />
                    </button>
                  ))}
                </div>
              )}
            </OverviewPanel>
          </div>

          <OverviewPanel
            title="Recent inquiries"
            description="Latest customer interest"
          >
            {overview.recentInquiries.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground">
                No inquiries yet.
              </div>
            ) : (
              <div className="grid md:grid-cols-2">
                {overview.recentInquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    type="button"
                    onClick={() => onNavigate('/admin/inquiries')}
                    className="flex items-start justify-between gap-4 border-b px-4 py-3 text-left hover:bg-muted/40 md:odd:border-r"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        {inquiry.name}
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted-foreground">
                        {inquiry.listing?.title ?? 'General inquiry'}
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted-foreground/70">
                        {inquiry.message ?? 'No message'}
                      </span>
                    </span>
                    <InquiryStatusBadge status={inquiry.status} />
                  </button>
                ))}
              </div>
            )}
          </OverviewPanel>
        </>
      ) : null}
    </section>
  )
}

export default OverviewPage
