import { Mail, MapPin, Phone } from 'lucide-react'
import PublicSection from '@/components/public/PublicSection'
import supraHeroImage from '@/assets/home-hero-supra.jpg'
import PublicContactInquiryForm from '@/features/public-inquiries/components/PublicContactInquiryForm'
import { usePublicSiteMedia } from '@/features/site-media/hooks/usePublicSiteMedia'
import { useI18n } from '@/i18n/useI18n'

function ContactPage() {
  const { messages } = useI18n()
  const contactMediaQuery = usePublicSiteMedia('about_showroom')
  const contactImage = contactMediaQuery.data?.[0]
  const instagramUrl =
    import.meta.env.VITE_INSTAGRAM_URL ?? 'https://www.instagram.com/'
  const facebookUrl =
    import.meta.env.VITE_FACEBOOK_URL ?? 'https://www.facebook.com/'

  return (
    <PublicSection className="py-10 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2 lg:items-start">
        <div className="grid gap-5">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-card shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <img
              src={contactImage?.image_url ?? supraHeroImage}
              alt={contactImage?.alt_text ?? messages.common.brand}
              className="aspect-[4/3] size-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>

          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-primary">
              {messages.contact.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-none sm:text-4xl">
              {messages.contact.title}
            </h1>

            <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
              <a className="inline-flex w-fit items-center gap-2 transition hover:text-foreground" href={`tel:${messages.contact.phone.replace(/\s/g, '')}`}>
                <Phone className="size-4" /> {messages.contact.phone}
              </a>
              <a className="inline-flex w-fit items-center gap-2 transition hover:text-foreground" href={`mailto:${messages.contact.email}`}>
                <Mail className="size-4" /> {messages.contact.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" /> {messages.contact.location}
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition hover:border-primary/40 hover:text-primary">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
                </svg>
              </a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition hover:border-primary/40 hover:text-primary">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
                  <path d="M13.5 21v-8h2.75l.41-3.2H13.5V7.76c0-.93.26-1.56 1.59-1.56h1.7V3.34A22.8 22.8 0 0 0 14.32 3C11.87 3 10.2 4.5 10.2 7.26V9.8H7.43V13h2.77v8h3.3Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <PublicContactInquiryForm />
      </div>
    </PublicSection>
  )
}

export default ContactPage
