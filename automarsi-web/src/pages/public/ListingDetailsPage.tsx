import { ArrowLeft, SearchX } from 'lucide-react'
import PublicEmptyState from '@/components/public/PublicEmptyState'
import PublicSection from '@/components/public/PublicSection'
import { Button } from '@/components/ui/button'
import PublicListingContactReassurance from '@/features/public-listings/components/PublicListingContactReassurance'
import PublicListingDetailsHeader from '@/features/public-listings/components/PublicListingDetailsHeader'
import PublicListingFeatures from '@/features/public-listings/components/PublicListingFeatures'
import PublicListingGallery from '@/features/public-listings/components/PublicListingGallery'
import PublicListingSpecs from '@/features/public-listings/components/PublicListingSpecs'
import PublicListingInquiryForm from '@/features/public-listings/components/PublicListingInquiryForm'
import PublicListingMobileCta from '@/features/public-listings/components/PublicListingMobileCta'
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
      <PublicSection>
        <div className="rounded-2xl border bg-card p-8 text-sm text-muted-foreground shadow-[0_18px_45px_rgba(31,25,76,0.06)]">
          {messages.listingDetails.loading}
        </div>
      </PublicSection>
    )
  }

  if (errorMessage || !listing) {
    return (
      <PublicEmptyState
        icon={SearchX}
        eyebrow={messages.listingDetails.unavailableEyebrow}
        title={messages.listingDetails.unavailableTitle}
        description={messages.listingDetails.unavailableDescription}
        primaryActionLabel={messages.listingDetails.viewAvailableInventory}
        primaryActionPath="/inventory"
        secondaryActionLabel={messages.nav.contact}
        secondaryActionPath="/contact"
        onNavigate={onNavigate}
      />
    )
  }

  return (
    <PublicSection className="pt-0 md:pt-12">
      <div className="grid gap-5">
      <div className="hidden md:block">
        <BackToInventoryButton onNavigate={onNavigate} />
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid min-w-0 gap-5">
          <PublicListingGallery listing={listing} />
          <PublicListingDetailsHeader listing={listing} />
          <PublicListingFeatures features={listing.features} />
        </div>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-20">
          <PublicListingSpecs listing={listing} />
          <div id="listing-inquiry">
            <PublicListingInquiryForm listingId={listing.id} />
          </div>
          <PublicListingContactReassurance />
        </aside>
      </div>
      </div>

      <PublicListingMobileCta
        onContactClick={() =>
          document
            .getElementById('listing-inquiry')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      />
    </PublicSection>
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
