import {
  ArrowLeft,
  CheckCircle2,
  Images,
  Pencil,
  Send,
} from 'lucide-react'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingDetails from '@/features/admin-listings/components/ListingDetails'
import ListingWorkflowSteps from '@/features/admin-listings/components/ListingWorkflowSteps'
import { useAdminListing } from '@/features/admin-listings/hooks/useAdminListing'
import { usePublishListing } from '@/features/admin-listings/hooks/usePublishListing'

type ListingViewPageProps = {
  listingId: string
  onNavigate: (path: string) => void
}

function ListingViewPage({ listingId, onNavigate }: ListingViewPageProps) {
  const { listing, listingQuery, errorMessage } = useAdminListing({ listingId })
  const publishMutation = usePublishListing({ listingId })
  const isPublished = listing?.status === 'active'
  const canPublish = Boolean(listing && listing.images.length > 0)

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title={listing?.title ?? `Listing #${listingId}`}
        description={
          isPublished
            ? 'This listing is published and visible to customers.'
            : 'Review the vehicle details and images before publishing.'
        }
        action={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/admin/listings')}
            >
              <ArrowLeft />
              Back to listings
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate(`/admin/listings/${listingId}/images`)}
            >
              <Images />
              Manage images
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onNavigate(`/admin/listings/${listingId}/edit`)
              }
            >
              <Pencil />
              Edit details
            </Button>

            {isPublished ? (
              <Button type="button" disabled>
                <CheckCircle2 />
                Published
              </Button>
            ) : (
              <Button
                type="button"
                disabled={!canPublish || publishMutation.isPending}
                title={
                  canPublish
                    ? 'Publish listing'
                    : 'Upload at least one image before publishing'
                }
                onClick={() => publishMutation.mutate()}
              >
                <Send />
                {publishMutation.isPending
                  ? 'Publishing...'
                  : 'Publish listing'}
              </Button>
            )}
          </div>
        }
      />

      <div className="rounded-lg border bg-card p-4">
        <ListingWorkflowSteps
          currentStep="review"
          completed={isPublished}
        />
      </div>

      {listing && !isPublished && listing.images.length === 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950">
          <p className="text-sm">
            Upload at least one vehicle image before publishing.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onNavigate(`/admin/listings/${listingId}/images`)
            }
          >
            <Images />
            Add images
          </Button>
        </div>
      ) : null}

      {listingQuery.isLoading ? (
        <LoadingState label="Loading listing details" />
      ) : null}

      {!listingQuery.isLoading && errorMessage ? (
        <EmptyState
          title="Could not load listing"
          description={errorMessage}
        />
      ) : null}

      {!listingQuery.isLoading && !errorMessage && listing ? (
        <ListingDetails listing={listing} />
      ) : null}
    </section>
  )
}

export default ListingViewPage
