import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import PaginationControls from '@/components/admin/PaginationControls'
import { Button } from '@/components/ui/button'
import AppointmentFormDialog from '@/features/admin-appointments/components/AppointmentFormDialog'
import InquiriesKanban from '@/features/admin-inquiries/components/InquiriesKanban'
import { useAdminInquiries } from '@/features/admin-inquiries/hooks/useAdminInquiries'
import type {
  AdminInquiry,
  InquiryStatus,
} from '@/features/admin-inquiries/types'
import AdminListingSelect from '@/features/admin-listings/components/AdminListingSelect'
import { useAdminListingOptions } from '@/features/admin-listings/hooks/useAdminListingOptions'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

function InquiriesPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<InquiryStatus | ''>('')
  const [listingId, setListingId] = useState('')
  const [page, setPage] = useState(1)
  const [schedulingInquiry, setSchedulingInquiry] =
    useState<AdminInquiry | null>(null)
  const debouncedSearch = useDebouncedValue(search)
  const listingOptions = useAdminListingOptions()

  const {
    inquiries,
    meta,
    inquiriesQuery,
    updateStatusMutation,
    scheduleAppointmentMutation,
    errorMessage,
  } = useAdminInquiries({
    search: debouncedSearch,
    status,
    listingId,
    page,
  })

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Customers"
        title="Inquiries"
        description="Review buyer messages and turn qualified leads into appointments."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => inquiriesQuery.refetch()}
          >
            <RefreshCcw />
            Refresh
          </Button>
        }
      />

      <DataTableShell
        title="Customer inquiries"
        description={`${meta.total} total inquiries`}
      >
        <div className="grid gap-3 border-b p-4 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder="Search name, phone, email, message"
            className="h-9 rounded-md border bg-background px-3 text-sm"
          />

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as InquiryStatus | '')
              setPage(1)
            }}
            className="h-9 rounded-md border bg-background px-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="closed">Closed</option>
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

        {inquiriesQuery.isLoading ? (
          <LoadingState label="Loading inquiries" />
        ) : null}

        {errorMessage ? (
          <EmptyState
            title="Could not load inquiries"
            description={errorMessage}
          />
        ) : null}

        {!inquiriesQuery.isLoading &&
        !errorMessage &&
        inquiries.length === 0 ? (
          <EmptyState
            title="No inquiries found"
            description="Customer inquiries will appear here."
          />
        ) : null}

        {!inquiriesQuery.isLoading &&
        !errorMessage &&
        inquiries.length > 0 ? (
          <>
            <InquiriesKanban
              inquiries={inquiries}
              isUpdating={updateStatusMutation.isPending}
              onScheduleAppointment={setSchedulingInquiry}
              onStatusChange={(inquiryId, nextStatus) =>
                updateStatusMutation.mutate({
                  inquiryId,
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

      {schedulingInquiry ? (
        <AppointmentFormDialog
          key={schedulingInquiry.id}
          open
          title="Schedule appointment"
          description="Turn this inquiry into a scheduled showroom visit."
          submitLabel="Schedule appointment"
          listings={listingOptions.listings}
          allowedStatuses={['pending', 'confirmed']}
          lockCustomer
          lockListing={Boolean(schedulingInquiry.listing_id)}
          initialValues={{
            listingId: schedulingInquiry.listing_id,
            name: schedulingInquiry.name,
            phone: schedulingInquiry.phone,
            email: schedulingInquiry.email,
            message: schedulingInquiry.message,
            status: 'pending',
          }}
          isSubmitting={scheduleAppointmentMutation.isPending}
          onOpenChange={(open) => {
            if (!open) {
              setSchedulingInquiry(null)
            }
          }}
          onSubmit={async (payload) => {
            await scheduleAppointmentMutation.mutateAsync({
              inquiryId: schedulingInquiry.id,
              payload,
            })
            setSchedulingInquiry(null)
          }}
        />
      ) : null}
    </section>
  )
}

export default InquiriesPage
