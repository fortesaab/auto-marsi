import {
  ArrowRight,
  BadgeCheck,
  Car,
  MessageSquare,
  ShieldCheck,
  Users,
} from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'

type AboutPageProps = {
  onNavigate: (path: string) => void
}

function AboutPage({ onNavigate }: AboutPageProps) {
  const { messages } = useI18n()
  const principleIcons = [
    <ShieldCheck className="size-4" />,
    <MessageSquare className="size-4" />,
    <Users className="size-4" />,
  ]

  return (
    <div className="grid gap-10">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.5fr)] lg:items-center lg:px-8">
        <div className="grid max-w-3xl gap-5">
          <SectionHeader
            eyebrow={messages.about.eyebrow}
            title={messages.about.title}
            description={messages.about.description}
          />

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {messages.about.body}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => onNavigate('/inventory')}>
              {messages.about.browseVehicles}
              <ArrowRight className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/contact')}
            >
              {messages.about.contactTeam}
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-red-600">
            {messages.about.mattersEyebrow}
          </p>

          <div className="mt-4 grid gap-4">
            {messages.about.principles.map((principle, index) => (
              <div key={principle.title} className="flex gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                  {principleIcons[index]}
                </div>

                <div>
                  <h3 className="text-sm font-semibold">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 rounded-xl border bg-card p-6 md:grid-cols-[280px_1fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase text-red-600">
              {messages.about.processEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {messages.about.processTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {messages.about.processDescription}
            </p>
          </div>

          <div className="grid gap-4">
            {messages.about.processSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                  {index + 1}
                </div>

                <div className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 rounded-xl bg-slate-950 p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-red-300">
              <BadgeCheck className="size-4" />
              <p className="text-xs font-semibold uppercase">
                {messages.about.ctaEyebrow}
              </p>
            </div>

            <h2 className="text-2xl font-semibold">
              {messages.about.ctaTitle}
            </h2>

            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              {messages.about.ctaDescription}
            </p>
          </div>

          <Button type="button" onClick={() => onNavigate('/inventory')}>
            {messages.about.viewInventory}
            <Car className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
