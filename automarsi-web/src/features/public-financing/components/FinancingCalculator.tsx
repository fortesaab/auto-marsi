import { Calculator, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  calculateMonthlyPayment,
  formatCurrency,
} from '@/features/public-financing/utils/financingCalculator'
import { useI18n } from '@/i18n/useI18n'

type FinancingCalculatorProps = {
  onAskAboutEstimate: () => void
}

function FinancingCalculator({ onAskAboutEstimate }: FinancingCalculatorProps) {
  const { messages } = useI18n()
  const [vehiclePrice, setVehiclePrice] = useState(25000)
  const [downPayment, setDownPayment] = useState(5000)
  const [months, setMonths] = useState(60)
  const [annualRate, setAnnualRate] = useState(6)

  const monthlyPayment = useMemo(
    () =>
      calculateMonthlyPayment({
        vehiclePrice,
        downPayment,
        months,
        annualRate,
      }),
    [vehiclePrice, downPayment, months, annualRate],
  )

  const financedAmount = Math.max(vehiclePrice - downPayment, 0)

  return (
    <aside className="rounded-xl border bg-card p-4 shadow-sm lg:sticky lg:top-24">
      <div className="mb-4 flex items-start gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
          <Calculator className="size-4" />
        </div>

        <div>
          <h2 className="font-semibold">
            {messages.financing.calculator.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {messages.financing.calculator.description}
          </p>
        </div>
      </div>

      <div className="mb-4 rounded-xl bg-slate-950 p-4 text-white">
        <p className="text-xs font-medium uppercase text-slate-300">
          {messages.financing.calculator.estimatedMonthly}
        </p>
        <p className="mt-1 text-3xl font-semibold">
          {formatCurrency(monthlyPayment)}
        </p>
        <p className="mt-1 text-xs text-slate-300">
          {messages.financing.calculator.financedAmount}:{' '}
          {formatCurrency(financedAmount)}
        </p>
      </div>

      <div className="grid gap-3">
        <label className="grid gap-1.5 text-sm font-medium">
          {messages.financing.calculator.vehiclePrice}
          <input
            type="number"
            min="0"
            value={vehiclePrice}
            onChange={(event) => setVehiclePrice(Number(event.target.value))}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-medium">
          {messages.financing.calculator.downPayment}
          <input
            type="number"
            min="0"
            max={vehiclePrice}
            value={downPayment}
            onChange={(event) => setDownPayment(Number(event.target.value))}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm"
          />
          <input
            type="range"
            min="0"
            max={vehiclePrice}
            step="500"
            value={downPayment}
            onChange={(event) => setDownPayment(Number(event.target.value))}
            className="w-full accent-red-600"
          />
        </label>

        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          <label className="grid min-w-0 gap-1.5 text-sm font-medium">
            {messages.financing.calculator.term}
            <select
              value={months}
              onChange={(event) => setMonths(Number(event.target.value))}
              className="h-9 w-full min-w-0 rounded-lg border bg-background px-3 text-sm"
            >
              <option value={36}>
                36 {messages.financing.calculator.months}
              </option>
              <option value={48}>
                48 {messages.financing.calculator.months}
              </option>
              <option value={60}>
                60 {messages.financing.calculator.months}
              </option>
              <option value={72}>
                72 {messages.financing.calculator.months}
              </option>
            </select>
          </label>

          <label className="grid min-w-0 gap-1.5 text-sm font-medium">
            {messages.financing.calculator.rate}
            <input
              type="number"
              min="0"
              step="0.1"
              value={annualRate}
              onChange={(event) => setAnnualRate(Number(event.target.value))}
              className="h-9 w-full min-w-0 rounded-lg border bg-background px-3 text-sm"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t pt-3">
        <p className="text-xs leading-5 text-muted-foreground">
          {messages.financing.calculator.note}
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="justify-center"
          onClick={onAskAboutEstimate}
        >
          <MessageCircle className="size-4" />
          {messages.financing.calculator.askAboutEstimate}
        </Button>
      </div>
    </aside>
  )
}

export default FinancingCalculator
