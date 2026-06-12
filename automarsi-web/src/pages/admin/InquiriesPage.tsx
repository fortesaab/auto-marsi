import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'

function InquiriesPage() {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Customers
          </p>
          <h2 className="text-2xl font-semibold">Inquiries</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Track buyer messages and follow-up status from one place.
          </p>
        </div>
      </div>

      <DataTableShell
        title="Customer inquiries"
        description="Incoming customer interest will appear here after the API is connected."
      >
        <EmptyState
          title="No inquiries loaded yet"
          description="Next we will connect this page to the admin inquiries API."
        />
      </DataTableShell>
    </section>
  )
}

export default InquiriesPage
