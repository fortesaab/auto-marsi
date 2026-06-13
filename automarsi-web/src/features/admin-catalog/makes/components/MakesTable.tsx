import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AdminMake } from '../types'

type MakesTableProps = {
  makes: AdminMake[]
}

function MakesTable({ makes }: MakesTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Logo</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {makes.map((make) => (
            <TableRow key={make.id}>
              <TableCell className="font-medium">{make.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {make.slug}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {make.logo_url ? make.logo_url : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MakesTable