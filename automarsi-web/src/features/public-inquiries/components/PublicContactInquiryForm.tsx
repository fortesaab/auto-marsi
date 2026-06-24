import { useState } from 'react'
import { toast } from 'sonner'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreatePublicInquiry } from '../hooks/useCreatePublicInquiry'

type ContactIntent =
  | 'General question'
  | 'Book a showroom visit'
  | 'Financing question'
  | 'Vehicle availability'

type ContactInquiryFormState = {
  name: string
  phone: string
  email: string
  intent: ContactIntent
  message: string
}

const initialFormState: ContactInquiryFormState = {
  name: '',
  phone: '',
  email: '',
  intent: 'General question',
  message: '',
}

const intentOptions: ContactIntent[] = [
  'General question',
  'Book a showroom visit',
  'Financing question',
  'Vehicle availability',
]

function buildMessage(formState: ContactInquiryFormState): string {
  const message = formState.message.trim()

  if (!message) {
    return `Contact page intent: ${formState.intent}`
  }

  return `Contact page intent: ${formState.intent}\n\n${message}`
}

function PublicContactInquiryForm() {
  const [formState, setFormState] =
    useState<ContactInquiryFormState>(initialFormState)

  const createInquiryMutation = useCreatePublicInquiry()

  function updateField<K extends keyof ContactInquiryFormState>(
    field: K,
    value: ContactInquiryFormState[K]
  ) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await createInquiryMutation.mutateAsync(
      {
        listing_id: null,
        name: formState.name.trim(),
        phone: formState.phone.trim(),
        email: formState.email.trim() || null,
        message: buildMessage(formState),
        source: 'contact_page',
      },
      {
        onSuccess: () => {
          setFormState(initialFormState)
          toast.success('Message sent successfully.')
        },
      },
    )
  }

  const errorMessage =
    createInquiryMutation.error instanceof Error
      ? createInquiryMutation.error.message
      : null

  return (
    <form
      onSubmit={submitInquiry}
      className="grid gap-4 rounded-lg border bg-card p-5 shadow-xs sm:p-6"
    >
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold tracking-tight">
          Send us a message
        </h2>
        <p className="text-sm text-muted-foreground">
          We usually respond within business hours.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <label className="grid gap-1.5 text-sm font-medium">
        Name
        <input
          value={formState.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
          placeholder="Your name"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Phone
        <input
          value={formState.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          required
          placeholder="+383 ..."
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Email
        <input
          value={formState.email}
          onChange={(event) => updateField('email', event.target.value)}
          type="email"
          placeholder="you@example.com"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        What can we help with?
        <select
          value={formState.intent}
          onChange={(event) =>
            updateField('intent', event.target.value as ContactIntent)
          }
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {intentOptions.map((intent) => (
            <option key={intent} value={intent}>
              {intent}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Message
        <textarea
          value={formState.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="Tell us what you are looking for..."
          rows={5}
          className="min-h-28 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <Button type="submit" disabled={createInquiryMutation.isPending}>
        <Send />
        {createInquiryMutation.isPending ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}

export default PublicContactInquiryForm