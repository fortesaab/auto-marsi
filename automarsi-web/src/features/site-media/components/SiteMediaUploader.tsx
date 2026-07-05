import { ImagePlus, Upload } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import type { SiteMedia } from '../types'

type SiteMediaUploaderProps = {
  mediaItems: SiteMedia[]
  isSubmitting: boolean
  errorMessage: string | null
  onSubmit: (payload: { images: File[]; altText: string }) => Promise<void>
}

function SiteMediaUploader({
  mediaItems,
  isSubmitting,
  errorMessage,
  onSubmit,
}: SiteMediaUploaderProps) {
  const [images, setImages] = useState<File[]>([])
  const [altText, setAltText] = useState('')
  const firstMedia = mediaItems[0] ?? null
  const firstSelectedImage = images[0] ?? null
  const previewUrl = useMemo(
    () =>
      firstSelectedImage
        ? URL.createObjectURL(firstSelectedImage)
        : firstMedia?.image_url,
    [firstSelectedImage, firstMedia?.image_url]
  )

  useEffect(() => {
    return () => {
      if (firstSelectedImage && previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [firstSelectedImage, previewUrl])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (images.length === 0) {
      return
    }

    await onSubmit({ images, altText })
    setImages([])
    setAltText('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-5">
      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border bg-muted">
        <div className="aspect-[16/6]">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={altText || 'About showroom preview'}
              className="size-full object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <div className="grid justify-items-center gap-2">
                <ImagePlus className="size-8" />
                <span className="text-sm">No About images uploaded yet.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="grid gap-1.5 text-sm font-medium">
          Image
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) =>
              setImages(Array.from(event.target.files ?? []))
            }
            className="h-10 rounded-md border bg-background px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-medium">
          Alt text
          <input
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            placeholder="AutoMarsi showroom in Prishtina"
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </label>

        <Button type="submit" disabled={images.length === 0 || isSubmitting}>
          <Upload className="size-4" />
          {isSubmitting
            ? 'Uploading...'
            : images.length > 1
              ? `Upload ${images.length} images`
              : 'Upload image'}
        </Button>
      </div>

      {mediaItems.length > 0 ? (
        <div className="grid gap-3 border-t pt-4">
          <p className="text-sm font-semibold">Carousel images</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mediaItems.map((media) => (
              <div
                key={media.id}
                className="overflow-hidden rounded-xl border bg-background"
              >
                <div className="aspect-[4/3] bg-muted">
                  {media.image_url ? (
                    <img
                      src={media.image_url}
                      alt={media.alt_text ?? 'About carousel image'}
                      className="size-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-3 text-xs text-muted-foreground">
                  {media.alt_text || 'No alt text'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </form>
  )
}

export default SiteMediaUploader
