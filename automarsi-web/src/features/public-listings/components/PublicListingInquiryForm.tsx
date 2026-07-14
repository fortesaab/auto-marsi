import { useState } from 'react'
import { toast } from 'sonner'
import { Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreatePublicInquiry } from '@/features/public-inquiries/hooks/useCreatePublicInquiry'
import { useI18n } from '@/i18n/useI18n'

type PublicListingInquiryFormProps = {
  listingId: number
}

type InquiryIntent = 'question' | 'viewing' | 'financing'

type InquiryFormState = {
  name: string
  phone: string
  email: string
  intent: InquiryIntent
  message: string
}

const initialFormState: InquiryFormState = {
  name: '',
  phone: '',
  email: '',
  intent: 'question',
  message: '',
}

const inputClassName =
  'h-11 rounded-md border border-input bg-white/[0.04] px-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30'

function PublicListingInquiryForm({ listingId }: PublicListingInquiryFormProps) {
  const { messages } = useI18n()
  const [formState, setFormState] = useState<InquiryFormState>(initialFormState)
  const createInquiryMutation = useCreatePublicInquiry()

  function updateField(field: keyof InquiryFormState, value: string) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const intentLabels: Record<InquiryIntent, string> = {
      question: messages.listingDetails.inquiry.askQuestion,
      viewing: messages.listingDetails.inquiry.bookViewing,
      financing: messages.listingDetails.inquiry.discussFinancing,
    }
    const intentLabel = intentLabels[formState.intent]

    const message = [
      `Intent: ${intentLabel}`,
      '',
      formState.message ? `Customer message: ${formState.message}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      await createInquiryMutation.mutateAsync({
        listing_id: listingId,
        name: formState.name,
        phone: formState.phone,
        email: formState.email || null,
        message,
        source: 'listing_details',
      })

      setFormState(initialFormState)
      toast.success(messages.listingDetails.inquiry.successToast)
    } catch {
      // Inline error state below handles the message.
    }
  }

  const errorMessage =
    createInquiryMutation.error instanceof Error
      ? createInquiryMutation.error.message
      : null

  return (
    <form
      onSubmit={submitInquiry}
      className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.05] p-5 text-card-foreground shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl"
    >
      <div>
        <h2 className="text-lg font-semibold">
          {messages.listingDetails.inquiry.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {messages.listingDetails.inquiry.description}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {messages.listingDetails.inquiry.responseTime}
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <label className="grid gap-1.5 text-sm font-medium">
        {messages.common.name}
        <input
          value={formState.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
          placeholder={messages.common.name}
          className={inputClassName}
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        {messages.common.phone}
        <input
          value={formState.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          required
          placeholder="+383 ..."
          className={inputClassName}
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        {messages.common.email}
        <input
          value={formState.email}
          onChange={(event) => updateField('email', event.target.value)}
          type="email"
          placeholder="you@example.com"
          className={inputClassName}
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        {messages.listingDetails.inquiry.intentLabel}
        <select
          value={formState.intent}
          onChange={(event) =>
            updateField('intent', event.target.value as InquiryIntent)
          }
          className={inputClassName}
        >
          <option value="question">
            {messages.listingDetails.inquiry.askQuestion}
          </option>
          <option value="viewing">
            {messages.listingDetails.inquiry.bookViewing}
          </option>
          <option value="financing">
            {messages.listingDetails.inquiry.discussFinancing}
          </option>
        </select>
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        {messages.common.message}
        <textarea
          value={formState.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder={messages.listingDetails.inquiry.messagePlaceholder}
          rows={4}
          className="min-h-28 resize-none rounded-md border border-input bg-white/[0.04] px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30"
        />
      </label>

      <Button type="submit" disabled={createInquiryMutation.isPending}>
        <Send className="size-4" />
        {createInquiryMutation.isPending
          ? messages.common.sending
          : messages.listingDetails.inquiry.send}
      </Button>
    </form>
  )
}

export default PublicListingInquiryForm
