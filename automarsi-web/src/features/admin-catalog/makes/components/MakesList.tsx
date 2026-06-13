import { CarFront, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { AdminMake } from '../types'

type MakesListProps = {
  makes: AdminMake[]
  selectedMakeId: number | null
  modelCounts: Record<number, number>
  isDeletingMakeId: number | null
  onSelectMake: (makeId: number) => void
  onEditMake: (make: AdminMake) => void
  onDeleteMake: (make: AdminMake) => void
}

function MakesList({
  makes,
  selectedMakeId,
  modelCounts,
  isDeletingMakeId,
  onSelectMake,
  onEditMake,
  onDeleteMake,
}: MakesListProps) {
  return (
    <div className="grid gap-1">
      {makes.map((make) => {
        const isSelected = selectedMakeId === make.id

        return (
          <div
            key={make.id}
            className={[
              'group flex items-center gap-1 rounded-lg',
              isSelected ? 'bg-secondary text-secondary-foreground' : '',
            ].join(' ')}
          >
            <Button
              type="button"
              variant="ghost"
              className="h-auto min-w-0 flex-1 justify-start gap-3 px-3 py-2 hover:bg-transparent"
              onClick={() => onSelectMake(make.id)}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-background text-muted-foreground">
                <CarFront className="size-4" />
              </span>

              <span className="grid min-w-0 flex-1 gap-0.5 text-left">
                <span className="truncate text-sm font-medium">{make.name}</span>
                <span className="text-xs text-muted-foreground">
                  {modelCounts[make.id] ?? 0} models
                </span>
              </span>
            </Button>

            <div className="flex pr-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Edit ${make.name}`}
                onClick={() => onEditMake(make)}
              >
                <Pencil />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${make.name}`}
                disabled={isDeletingMakeId === make.id}
                onClick={() => onDeleteMake(make)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MakesList
