import AdminUserButton from './AdminUserButton'

function AdminTopbar() {
  return (
    <header className="flex min-h-18 items-center justify-between border-b bg-background px-7 max-md:px-4">
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          Admin
        </p>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <AdminUserButton />
    </header>
  )
}

export default AdminTopbar
