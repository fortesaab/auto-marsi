import { CalendarPlus, RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import PaginationControls from '@/components/admin/PaginationControls'
import { Button } from '@/components/ui/button'
import AppointmentFormDialog from '@/features/admin-appointments/components/AppointmentFormDialog'
import AppointmentsSchedule from '@/features/admin-appointments/components/AppointmentsSchedule'
import { useAdminAppointments } from '@/features/admin-appointments/hooks/useAdminAppointments'
import type {
  AdminAppointment,
  AppointmentStatus,
} from '@/features/admin-appointments/types'
import AdminListingSelect from '@/features/admin-listings/components/AdminListingSelect'
import { useAdminListingOptions } from '@/features/admin-listings/hooks/useAdminListingOptions'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

function AppointmentsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<AppointmentStatus | ''>('')
  const [listingId, setListingId] = useState('')
  const [page, setPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] =
    useState<AdminAppointment | null>(null)
  const debouncedSearch = useDebouncedValue(search)
  const listingOptions = useAdminListingOptions()

  const {
    appointments,
    meta,
    appointmentsQuery,
    updateStatusMutation,
    createAppointmentMutation,
    editAppointmentMutation,
    errorMessage,
  } = useAdminAppointments({
    search: debouncedSearch,
    status,
    listingId,
    page,
  })

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Schedule"
        title="Appointments"
        description="Review showroom visits and customer follow-ups."
        action={
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => appointmentsQuery.refetch()}
            >
              <RefreshCcw />
              Refresh
            </Button>
            <Button type="button" onClick={() => setIsCreateOpen(true)}>
              <CalendarPlus />
              New appointment
            </Button>
          </div>
        }
      />

      <DataTableShell
        title="Appointments"
        description={`${meta.total} total appointments`}
      >
        <div className="grid gap-3 border-b p-4 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder="Search name, phone, email, notes"
            className="h-9 rounded-md border bg-background px-3 text-sm"
          />

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as AppointmentStatus | '')
              setPage(1)
            }}
            className="h-9 rounded-md border bg-background px-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <AdminListingSelect
            listings={listingOptions.listings}
            value={listingId}
            includeAll
            disabled={listingOptions.isLoading}
            onChange={(value) => {
              setListingId(value)
              setPage(1)
            }}
          />
        </div>

        {appointmentsQuery.isLoading ? (
          <LoadingState label="Loading appointments" />
        ) : null}

        {errorMessage ? (
          <EmptyState
            title="Could not load appointments"
            description={errorMessage}
          />
        ) : null}

        {!appointmentsQuery.isLoading &&
        !errorMessage &&
        appointments.length === 0 ? (
          <EmptyState
            title="No appointments found"
            description="Create an appointment or schedule one from an inquiry."
          />
        ) : null}

        {!appointmentsQuery.isLoading &&
        !errorMessage &&
        appointments.length > 0 ? (
          <>
            <AppointmentsSchedule
              appointments={appointments}
              isUpdating={updateStatusMutation.isPending}
              onEdit={setEditingAppointment}
              onStatusChange={(appointmentId, nextStatus) =>
                updateStatusMutation.mutate({
                  appointmentId,
                  nextStatus,
                })
              }
            />
            <PaginationControls
              currentPage={meta.current_page}
              lastPage={meta.last_page}
              total={meta.total}
              onPageChange={setPage}
            />
          </>
        ) : null}
      </DataTableShell>

      {isCreateOpen ? (
        <AppointmentFormDialog
          open
          title="New appointment"
          description="Schedule a showroom visit or customer follow-up."
          submitLabel="Create appointment"
          listings={listingOptions.listings}
          isSubmitting={createAppointmentMutation.isPending}
          onOpenChange={setIsCreateOpen}
          onSubmit={async (payload) => {
            await createAppointmentMutation.mutateAsync(payload)
            setIsCreateOpen(false)
          }}
        />
      ) : null}

      {editingAppointment ? (
        <AppointmentFormDialog
          key={editingAppointment.id}
          open
          title="Edit appointment"
          description="Reschedule the visit or update customer details."
          submitLabel="Save changes"
          listings={listingOptions.listings}
          initialValues={{
            listingId: editingAppointment.listing_id,
            name: editingAppointment.name,
            phone: editingAppointment.phone,
            email: editingAppointment.email,
            preferredAt: editingAppointment.preferred_at,
            message: editingAppointment.message,
            status: editingAppointment.status,
          }}
          isSubmitting={editAppointmentMutation.isPending}
          onOpenChange={(open) => {
            if (!open) {
              setEditingAppointment(null)
            }
          }}
          onSubmit={async (payload) => {
            await editAppointmentMutation.mutateAsync({
              appointmentId: editingAppointment.id,
              payload,
            })
            setEditingAppointment(null)
          }}
        />
      ) : null}
    </section>
  )
}

export default AppointmentsPage
