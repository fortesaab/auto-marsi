import { Eye, Images, MoreHorizontal, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { AdminListing } from '../types'

type ListingActionsMenuProps = {
  listing: AdminListing
  onNavigate: (path: string) => void
}

function ListingActionsMenu({ listing, onNavigate }: ListingActionsMenuProps) {
  function handleView() {
    onNavigate(`/admin/listings/${listing.id}`)
  }

  function handleEdit() {
    onNavigate(`/admin/listings/${listing.id}/edit`)
  }

  function handleImages() {
    onNavigate(`/admin/listings/${listing.id}/images`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Open actions for ${listing.title}`}
          >
            <MoreHorizontal />
          </Button>
        }
      />

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleView} className="gap-2">
          <Eye className="size-4 text-muted-foreground" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit} className="gap-2">
          <Pencil className="size-4 text-muted-foreground" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleImages} className="gap-2">
          <Images className="size-4 text-muted-foreground" />
          Manage images
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ListingActionsMenu
