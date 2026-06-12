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
    <Card className="shadow-xs">
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
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
