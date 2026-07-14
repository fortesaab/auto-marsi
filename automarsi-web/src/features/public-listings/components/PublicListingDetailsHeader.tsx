import { BadgeCheck } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListing } from '../types'

type PublicListingDetailsHeaderProps = {
  listing: PublicListing
}

function PublicListingDetailsHeader({
  listing,
}: PublicListingDetailsHeaderProps) {
  const { messages } = useI18n()

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''}
          </p>

          <h1 className="max-w-3xl text-3xl font-black leading-none">
            {listing.title}
          </h1>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <BadgeCheck className="size-3.5" />
          {messages.listingDetails.activeListing}
        </div>
      </div>

      {listing.description ? (
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          {listing.description}
        </p>
      ) : (
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          {messages.listingDetails.fallbackDescription}
        </p>
      )}
    </section>
  )
}

export default PublicListingDetailsHeader
