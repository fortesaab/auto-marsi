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
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price))
}

function formatKilometers(kilometers: number | null) {
  if (kilometers === null) {
    return '-'
  }

  return `${new Intl.NumberFormat('de-DE').format(kilometers)} km`
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
        <TableRow className="bg-muted/40 hover:bg-muted/40">
          <TableHead className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Vehicle
          </TableHead>
          <TableHead className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Make / Model
          </TableHead>
          <TableHead className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Year
          </TableHead>
          <TableHead className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Price
          </TableHead>
          <TableHead className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Mileage
          </TableHead>
          <TableHead className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Status
          </TableHead>
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
            <TableRow key={listing.id} className="hover:bg-muted/35">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-14 overflow-hidden rounded-xl border bg-muted">
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
                    <p className="truncate text-sm font-bold">{listing.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {listing.location ?? 'No location'}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm font-semibold">{listing.make?.name ?? '-'}</p>
                  <p className="text-xs text-muted-foreground">
                    {listing.car_model?.name ?? '-'}
                  </p>
                </div>
              </TableCell>

              <TableCell>{listing.year}</TableCell>

              <TableCell className="font-semibold tabular-nums">
                {formatCurrency(listing.price, listing.currency)}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {formatKilometers(listing.kilometers)}
              </TableCell>

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
