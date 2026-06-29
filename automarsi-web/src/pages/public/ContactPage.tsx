import type { ReactNode } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import PublicContactInquiryForm from '@/features/public-inquiries/components/PublicContactInquiryForm'
import { useI18n } from '@/i18n/useI18n'

function ContactPage() {
  const { messages } = useI18n()
  const contactDetails = [
    {
      icon: <Phone className="size-4" />,
      label: messages.common.phone,
      value: messages.contact.phone,
    },
    {
      icon: <Mail className="size-4" />,
      label: messages.common.email,
      value: messages.contact.email,
    },
    {
      icon: <MapPin className="size-4" />,
      label: messages.contact.locationLabel,
      value: messages.contact.location,
    },
    {
      icon: <Clock className="size-4" />,
      label: messages.contact.response,
      value: messages.contact.responseValue,
    },
  ]

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,0.6fr)] lg:items-start">
        <div className="grid gap-6">
          <SectionHeader
            eyebrow={messages.contact.eyebrow}
            title={messages.contact.title}
            description={messages.contact.description}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {contactDetails.map((detail) => (
              <ContactDetailItem
                key={detail.label}
                icon={detail.icon}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>

          <div className="rounded-xl bg-slate-950 p-5 text-white">
            <p className="text-xs font-semibold uppercase text-red-300">
              {messages.contact.nextEyebrow}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {messages.contact.nextDescription}
            </p>
          </div>
        </div>

        <PublicContactInquiryForm />
      </div>
    </section>
  )
}

type ContactDetailItemProps = {
  icon: ReactNode
  label: string
  value: string
}

function ContactDetailItem({ icon, label, value }: ContactDetailItemProps) {
  return (
    <div className="flex gap-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

export default ContactPage
