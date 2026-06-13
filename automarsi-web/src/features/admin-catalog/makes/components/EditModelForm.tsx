import { useState } from 'react'
import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'
import type { AdminModel } from '../types'

type EditModelFormProps = {
  model: AdminModel
  isSubmitting: boolean
  errorMessage: string | null
  onCancel: () => void
  onSubmit: (payload: { name: string }) => Promise<void>
}

function EditModelForm({
  model,
  isSubmitting,
  errorMessage,
  onCancel,
  onSubmit,
}: EditModelFormProps) {
  const [name, setName] = useState(model.name)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await onSubmit({ name })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border bg-card p-4"
    >
      <div>
        <h3 className="text-base font-semibold">Edit model</h3>
        <p className="text-sm text-muted-foreground">
          Rename or correct this model.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <FormField label="Model name">
        <input
          className="h-9 rounded-md border bg-background px-3 text-sm"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </FormField>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}

export default EditModelForm