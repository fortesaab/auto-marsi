import { Mail, MapPin, Phone } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'

type PublicFooterProps = {
  onNavigate: (path: string) => void
}

function PublicFooter({ onNavigate }: PublicFooterProps) {
  const { messages } = useI18n()
  const inventoryLinks = [
    { label: messages.footer.allVehicles, path: '/inventory' },
    { label: messages.footer.financingGuidance, path: '/financing' },
    { label: messages.footer.contactTeam, path: '/contact' },
  ]
  const companyLinks = [
    { label: messages.nav.about, path: '/about' },
    { label: messages.nav.services, path: '/services' },
    { label: messages.nav.contact, path: '/contact' },
  ]

  return (
    <footer className="border-t bg-[#171331] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div className="grid content-start gap-3">
          <p className="inline-flex items-center gap-3 text-xl font-black tracking-[-0.04em] text-white">
            <span className="size-2.5 rounded-full bg-[#A8741D]" />
            <span className="text-[#FBD969]">Auto</span>
            <span className="text-[#A8741D]">Marsi</span>
          </p>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            {messages.footer.description}
          </p>
        </div>

        <FooterLinkGroup
          title={messages.footer.inventory}
          links={inventoryLinks}
          onNavigate={onNavigate}
        />

        <FooterLinkGroup
          title={messages.footer.company}
          links={companyLinks}
          onNavigate={onNavigate}
        />

        <div className="grid content-start gap-3">
          <h3 className="text-sm font-semibold text-white">
            {messages.footer.contact}
          </h3>
          <div className="grid gap-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4" />
              {messages.contact.phone}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" />
              {messages.contact.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {messages.contact.location}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        {messages.footer.copyright}
      </div>
    </footer>
  )
}

type FooterLinkGroupProps = {
  title: string
  links: Array<{
    label: string
    path: string
  }>
  onNavigate: (path: string) => void
}

function FooterLinkGroup({ title, links, onNavigate }: FooterLinkGroupProps) {
  return (
    <div className="grid content-start gap-3">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <div className="grid gap-2">
        {links.map((link) => (
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
  )
}

export default PublicFooter
