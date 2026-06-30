import { BadgeEuro, Percent, TrendingUp } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { AdminListing } from '../../types'
import { formatPrice } from './listingDetailsFormatters'

type SalesSummaryPanelProps = {
  listing: AdminListing
}

type SummaryMetricProps = {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  tone?: 'positive' | 'negative' | 'neutral'
}

function formatNullablePrice(value: string | null, currency: string) {
  return value === null ? '-' : formatPrice(value, currency)
}

function formatProfit(value: number | null, currency: string) {
  return value === null ? '-' : formatPrice(String(value), currency)
}

function formatMargin(value: number | null) {
  return value === null ? '-' : `${value}%`
}

function SummaryMetric({
  label,
  value,
  icon: Icon,
  tone = 'neutral',
}: SummaryMetricProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border bg-muted/20 p-3',
        tone === 'positive' && 'border-emerald-500/30 bg-emerald-500/10',
        tone === 'negative' && 'border-red-500/30 bg-red-500/10'
      )}
    >
      <span
        className={cn(
          'grid size-8 shrink-0 place-items-center rounded-md bg-background text-muted-foreground',
          tone === 'positive' && 'text-emerald-500',
          tone === 'negative' && 'text-red-500'
        )}
      >
        <Icon className="size-4" />
      </span>

      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={cn(
            'text-sm font-medium',
            tone === 'positive' && 'text-emerald-500',
            tone === 'negative' && 'text-red-500'
          )}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

function SalesSummaryPanel({ listing }: SalesSummaryPanelProps) {
  const profit = listing.sales_summary.profit
  const profitTone =
    profit === null || profit === 0
      ? 'neutral'
      : profit > 0
        ? 'positive'
        : 'negative'

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-base">Sale summary</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryMetric
            label="Purchase"
            value={formatNullablePrice(listing.purchase_price, listing.currency)}
            icon={BadgeEuro}
          />
          <SummaryMetric
            label="Sale"
            value={formatNullablePrice(listing.sale_price, listing.currency)}
            icon={BadgeEuro}
          />
          <SummaryMetric
            label="Expenses"
            value={formatNullablePrice(
              listing.sales_expenses,
              listing.currency
            )}
            icon={BadgeEuro}
          />
          <SummaryMetric
            label="Profit"
            value={formatProfit(profit, listing.currency)}
            icon={TrendingUp}
            tone={profitTone}
          />
          <SummaryMetric
            label="Margin"
            value={formatMargin(listing.sales_summary.margin_percent)}
            icon={Percent}
            tone={profitTone}
          />
        </div>

        {listing.sale_notes ? (
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Sale notes</p>
            <p className="mt-1 text-sm leading-6">{listing.sale_notes}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default SalesSummaryPanel
