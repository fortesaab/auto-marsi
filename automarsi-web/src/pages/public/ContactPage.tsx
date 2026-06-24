import type { ReactNode } from 'react'
import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import PublicContactInquiryForm from '@/features/public-inquiries/components/PublicContactInquiryForm'

function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Contact"
        title="Talk to AutoMarsi."
        description="Ask about a vehicle, showroom visit, financing, or availability. Your message goes directly into the AutoMarsi admin lead flow."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)]">
        <div className="grid h-fit gap-4">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold">Showroom details</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Send us a message and the team will follow up. Public customers
              do not create appointments directly; the AutoMarsi team schedules
              visits from the admin dashboard.
            </p>

            <div className="mt-6 grid gap-4">
              <ContactInfoItem
                icon={<Phone className="size-4" />}
                label="Phone"
                value="+383 44 123 456"
              />

              <ContactInfoItem
                icon={<Mail className="size-4" />}
                label="Email"
                value="info@automarsi.com"
              />

              <ContactInfoItem
                icon={<MapPin className="size-4" />}
                label="Location"
                value="Prishtina, Kosovo"
              />

              <ContactInfoItem
                icon={<Clock className="size-4" />}
                label="Response time"
                value="Usually within business hours"
              />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/40 p-6">
            <div className="flex gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-md bg-background text-red-600">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold">A clear buying process</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Every message becomes an inquiry in the admin dashboard,
                  where the team can answer, follow up, and schedule a showroom
                  visit when needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <PublicContactInquiryForm />
      </div>
    </section>
  )
}

type ContactInfoItemProps = {
  icon: ReactNode
  label: string
  value: string
}

function ContactInfoItem({ icon, label, value }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border bg-background text-muted-foreground">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

export default ContactPage
