import { ArrowLeft, ArrowRight, ImageOff } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingImageCard from '@/features/admin-listings/components/ListingImageCard'
import ListingImageUploader from '@/features/admin-listings/components/ListingImageUploader'
import ListingWorkflowSteps from '@/features/admin-listings/components/ListingWorkflowSteps'
import { useAdminListingImages } from '@/features/admin-listings/hooks/useAdminListingImages'

type ListingImagesPageProps = {
  listingId: string
  onNavigate: (path: string) => void
}

function ListingImagesPage({ listingId, onNavigate }: ListingImagesPageProps) {
  const {
    images,
    imagesQuery,
    uploadMutation,
    updateImageMutation,
    setPrimaryMutation,
    deleteImageMutation,
    errorMessage,
  } = useAdminListingImages({ listingId })

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Media"
        title={`Images for listing #${listingId}`}
        description="Manage gallery order, alt text, primary image, and uploads."
        action={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onNavigate(`/admin/listings/${listingId}/edit`)
              }
            >
              <ArrowLeft />
              Back to details
            </Button>

            <Button
              type="button"
              onClick={() => onNavigate(`/admin/listings/${listingId}`)}
            >
              Review listing
              <ArrowRight />
            </Button>
          </div>
        }
      />

      <div className="rounded-lg border bg-card p-4">
        <ListingWorkflowSteps currentStep="images" />
      </div>

      <DataTableShell
        title="Listing images"
        description={`${images.length} image${
          images.length === 1 ? '' : 's'
        } in this gallery.`}
      >
        <ListingImageUploader
          isUploading={uploadMutation.isPending}
          onUpload={async (files) => {
            await uploadMutation.mutateAsync(files)
          }}
        />

        {imagesQuery.isLoading ? (
          <LoadingState label="Loading listing images" />
        ) : null}

        {!imagesQuery.isLoading && errorMessage ? (
          <EmptyState title="Could not manage images" description={errorMessage} />
        ) : null}

        {!imagesQuery.isLoading && !errorMessage && images.length === 0 ? (
          <div className="grid min-h-56 place-items-center p-8 text-center">
            <div className="grid max-w-md justify-items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg border bg-muted/50 text-muted-foreground">
                <ImageOff className="size-4" />
              </span>
              <h3 className="text-base font-medium">No images uploaded</h3>
              <p className="text-sm text-muted-foreground">
                Choose several vehicle photos above and upload them together.
              </p>
            </div>
          </div>
        ) : null}

        {!imagesQuery.isLoading && images.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {images.map((image) => (
              <ListingImageCard
                key={image.id}
                image={image}
                isSettingPrimary={
                  setPrimaryMutation.isPending &&
                  setPrimaryMutation.variables === image.id
                }
                isUpdating={
                  updateImageMutation.isPending &&
                  updateImageMutation.variables?.imageId === image.id
                }
                isDeleting={
                  deleteImageMutation.isPending &&
                  deleteImageMutation.variables === image.id
                }
                onSetPrimary={async (imageId) => {
                  await setPrimaryMutation.mutateAsync(imageId)
                }}
                onUpdate={async (imageId, payload) => {
                  await updateImageMutation.mutateAsync({
                    imageId,
                    payload,
                  })
                }}
                onDelete={async (imageId) => {
                  await deleteImageMutation.mutateAsync(imageId)
                }}
              />
            ))}
          </div>
        ) : null}
      </DataTableShell>
    </section>
  )
}

export default ListingImagesPage
