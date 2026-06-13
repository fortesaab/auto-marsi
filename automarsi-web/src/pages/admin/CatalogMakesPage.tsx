import { useAuth } from '@clerk/clerk-react'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import { createAdminMake } from '@/features/admin-catalog/makes/api/createAdminMake'
import { getAdminMakes } from '@/features/admin-catalog/makes/api/getAdminMakes'
import CreateMakeForm from '@/features/admin-catalog/makes/components/CreateMakeForm'
import MakesTable from '@/features/admin-catalog/makes/components/MakesTable'
import type { AdminMake } from '@/features/admin-catalog/makes/types'

function CatalogMakesPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [makes, setMakes] = useState<AdminMake[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function getAuthToken() {
    const token = await getToken()

    if (!token) {
      throw new Error('Please sign in again.')
    }

    return token
  }

  async function loadMakes() {
    if (!isLoaded || !isSignedIn) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const token = await getAuthToken()
      const data = await getAdminMakes({ token })

      setMakes(data)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to load makes.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreateMake(payload: {
    name: string
    logo_url: string | null
  }) {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const token = await getAuthToken()

      await createAdminMake({
        token,
        payload,
      })

      setIsCreateOpen(false)
      await loadMakes()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to create make.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    void loadMakes()
  }, [isLoaded, isSignedIn])

  const hasMakes = makes.length > 0

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Catalog"
        title="Makes"
        description="Manage vehicle brands used when creating listings."
        action={
          <Button
            type="button"
            onClick={() => setIsCreateOpen((isOpen) => !isOpen)}
          >
            <Plus />
            {isCreateOpen ? 'Close' : 'Add make'}
          </Button>
        }
      />

      {isCreateOpen ? (
        <CreateMakeForm
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          onSubmit={handleCreateMake}
        />
      ) : null}

      <DataTableShell
        title="Vehicle makes"
        description="Brands like BMW, Mercedes-Benz, Audi, Volkswagen, and Toyota."
      >
        {isLoading ? <LoadingState label="Loading makes" /> : null}

        {!isLoading && errorMessage && !isCreateOpen ? (
          <EmptyState
            title="Could not load makes"
            description={errorMessage}
          />
        ) : null}

        {!isLoading && !errorMessage && !hasMakes ? (
          <EmptyState
            title="No makes found"
            description="Add the first make, then create models under that brand."
          />
        ) : null}

        {!isLoading && hasMakes ? <MakesTable makes={makes} /> : null}
      </DataTableShell>
    </section>
  )
}

export default CatalogMakesPage