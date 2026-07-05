import { ArrowRight, Car, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListing } from '../types'

type PublicListingCardProps = {
  listing: PublicListing
  onNavigate: (path: string) => void
}

function formatPrice(listing: PublicListing): string {
  const amount = Number(listing.price)

  if (Number.isNaN(amount)) {
    return `${listing.price} ${listing.currency}`
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatKilometers(kilometers: number | null): string {
  if (kilometers === null) {
    return 'Mileage unavailable'
  }

  return `${new Intl.NumberFormat('de-DE').format(kilometers)} km`
}

function PublicListingCard({ listing, onNavigate }: PublicListingCardProps) {
  const { messages } = useI18n()
  const transmissionLabel =
    messages.inventory.values[
      listing.transmission as keyof typeof messages.inventory.values
    ] ?? listing.transmission
  const fuelLabel =
    messages.inventory.values[
      listing.fuel_type as keyof typeof messages.inventory.values
    ] ?? listing.fuel_type

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border bg-card text-card-foreground shadow-[0_18px_45px_rgba(31,25,76,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(31,25,76,0.11)]">
      <button
        type="button"
        onClick={() => onNavigate(`/inventory/${listing.id}`)}
        className="block w-full text-left"
      >
        <div className="relative aspect-[4/3] border-b border-dashed bg-slate-200/60">
          <Badge className="absolute left-4 top-4 z-10 rounded-full bg-emerald-500 px-3 py-1 text-white shadow-md hover:bg-emerald-500">
            {messages.inventory.card.goodPrice}
          </Badge>

          <span className="absolute bottom-4 right-4 z-10 rounded-full bg-foreground/70 px-4 py-2 text-lg font-black text-white shadow-lg md:hidden">
            {formatPrice(listing)}
          </span>

          {listing.primary_image?.image_url ? (
            <img
              src={listing.primary_image.image_url}
              alt={listing.primary_image.alt_text ?? listing.title}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <div className="grid justify-items-center gap-2">
                <Car className="size-8 opacity-55" />
                <span className="text-sm">{listing.title}</span>
              </div>
            </div>
          )}
        </div>
      </button>

      <div className="grid gap-4 p-5">
        <div className="grid gap-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-black leading-tight tracking-[-0.035em]">
              {listing.title}
            </h3>
            <p className="hidden shrink-0 text-lg font-black text-primary md:block">
              {formatPrice(listing)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-3.5 fill-current" />
            ))}
          </span>
          <span className="font-semibold">4.8</span>
          <span className="text-muted-foreground">(35)</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border bg-white px-3 py-1">
            {listing.year}
          </span>
          <span className="rounded-full border bg-white px-3 py-1">
            {listing.kilometers === null
              ? messages.common.mileageUnavailable
              : formatKilometers(listing.kilometers)}
          </span>

          <span className="rounded-full border bg-white px-3 py-1 capitalize">
            {fuelLabel}
          </span>

          <span className="rounded-full border bg-white px-3 py-1 capitalize">
            {transmissionLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate(`/inventory/${listing.id}`)}
          className="mt-1 flex items-center justify-between border-t pt-4 text-sm font-semibold text-foreground transition hover:text-primary"
        >
          <span>{messages.inventory.card.viewDetails}</span>
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            {listing.body_type ?? ''}
            <ArrowRight className="size-4 text-primary" />
          </span>
        </button>
      </div>
    </article>
  )
}

export default PublicListingCard
