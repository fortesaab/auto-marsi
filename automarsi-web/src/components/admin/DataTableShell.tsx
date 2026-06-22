import type { ReactNode } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type DataTableShellProps = {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}

function DataTableShell({
  title,
  description,
  action,
  children,
}: DataTableShellProps) {
  return (
    <Card className="overflow-hidden rounded-lg border-border bg-card shadow-none">
      <CardHeader className="min-h-14 border-b px-4 py-3">
        <CardTitle className="text-sm">{title}</CardTitle>
        {description ? (
          <CardDescription>{description}</CardDescription>
        ) : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>

      <CardContent className="min-h-72 p-0">
        {children}
      </CardContent>
    </Card>
  )
}

export default DataTableShell
