import type { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type DataTableShellProps = {
  title: string
  children: ReactNode
}

function DataTableShell({ title, children }: DataTableShellProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="min-h-72">
        {children}
      </CardContent>
    </Card>
  )
}

export default DataTableShell
