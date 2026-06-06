import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'

function InquiriesPage() {
  return (
    <section className="grid gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Customers
          </p>
          <h2 className="text-2xl font-semibold">Inquiries</h2>
        </div>
      </div>

      <DataTableShell title="Customer inquiries">
        <EmptyState
          title="No inquiries loaded yet"
          description="Next we will connect this page to the admin inquiries API."
        />
      </DataTableShell>
    </section>
  )
}

export default InquiriesPage
