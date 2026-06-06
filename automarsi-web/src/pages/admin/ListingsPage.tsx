import { Plus } from 'lucide-react'
import DataTableShell from '../../components/admin/DataTableShell'
import EmptyState from '../../components/admin/EmptyState'
import { Button } from '@/components/ui/button'

function ListingsPage() {
  return (
    <section className="grid gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Inventory
          </p>
          <h2 className="text-2xl font-semibold">Listings</h2>
        </div>

        <Button type="button">
          <Plus />
          Add listing
        </Button>
      </div>

      <DataTableShell title="Car listings">
        <EmptyState
          title="No listings loaded yet"
          description="The table shell is ready. Next we will connect it to the admin listings API."
        />
      </DataTableShell>
    </section>
  )
}

export default ListingsPage
