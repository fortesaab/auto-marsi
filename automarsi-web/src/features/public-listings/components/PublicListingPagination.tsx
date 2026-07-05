import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListingsResponse } from '../types'

type PublicListingPaginationProps = {
  meta: PublicListingsResponse['meta']
  onPageChange: (page: number) => void
}

function getPageNumber(value: unknown, fallback: number) {
  const parsedValue = Number(value)

  return Number.isFinite(parsedValue) && parsedValue > 0
    ? Math.trunc(parsedValue)
    : fallback
}

function PublicListingPagination({
  meta,
  onPageChange,
}: PublicListingPaginationProps) {
  const { messages } = useI18n()
  const currentPage = getPageNumber(meta.current_page, 1)
  const lastPage = Math.max(getPageNumber(meta.last_page, currentPage), 1)
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < lastPage
  const firstVisiblePage = Math.max(1, Math.min(currentPage - 2, lastPage - 4))
  const lastVisiblePage = Math.min(lastPage, firstVisiblePage + 4)
  const visiblePages = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index
  )

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
      <p className="text-sm text-muted-foreground">
        {messages.inventory.pagination.page} {currentPage}{' '}
        {messages.inventory.pagination.of} {lastPage}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft />
          {messages.inventory.pagination.previous}
        </Button>

        {visiblePages.map((page) => (
          <Button
            key={page}
            type="button"
            variant={page === currentPage ? 'default' : 'outline'}
            size="sm"
            className="min-w-9 px-3"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canGoNext}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {messages.inventory.pagination.next}
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default PublicListingPagination
