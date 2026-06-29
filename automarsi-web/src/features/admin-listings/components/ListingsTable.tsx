import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AdminListingStatusAction } from '../api/updateAdminListingStatus'
import type { AdminListing } from '../types'
import ListingActionsMenu from './ListingActionsMenu'
import ListingStatusBadge from './ListingStatusBadge'

type ListingsTableProps = {
  listings: AdminListing[]
  isDeletingListing: boolean
  isUpdatingListingStatus: boolean
  onNavigate: (path: string) => void
  onDeleteListing: (listingId: number) => Promise<void>
  onUpdateListingStatus: (
    listingId: number,
    status: AdminListingStatusAction,
  ) => Promise<void>
}

function formatCurrency(price: string, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price))
}

function formatKilometers(kilometers: number | null) {
  if (kilometers === null) {
    return '-'
  }

  return `${new Intl.NumberFormat('en-US').format(kilometers)} km`
}

function ListingsTable({
  listings,
  isDeletingListing,
  isUpdatingListingStatus,
  onNavigate,
  onDeleteListing,
  onUpdateListingStatus,
}: ListingsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Listing</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Kilometers</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-16 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {listings.map((listing) => {
          const listingImages = listing.images ?? []
          const primaryImage =
            listing.primary_image ??
            listingImages.find((image) => image.is_primary) ??
            listingImages[0] ??
            null

          return (
            <TableRow key={listing.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 overflow-hidden rounded-md border bg-muted">
                    {primaryImage ? (
                      <img
                        src={primaryImage.image_url}
                        alt={primaryImage.alt_text ?? listing.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium">{listing.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {listing.location ?? 'No location'}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="font-medium">{listing.make?.name ?? '-'}</p>
                  <p className="text-sm text-muted-foreground">
                    {listing.car_model?.name ?? '-'}
                  </p>
                </div>
              </TableCell>

              <TableCell>{listing.year}</TableCell>

              <TableCell>
                {formatCurrency(listing.price, listing.currency)}
              </TableCell>

              <TableCell>{formatKilometers(listing.kilometers)}</TableCell>

              <TableCell>
                <ListingStatusBadge status={listing.status} />
              </TableCell>

              <TableCell className="text-right">
                <ListingActionsMenu
                  listing={listing}
                  isDeleting={isDeletingListing}
                  isUpdatingStatus={isUpdatingListingStatus}
                  onNavigate={onNavigate}
                  onDelete={onDeleteListing}
                  onUpdateStatus={onUpdateListingStatus}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ListingsTable
