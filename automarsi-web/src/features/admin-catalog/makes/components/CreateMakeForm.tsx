import { useState } from 'react'
import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'

type CreateMakeFormProps = {
  isSubmitting: boolean
  errorMessage: string | null
  onSubmit: (payload: { name: string; logo_url: string | null }) => Promise<void>
}

function CreateMakeForm({
  isSubmitting,
  errorMessage,
  onSubmit,
}: CreateMakeFormProps) {
  const [name, setName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await onSubmit({
      name,
      logo_url: logoUrl.trim() ? logoUrl : null,
    })

    setName('')
    setLogoUrl('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border bg-card p-4"
    >
      <div>
        <h3 className="text-base font-semibold">Add make</h3>
        <p className="text-sm text-muted-foreground">
          Add a vehicle brand before creating models and listings.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="BMW"
            required
          />
        </FormField>

        <FormField label="Logo URL">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={logoUrl}
            onChange={(event) => setLogoUrl(event.target.value)}
            placeholder="https://example.com/logo.svg"
          />
        </FormField>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create make'}
        </Button>
      </div>
    </form>
  )
}

export default CreateMakeForm