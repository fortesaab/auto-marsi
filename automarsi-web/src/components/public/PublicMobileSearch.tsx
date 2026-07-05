import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

type PublicMobileSearchProps = {
  value?: string
  placeholder: string
  readOnly?: boolean
  className?: string
  onChange?: (value: string) => void
  onClick?: () => void
}

function PublicMobileSearch({
  value = '',
  placeholder,
  readOnly = false,
  className,
  onChange,
  onClick,
}: PublicMobileSearchProps) {
  return (
    <label
      className={cn(
        'flex h-14 items-center gap-3 rounded-3xl bg-muted px-5 text-muted-foreground shadow-inner md:hidden',
        className
      )}
    >
      <Search className="size-5 shrink-0" />
      <input
        value={value}
        readOnly={readOnly}
        onClick={onClick}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground/80"
      />
    </label>
  )
}

export default PublicMobileSearch
