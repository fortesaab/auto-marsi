import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PublicListingContactReassurance from '@/features/public-listings/components/PublicListingContactReassurance'
import PublicListingDetailsHeader from '@/features/public-listings/components/PublicListingDetailsHeader'
import PublicListingFeatures from '@/features/public-listings/components/PublicListingFeatures'
import PublicListingGallery from '@/features/public-listings/components/PublicListingGallery'
import PublicListingSpecs from '@/features/public-listings/components/PublicListingSpecs'
import PublicListingInquiryForm from '@/features/public-listings/components/PublicListingInquiryForm'
import { usePublicListing } from '@/features/public-listings/hooks/usePublicListing'
import { useI18n } from '@/i18n/useI18n'

type ListingDetailsPageProps = {
  listingId: number
  onNavigate: (path: string) => void
}

function ListingDetailsPage({
  listingId,
  onNavigate,
}: ListingDetailsPageProps) {
  const { messages } = useI18n()
  const { listing, listingQuery, errorMessage } = usePublicListing({
    listingId,
  })

  if (listingQuery.isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border bg-card p-8 text-sm text-muted-foreground">
          {messages.listingDetails.loading}
        </div>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <BackToInventoryButton onNavigate={onNavigate} />

        <div className="grid gap-3 rounded-xl border bg-card p-8">
          <p className="font-medium">{messages.listingDetails.couldNotLoad}</p>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => listingQuery.refetch()}
          >
            {messages.common.tryAgain}
          </Button>
        </div>
      </section>
    )
  }

  if (!listing) {
    return (
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <BackToInventoryButton onNavigate={onNavigate} />

        <div className="rounded-xl border bg-card p-8 text-sm text-muted-foreground">
          {messages.listingDetails.notFound}
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
      <BackToInventoryButton onNavigate={onNavigate} />

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid min-w-0 gap-5">
          <PublicListingGallery listing={listing} />
          <PublicListingDetailsHeader listing={listing} />
          <PublicListingFeatures features={listing.features} />
        </div>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-20">
          <PublicListingSpecs listing={listing} />
          <PublicListingInquiryForm listingId={listing.id} />
          <PublicListingContactReassurance />
        </aside>
      </div>
    </section>
  )
}

type BackToInventoryButtonProps = {
  onNavigate: (path: string) => void
}

function BackToInventoryButton({ onNavigate }: BackToInventoryButtonProps) {
  const { messages } = useI18n()

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-fit px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
      onClick={() => onNavigate('/inventory')}
    >
      <ArrowLeft className="size-4" />
      {messages.listingDetails.backToInventory}
    </Button>
  )
}

export default ListingDetailsPage
