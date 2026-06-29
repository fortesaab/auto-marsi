import {
  ArrowRight,
  Car,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import StatBand from '@/components/public/StatBand'
import { Button } from '@/components/ui/button'
import FeaturedListingsSection from '@/features/public-listings/components/FeaturedListingsSection'
import { useI18n } from '@/i18n/useI18n'

type HomePageProps = {
  onNavigate: (path: string) => void
}

function HomePage({ onNavigate }: HomePageProps) {
  const { messages } = useI18n()
  const trustIcons = [
    <ShieldCheck className="size-4" />,
    <MessageSquare className="size-4" />,
    <Wrench className="size-4" />,
  ]

  return (
    <div className="grid gap-12">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid max-w-3xl gap-5">
            <p className="text-xs font-semibold uppercase text-red-400">
              AutoMarsi
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              {messages.home.heroTitle}
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              {messages.home.heroDescription}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => onNavigate('/inventory')}>
                {messages.home.browseInventory}
                <ArrowRight className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                onClick={() => onNavigate('/contact')}
              >
                {messages.home.contactTeam}
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 text-sm text-slate-300">
              <span>{messages.contact.location}</span>
              <span className="hidden text-slate-600 sm:inline">/</span>
              <span>{messages.home.selectedActiveVehicles}</span>
              <span className="hidden text-slate-600 sm:inline">/</span>
              <span>{messages.home.showroomFollowUp}</span>
            </div>
          </div>
        </div>
      </section>

      <FeaturedListingsSection onNavigate={onNavigate} />

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow={messages.home.whyEyebrow}
            title={messages.home.whyTitle}
            description={messages.home.whyDescription}
          />

          <div className="grid gap-3">
            {messages.home.trustItems.map((item, index) => (
              <div key={item.title} className="flex gap-3 rounded-lg border p-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                  {trustIcons[index]}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <StatBand
          items={[
            {
              value: '150+',
              label: messages.home.stats.vehicles,
              icon: <Car className="size-5" />,
            },
            {
              value: '10+',
              label: messages.home.stats.years,
              icon: <ShieldCheck className="size-5" />,
            },
            {
              value: '2,000+',
              label: messages.home.stats.conversations,
              icon: <Sparkles className="size-5" />,
            },
            {
              value: '100%',
              label: messages.home.stats.flow,
              icon: <Wrench className="size-5" />,
            },
          ]}
        />
      </section>
    </div>
  )
}

export default HomePage
