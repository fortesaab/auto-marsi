import { Search } from 'lucide-react'

type AdminSearchBoxProps = {
  placeholder?: string
}

function AdminSearchBox({
  placeholder = 'Search inventory, VIN...',
}: AdminSearchBoxProps) {
  return (
    <div className="hidden h-9 w-[280px] items-center gap-2 rounded-xl border bg-background px-3 text-sm text-muted-foreground shadow-xs md:flex">
      <Search className="size-4" />
      <span className="truncate text-xs">{placeholder}</span>
    </div>
  )
}

export default AdminSearchBox
