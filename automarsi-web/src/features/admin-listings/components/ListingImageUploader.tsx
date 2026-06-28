import { ImagePlus, Upload, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
const maximumFileSize = 5 * 1024 * 1024

type SelectedImage = {
  file: File
  previewUrl: string
}

type ListingImageUploaderProps = {
  isUploading: boolean
  onUpload: (files: File[]) => Promise<void>
}

function validateFiles(files: File[]) {
  const invalidType = files.find((file) => !acceptedTypes.includes(file.type))

  if (invalidType) {
    return `${invalidType.name} must be a JPG, PNG, or WebP image.`
  }

  const oversizedFile = files.find((file) => file.size > maximumFileSize)

  if (oversizedFile) {
    return `${oversizedFile.name} is larger than 5 MB.`
  }

  return null
}

function ListingImageUploader({
  isUploading,
  onUpload,
}: ListingImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const selectedImagesRef = useRef<SelectedImage[]>([])

  useEffect(() => {
    return () => {
      selectedImagesRef.current.forEach((image) =>
        URL.revokeObjectURL(image.previewUrl)
      )
    }
  }, [])

  function updateSelectedImages(
    updater: (currentImages: SelectedImage[]) => SelectedImage[]
  ) {
    setSelectedImages((currentImages) => {
      const nextImages = updater(currentImages)
      selectedImagesRef.current = nextImages

      return nextImages
    })
  }

  function selectFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? [])

    if (files.length === 0) {
      return
    }

    const validationError = validateFiles(files)

    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setErrorMessage(null)
    updateSelectedImages((currentImages) => [
      ...currentImages,
      ...files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ])

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function removeImage(index: number) {
    updateSelectedImages((currentImages) => {
      const image = currentImages[index]

      if (image) {
        URL.revokeObjectURL(image.previewUrl)
      }

      return currentImages.filter((_, imageIndex) => imageIndex !== index)
    })
  }

  async function uploadImages() {
    if (selectedImages.length === 0) {
      return
    }

    try {
      await onUpload(selectedImages.map((image) => image.file))
      updateSelectedImages((currentImages) => {
        currentImages.forEach((image) => URL.revokeObjectURL(image.previewUrl))
        return []
      })
    } catch {
      // The mutation displays the error toast and keeps files selected.
    }
  }

  return (
    <div className="grid gap-4 border-b p-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="sr-only"
        onChange={(event) => selectFiles(event.target.files)}
      />

      <button
        type="button"
        className="grid min-h-20 place-items-center rounded-md border border-dashed bg-muted/20 px-4 py-3 text-center transition-colors hover:bg-muted/40"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          selectFiles(event.dataTransfer.files)
        }}
      >
        <span className="flex flex-wrap items-center justify-center gap-3">
          <span className="grid size-8 place-items-center rounded-md border bg-background">
            <ImagePlus className="size-4" />
          </span>
          <span className="grid gap-0.5 text-left">
            <span className="text-sm font-medium">Add images</span>
            <span className="text-xs text-muted-foreground">
              Drop files or click to browse. JPG, PNG or WebP, max 5 MB.
            </span>
          </span>
        </span>
      </button>

      {errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : null}

      {selectedImages.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {selectedImages.map((image, index) => (
              <div
                key={`${image.file.name}-${image.file.lastModified}-${index}`}
                className="relative overflow-hidden rounded-md border bg-muted"
              >
                <img
                  src={image.previewUrl}
                  alt={image.file.name}
                  loading="lazy"
                  decoding="async"
                  className="h-28 w-full object-cover"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute right-1.5 top-1.5 size-7"
                  disabled={isUploading}
                  onClick={() => removeImage(index)}
                  aria-label={`Remove ${image.file.name}`}
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              disabled={isUploading}
              onClick={uploadImages}
            >
              <Upload />
              {isUploading
                ? 'Uploading...'
                : `Upload ${selectedImages.length} image${
                    selectedImages.length === 1 ? '' : 's'
                  }`}
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ListingImageUploader
