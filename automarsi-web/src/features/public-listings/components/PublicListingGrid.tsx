import type { PublicListing } from '../types'
import PublicListingCard from './PublicListingCard'

type PublicListingGridProps = {
  listings: PublicListing[]
  onNavigate: (path: string) => void
}

function PublicListingGrid({ listings, onNavigate }: PublicListingGridProps) {
  return (
    <div className="grid auto-rows-max items-start gap-6 xl:grid-cols-2 2xl:grid-cols-3">
      {listings.map((listing) => (
        <PublicListingCard
          key={listing.id}
          listing={listing}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  )
}

export default PublicListingGrid
