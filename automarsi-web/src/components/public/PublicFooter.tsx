type PublicFooterProps = {
  onNavigate: (path: string) => void
}

const footerGroups = [
  {
    title: 'Inventory',
    links: [
      { label: 'All Cars', path: '/inventory' },
      { label: 'New Arrivals', path: '/inventory' },
      { label: 'Featured Cars', path: '/inventory' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Financing', path: '/financing' },
      { label: 'Contact', path: '/contact' },
    ],
  },
]

function PublicFooter({ onNavigate }: PublicFooterProps) {
  return (
    <footer className="border-t bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div className="grid gap-3">
          <p className="text-lg font-semibold text-white">
            Auto<span className="text-red-500">Marsi</span>
          </p>
          <p className="max-w-sm text-sm text-slate-400">
            Quality vehicles, transparent deals, and trusted support for drivers
            across Kosovo.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="grid gap-3">
            <h3 className="text-sm font-semibold text-white">{group.title}</h3>
            <div className="grid gap-2">
              {group.links.map((link) => (
                <button
                  key={link.path + link.label}
                  type="button"
                  onClick={() => onNavigate(link.path)}
                  className="w-fit text-left text-sm text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="grid gap-3">
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <div className="grid gap-2 text-sm text-slate-400">
            <span>+383 44 123 456</span>
            <span>info@automarsi.com</span>
            <span>Rr. Prishtina Ferizaj, 10000 Prishtina</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        © 2026 AutoMarsi. All rights reserved.
      </div>
    </footer>
  )
}

export default PublicFooter
