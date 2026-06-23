import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PublicListingsResponse } from '../types'

type PublicListingPaginationProps = {
  meta: PublicListingsResponse['meta']
  onPageChange: (page: number) => void
}

function PublicListingPagination({
  meta,
  onPageChange,
}: PublicListingPaginationProps) {
  const canGoPrevious = meta.current_page > 1
  const canGoNext = meta.current_page < meta.last_page

  return (
    <div className="flex items-center justify-between gap-3 border-t pt-4">
      <p className="text-sm text-muted-foreground">
        Page {meta.current_page} of {meta.last_page}
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(meta.current_page - 1)}
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canGoNext}
          onClick={() => onPageChange(meta.current_page + 1)}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default PublicListingPagination
