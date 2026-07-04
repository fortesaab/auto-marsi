import { Pencil } from 'lucide-react'
import AdminAvatar from '@/components/admin/AdminAvatar'
import AdminSurface from '@/components/admin/AdminSurface'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { AdminAppointment, AppointmentStatus } from '../types'
import AppointmentStatusBadge from './AppointmentStatusBadge'

type AppointmentsScheduleProps = {
  appointments: AdminAppointment[]
  isUpdating: boolean
  onEdit: (appointment: AdminAppointment) => void
  onStatusChange: (appointmentId: number, status: AppointmentStatus) => void
}

function formatTime(value: string): { hour: string; meridiem: string } {
  const date = new Date(value)
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Europe/Tirane',
  }).formatToParts(date)

  return {
    hour: `${parts.find((part) => part.type === 'hour')?.value ?? ''}:${
      parts.find((part) => part.type === 'minute')?.value ?? ''
    }`,
    meridiem: parts.find((part) => part.type === 'dayPeriod')?.value ?? '',
  }
}

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(value)
}

function formatListing(appointment: AdminAppointment): string {
  return appointment.listing?.title ?? 'General appointment'
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function sameDay(first: Date, second: Date): boolean {
  return startOfDay(first).getTime() === startOfDay(second).getTime()
}

function monthDays(today: Date): Date[] {
  const days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  return Array.from(
    { length: days },
    (_, index) => new Date(today.getFullYear(), today.getMonth(), index + 1)
  )
}

function statusAccent(status: AppointmentStatus): string {
  const accents: Record<AppointmentStatus, string> = {
    pending: 'border-amber-400',
    confirmed: 'border-sky-400',
    completed: 'border-emerald-500',
    cancelled: 'border-rose-400',
  }

  return accents[status]
}

function AppointmentsSchedule({
  appointments,
  isUpdating,
  onEdit,
  onStatusChange,
}: AppointmentsScheduleProps) {
  const today = new Date()
  const sortedAppointments = [...appointments].sort(
    (first, second) =>
      new Date(first.preferred_at).getTime() -
      new Date(second.preferred_at).getTime()
  )
  const daysWithAppointments = new Set(
    appointments.map((appointment) =>
      startOfDay(new Date(appointment.preferred_at)).getTime()
    )
  )
  const completedCount = appointments.filter(
    (appointment) => appointment.status === 'completed'
  ).length
  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === 'confirmed'
  ).length
  const pendingCount = appointments.filter(
    (appointment) => appointment.status === 'pending'
  ).length

  return (
    <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <AdminSurface>
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h3 className="text-sm font-bold tracking-[-0.02em]">
              Today · {formatDate(today)}
            </h3>
            <p className="text-xs text-muted-foreground">
              {appointments.length} scheduled
            </p>
          </div>
        </div>

        <div className="divide-y">
          {sortedAppointments.map((appointment) => {
            const time = formatTime(appointment.preferred_at)

            return (
              <article
                key={appointment.id}
                className="grid gap-3 px-5 py-4 md:grid-cols-[70px_1fr_auto]"
              >
                <div className="font-bold tabular-nums">
                  <p>{time.hour}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">
                    {time.meridiem}
                  </p>
                </div>

                <div
                  className={cn(
                    'border-l-4 pl-4',
                    statusAccent(appointment.status)
                  )}
                >
                  <h4 className="text-sm font-bold tracking-[-0.02em]">
                    {formatListing(appointment)}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {appointment.name}
                    {appointment.message ? ` · ${appointment.message}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <AppointmentStatusBadge status={appointment.status} />
                  <AdminAvatar name={appointment.name} className="size-8" />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="size-8 rounded-xl"
                    onClick={() => onEdit(appointment)}
                    aria-label={`Edit appointment for ${appointment.name}`}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  {appointment.status === 'pending' ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      onClick={() =>
                        onStatusChange(appointment.id, 'confirmed')
                      }
                    >
                      Confirm
                    </Button>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </AdminSurface>

      <div className="grid gap-4">
        <AdminSurface>
          <div className="border-b px-5 py-4">
            <h3 className="text-sm font-bold tracking-[-0.02em]">
              {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                year: 'numeric',
              }).format(today)}
            </h3>
          </div>

          <div className="grid grid-cols-7 gap-1 p-4 text-center text-xs">
            {monthDays(today).map((day) => {
              const hasAppointment = daysWithAppointments.has(
                startOfDay(day).getTime()
              )
              const isToday = sameDay(day, today)

              return (
                <span
                  key={day.toISOString()}
                  className={cn(
                    'grid size-9 place-items-center rounded-xl font-semibold text-muted-foreground',
                    hasAppointment && 'bg-amber-100 text-amber-700',
                    isToday && 'bg-foreground text-background'
                  )}
                >
                  {day.getDate()}
                </span>
              )
            })}
          </div>
        </AdminSurface>

        <AdminSurface className="bg-foreground text-background">
          <div className="grid gap-4 p-5">
            <div>
              <h3 className="text-sm font-bold">This page</h3>
              <p className="text-xs text-background/60">
                Current filtered appointments
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-amber-300">
                  {pendingCount}
                </p>
                <p className="text-[10px] text-background/60">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{confirmedCount}</p>
                <p className="text-[10px] text-background/60">Confirmed</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-[10px] text-background/60">Done</p>
              </div>
            </div>
          </div>
        </AdminSurface>
      </div>
    </div>
  )
}

export default AppointmentsSchedule
