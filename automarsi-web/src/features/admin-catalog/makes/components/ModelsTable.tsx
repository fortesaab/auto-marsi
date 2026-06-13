import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AdminModel } from '../types'

type ModelsTableProps = {
  models: AdminModel[]
  isDeletingModelId: number | null
  onEditModel: (model: AdminModel) => void
  onDeleteModel: (model: AdminModel) => void
}

function ModelsTable({
  models,
  isDeletingModelId,
  onEditModel,
  onDeleteModel,
}: ModelsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead>Model</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="w-32 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {model.slug}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Edit ${model.name}`}
                    onClick={() => onEditModel(model)}
                  >
                    <Pencil />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${model.name}`}
                    disabled={isDeletingModelId === model.id}
                    onClick={() => onDeleteModel(model)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ModelsTable