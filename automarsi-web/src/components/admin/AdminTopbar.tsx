import AdminUserButton from './AdminUserButton'

const pageTitles: Record<string, { eyebrow: string; title: string }> = {
  '/admin': {
    eyebrow: 'AutoMarsi',
    title: 'Overview',
  },
  '/admin/listings': {
    eyebrow: 'Inventory',
    title: 'Listings',
  },
  '/admin/inquiries': {
    eyebrow: 'Customers',
    title: 'Inquiries',
  },
  '/admin/appointments': {
    eyebrow: 'Schedule',
    title: 'Appointments',
  },
  '/admin/catalog/makes': {
    eyebrow: 'Catalog',
    title: 'Makes',
  },
  '/admin/catalog/models': {
    eyebrow: 'Catalog',
    title: 'Models',
  },
  '/admin/catalog/features': {
    eyebrow: 'Catalog',
    title: 'Features',
  },
}

type AdminTopbarProps = {
  currentPath: string
}

function AdminTopbar({ currentPath }: AdminTopbarProps) {
  const page = currentPath.startsWith('/admin/listings/')
    ? pageTitles['/admin/listings']
    : pageTitles[currentPath] ?? pageTitles['/admin']
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className="sticky top-0 z-30 flex min-h-12 items-center justify-between border-b bg-card/95 px-5 backdrop-blur lg:px-7 max-md:px-4">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">{page.eyebrow}</span>
        <span className="text-muted-foreground/50">/</span>
        <span className="font-semibold text-foreground">{page.title}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden rounded-md border bg-muted/40 px-2.5 py-1.5 text-[11px] tabular-nums text-muted-foreground sm:block">
          {today}
        </span>
        <AdminUserButton />
      </div>
    </header>
  )
}

export default AdminTopbar
