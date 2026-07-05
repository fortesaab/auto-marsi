import DataTableShell from '@/components/admin/DataTableShell'
import PageHeader from '@/components/admin/PageHeader'
import SiteMediaUploader from '@/features/site-media/components/SiteMediaUploader'
import { useAdminSiteMedia } from '@/features/site-media/hooks/useAdminSiteMedia'

const ABOUT_MEDIA_KEY = 'about_showroom'
const HOME_HERO_MEDIA_KEY = 'home_hero'

function SiteMediaPage() {
  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Website"
        title="Site media"
        description="Manage public website images without changing code."
      />

      <SiteMediaManager
        mediaKey={HOME_HERO_MEDIA_KEY}
        title="Home hero image"
        description="Shown as the first large image on the public Home page."
        emptyLabel="No Home hero image uploaded yet."
        galleryTitle="Home hero image"
        uploadLabel="Upload hero image"
      />

      <SiteMediaManager
        mediaKey={ABOUT_MEDIA_KEY}
        title="About page image"
        description="Shown in the story section on the public About page."
        emptyLabel="No About images uploaded yet."
        galleryTitle="About carousel images"
        uploadLabel="Upload image"
      />
    </section>
  )
}

type SiteMediaManagerProps = {
  mediaKey: string
  title: string
  description: string
  emptyLabel: string
  galleryTitle: string
  uploadLabel: string
}

function SiteMediaManager({
  mediaKey,
  title,
  description,
  emptyLabel,
  galleryTitle,
  uploadLabel,
}: SiteMediaManagerProps) {
  const { mediaItems, mediaQuery, updateMediaMutation, errorMessage } =
    useAdminSiteMedia(mediaKey)

  return (
    <DataTableShell title={title} description={description}>
      {mediaQuery.isLoading ? (
          <div className="p-5 text-sm text-muted-foreground">
            Loading image...
          </div>
      ) : (
        <SiteMediaUploader
          mediaItems={mediaItems}
          isSubmitting={updateMediaMutation.isPending}
          errorMessage={errorMessage}
          emptyLabel={emptyLabel}
          galleryTitle={galleryTitle}
          uploadLabel={uploadLabel}
          onSubmit={async (payload) => {
            await updateMediaMutation.mutateAsync(payload)
          }}
        />
      )}
    </DataTableShell>
  )
}

export default SiteMediaPage
