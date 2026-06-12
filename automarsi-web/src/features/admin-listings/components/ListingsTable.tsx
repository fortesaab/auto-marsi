import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AdminListing } from '../types'
import ListingActionsMenu from './ListingActionsMenu'
import ListingStatusBadge from './ListingStatusBadge'

type ListingsTableProps = {
  listings: AdminListing[]
  onNavigate: (path: string) => void
}

function formatPrice(listing: AdminListing): string {
  const numericPrice = Number(listing.price)

  if (Number.isNaN(numericPrice)) {
    return `${listing.price} ${listing.currency}`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(numericPrice)
}

function formatKilometers(kilometers: number | null): string {
  if (kilometers === null) {
    return '-'
  }

  return `${new Intl.NumberFormat('en-US').format(kilometers)} km`
}

function ListingsTable({ listings, onNavigate }: ListingsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="min-w-64">Listing</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Kilometers</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {listings.map((listing) => (
            <TableRow key={listing.id} className="h-14">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="size-10 shrink-0 overflow-hidden rounded-md border bg-muted">
                    {listing.primary_image ? (
                      <img
                        src={listing.primary_image.image_url}
                        alt={listing.primary_image.alt_text ?? listing.title}
                        className="size-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="grid gap-0.5">
                    <span className="font-medium leading-none">
                      {listing.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {listing.location ?? 'No location'}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="grid gap-0.5">
                  <span className="leading-none">{listing.make?.name ?? '-'}</span>
                  <span className="text-xs text-muted-foreground">
                    {listing.car_model?.name ?? '-'}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {listing.year}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatPrice(listing)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatKilometers(listing.kilometers)}
              </TableCell>

              <TableCell>
                <ListingStatusBadge status={listing.status} />
              </TableCell>

            <TableCell className="text-right">
              <ListingActionsMenu listing={listing} onNavigate={onNavigate} />
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ListingsTable
