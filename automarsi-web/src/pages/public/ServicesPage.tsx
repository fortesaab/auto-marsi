import {
  ArrowRight,
  BadgeCheck,
  Car,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  MessageSquare,
  Wrench,
} from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'

type ServicesPageProps = {
  onNavigate: (path: string) => void
}

function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { messages } = useI18n()
  const serviceIcons = [
    <Car className="size-5" />,
    <ClipboardCheck className="size-5" />,
    <Handshake className="size-5" />,
    <BadgeCheck className="size-5" />,
    <FileCheck2 className="size-5" />,
    <Wrench className="size-5" />,
  ]

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid max-w-3xl gap-4">
        <SectionHeader
          eyebrow={messages.services.eyebrow}
          title={messages.services.title}
          description={messages.services.description}
        />

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => onNavigate('/inventory')}>
            {messages.services.browseCars}
            <ArrowRight className="size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onNavigate('/contact')}
          >
            {messages.services.contactUs}
          </Button>
        </div>
      </div>

      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {messages.services.items.map((service, index) => (
          <article key={service.title} className="flex gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
              {serviceIcons[index]}
            </div>

            <div>
              <h2 className="font-semibold">{service.title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-xl bg-slate-950 p-6 text-white sm:p-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-red-300">
              <MessageSquare className="size-4" />
              <p className="text-xs font-semibold uppercase">
                {messages.services.needHelp}
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-semibold">
              {messages.services.askBeforeVisit}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {messages.services.helpDescription}
            </p>
          </div>

          <Button type="button" onClick={() => onNavigate('/contact')}>
            {messages.services.sendInquiry}
          </Button>
        </div>
      </section>
    </section>
  )
}

export default ServicesPage
