import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingCreatePanel from '@/features/admin-listings/components/ListingCreatePanel'
import { useAdminToken } from '@/hooks/useAdminToken'

type ListingsCreatePageProps = {
  onNavigate: (path: string) => void
}

function ListingsCreatePage({ onNavigate }: ListingsCreatePageProps) {
  const { isAuthReady, getAdminToken } = useAdminToken()
  const [token, setToken] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthReady) {
      return
    }

    let isMounted = true

    getAdminToken()
      .then((freshToken) => {
        if (isMounted) {
          setToken(freshToken)
          setErrorMessage(null)
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Could not prepare listing form.'
          )
        }
      })

    return () => {
      isMounted = false
    }
  }, [getAdminToken, isAuthReady])

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

      {!isAuthReady ? <LoadingState label="Preparing listing form" /> : null}

      {errorMessage ? (
        <EmptyState
          title="Could not prepare listing form"
          description={errorMessage}
        />
      ) : null}

      {isAuthReady && !errorMessage && token ? (
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