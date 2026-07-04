import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PaginationControlsProps = {
  currentPage: number
  lastPage: number
  total: number
  onPageChange: (page: number) => void
}

function PaginationControls({
  currentPage,
  lastPage,
  total,
  onPageChange,
}: PaginationControlsProps) {
  if (lastPage <= 1) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/25 px-5 py-4">
      <p className="text-xs text-muted-foreground">
        Page {currentPage} of {lastPage} · {total} records
      </p>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage >= lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default PaginationControls
