import { ArrowLeft } from 'lucide-react'
import EmptyState from '@/components/admin/EmptyState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingCreatePanel from '@/features/admin-listings/components/ListingCreatePanel'
import { useAdminToken } from '@/hooks/useAdminToken'

type ListingsCreatePageProps = {
  onNavigate: (path: string) => void
}

function ListingsCreatePage({ onNavigate }: ListingsCreatePageProps) {
  const { token, errorMessage } = useAdminToken()

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title="Add listing"
        description="Create a new vehicle listing for the dealership inventory."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => onNavigate('/admin/listings')}
          >
            <ArrowLeft />
            Back to listings
          </Button>
        }
      />

      {errorMessage ? (
        <EmptyState
          title="Could not prepare listing form"
          description={errorMessage}
        />
      ) : null}

      {!errorMessage && token ? (
        <ListingCreatePanel
          token={token}
          onCancel={() => onNavigate('/admin/listings')}
          onCreated={() => onNavigate('/admin/listings')}
        />
      ) : null}
    </section>
  )
}

export default ListingsCreatePage
