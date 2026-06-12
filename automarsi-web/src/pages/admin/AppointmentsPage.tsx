import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'

function AppointmentsPage() {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Schedule
          </p>
          <h2 className="text-2xl font-semibold">Appointments</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review test drives, visits, and scheduled customer follow-ups.
          </p>
        </div>
      </div>

      <DataTableShell
        title="Appointments"
        description="Scheduled visits will appear here after the API is connected."
      >
        <EmptyState
          title="No appointments loaded yet"
          description="Next we will connect this page to the admin appointments API."
        />
      </DataTableShell>
    </section>
  )
}

export default AppointmentsPage
