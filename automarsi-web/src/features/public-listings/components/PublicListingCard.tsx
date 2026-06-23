import { Gauge, MapPin } from 'lucide-react'
import type { PublicListing } from '../types'

type PublicListingCardProps = {
  listing: PublicListing
}

function formatPrice(listing: PublicListing): string {
  const amount = Number(listing.price)

  if (Number.isNaN(amount)) {
    return `${listing.price} ${listing.currency}`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatKilometers(kilometers: number | null): string {
  if (kilometers === null) {
    return 'Mileage unavailable'
  }

  return `${new Intl.NumberFormat('en-US').format(kilometers)} km`
}

function PublicListingCard({ listing }: PublicListingCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-xs">
      <div className="aspect-[4/3] bg-muted">
        {listing.primary_image?.image_url ? (
          <img
            src={listing.primary_image.image_url}
            alt={listing.primary_image.alt_text ?? listing.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="grid gap-3 p-4">
        <div className="grid gap-1">
          <h3 className="font-semibold leading-tight">{listing.title}</h3>
          <p className="text-sm text-muted-foreground">
            {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-red-600">{formatPrice(listing)}</p>
          <p className="text-sm text-muted-foreground">{listing.year}</p>
        </div>

        <div className="grid gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5" />
            {formatKilometers(listing.kilometers)}
          </span>
          <span>
            {listing.transmission} / {listing.fuel_type}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {listing.location ?? 'Location unavailable'}
          </span>
        </div>
      </div>
    </article>
  )
}

export default PublicListingCard
