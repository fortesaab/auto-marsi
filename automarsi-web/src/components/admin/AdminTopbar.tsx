import AdminUserButton from './AdminUserButton'

const pageTitles: Record<string, { eyebrow: string; title: string }> = {
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
    : pageTitles[currentPath] ?? pageTitles['/admin/listings']

  return (
    <header className="flex min-h-16 items-center justify-between border-b bg-background/95 px-5 backdrop-blur lg:px-6 max-md:px-4">
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          {page.eyebrow}
        </p>
        <h1 className="text-lg font-semibold">{page.title}</h1>
      </div>

      <AdminUserButton />
    </header>
  )
}

export default AdminTopbar
