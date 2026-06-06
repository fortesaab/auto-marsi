import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'

function AppointmentsPage() {
  return (
    <section className="grid gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Schedule
          </p>
          <h2 className="text-2xl font-semibold">Appointments</h2>
        </div>
      </div>

      <DataTableShell title="Appointments">
        <EmptyState
          title="No appointments loaded yet"
          description="Next we will connect this page to the admin appointments API."
        />
      </DataTableShell>
    </section>
  )
}

export default AppointmentsPage
