import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { AdminListingImage } from '../types'
import type { UpdateAdminListingImagePayload } from '../api/updateAdminListingImage'

type ListingImageCardProps = {
  image: AdminListingImage
  isSettingPrimary: boolean
  isUpdating: boolean
  isDeleting: boolean
  onSetPrimary: (imageId: number) => Promise<void>
  onUpdate: (
    imageId: number,
    payload: UpdateAdminListingImagePayload
  ) => Promise<void>
  onDelete: (imageId: number) => Promise<void>
}

function ListingImageCard({
  image,
  isSettingPrimary,
  isUpdating,
  isDeleting,
  onSetPrimary,
  onUpdate,
  onDelete,
}: ListingImageCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [altText, setAltText] = useState(image.alt_text ?? '')
  const [sortOrder, setSortOrder] = useState(
    String((image.sort_order ?? 0) + 1)
  )

  const isBusy = isSettingPrimary || isUpdating || isDeleting

  function openEditDialog() {
    setAltText(image.alt_text ?? '')
    setSortOrder(String((image.sort_order ?? 0) + 1))
    setIsEditOpen(true)
  }

  async function submitUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await onUpdate(image.id, {
        alt_text: altText.trim() || null,
        sort_order: Math.max(0, Number(sortOrder) - 1),
      })

      setIsEditOpen(false)
    } catch {
      // The mutation displays the error toast and the dialog stays open.
    }
  }

  async function confirmDelete() {
    try {
      await onDelete(image.id)
      setIsDeleteOpen(false)
    } catch {
      // The mutation displays the error toast and the dialog stays open.
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-md border bg-card">
        <div className="relative h-32 bg-muted">
          <img
            src={image.image_url}
            alt={image.alt_text ?? `Listing image ${image.id}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />

          {image.is_primary ? (
            <Badge className="absolute left-2 top-2">Primary</Badge>
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-2 size-8 bg-background/90"
                  disabled={isBusy}
                  aria-label="Image actions"
                />
              }
            >
              {isBusy ? (
                <Loader2 className="animate-spin" />
              ) : (
                <MoreHorizontal />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              {!image.is_primary ? (
                <DropdownMenuItem
                  onClick={() => {
                    void onSetPrimary(image.id).catch(() => undefined)
                  }}
                >
                  <Star />
                  Set as primary
                </DropdownMenuItem>
              ) : null}

              <DropdownMenuItem onClick={openEditDialog}>
                <Pencil />
                Edit details
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2 />
                Delete image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-0.5 px-2.5 py-2">
          <p className="truncate text-xs font-medium">
            {image.alt_text || 'Untitled image'}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Gallery position {(image.sort_order ?? 0) + 1}
          </p>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <form onSubmit={submitUpdate} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>Edit image details</DialogTitle>
              <DialogDescription>
                Use descriptive alt text and control this image&apos;s gallery
                position.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <label className="grid gap-1.5 text-sm font-medium">
                Alt text
                <input
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                  value={altText}
                  onChange={(event) => setAltText(event.target.value)}
                  maxLength={255}
                  placeholder="Front view of the vehicle"
                />
              </label>

              <label className="grid gap-1.5 text-sm font-medium">
                Gallery position
                <input
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                  type="number"
                  min="1"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  required
                />
                <span className="text-xs font-normal text-muted-foreground">
                  Lower numbers appear first.
                </span>
              </label>
            </div>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>
                Cancel
              </DialogClose>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving
                  </>
                ) : (
                  'Save changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete this image?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the image file and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={() => void confirmDelete()}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Deleting
                </>
              ) : (
                'Delete image'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ListingImageCard
