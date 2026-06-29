import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'

type FinancingCtaProps = {
  onNavigate: (path: string) => void
}

function FinancingCta({ onNavigate }: FinancingCtaProps) {
  const { messages } = useI18n()

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid gap-5 rounded-lg bg-slate-950 p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-2">
          <p className="text-xs font-semibold uppercase text-red-400">
            {messages.financing.cta.eyebrow}
          </p>
          <h2 className="text-2xl font-semibold">
            {messages.financing.cta.title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            {messages.financing.cta.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => onNavigate('/inventory')}>
            {messages.financing.cta.viewInventory}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            onClick={() => onNavigate('/contact')}
          >
            {messages.financing.cta.contactTeam}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FinancingCta
