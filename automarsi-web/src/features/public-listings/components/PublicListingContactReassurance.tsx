import { Clock, Phone, ShieldCheck } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'

function PublicListingContactReassurance() {
  const { messages } = useI18n()
  const reassuranceIcons = [
    <ShieldCheck className="size-4" />,
    <Phone className="size-4" />,
    <Clock className="size-4" />,
  ]

  return (
    <section className="grid gap-3 rounded-lg border bg-card p-5 text-card-foreground">
      <div>
        <h2 className="font-semibold">
          {messages.listingDetails.reassurance.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {messages.listingDetails.reassurance.description}
        </p>
      </div>

      <div className="grid gap-3">
        {messages.listingDetails.reassurance.items.map((item, index) => (
          <div key={item.title} className="flex gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-red-600">
              {reassuranceIcons[index]}
            </div>
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PublicListingContactReassurance
