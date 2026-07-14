import { MessageSquare } from 'lucide-react'
import PublicSection from '@/components/public/PublicSection'
import { Button } from '@/components/ui/button'
import supraHeroImage from '@/assets/home-hero-supra.jpg'
import FeaturedListingsSection from '@/features/public-listings/components/FeaturedListingsSection'
import RecentlySoldSection from '@/features/public-listings/components/RecentlySoldSection'
import { usePublicSiteMedia } from '@/features/site-media/hooks/usePublicSiteMedia'
import { useI18n } from '@/i18n/useI18n'

type HomePageProps = {
  onNavigate: (path: string) => void
}

function HomePage({ onNavigate }: HomePageProps) {
  const { messages } = useI18n()
  const homeHeroMediaQuery = usePublicSiteMedia('home_hero')
  const heroMedia = homeHeroMediaQuery.data?.[0]

  return (
    <div>
      <section className="relative -mt-16 min-h-[calc(100svh-5rem)] overflow-hidden pt-16">
        <div className="absolute inset-0 public-image-fade">
          <img
            src={heroMedia?.image_url ?? supraHeroImage}
            alt={heroMedia?.alt_text ?? 'AutoMarsi hero vehicle'}
            className="size-full object-cover"
            decoding="async"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid max-w-2xl gap-5">
            <div className="grid gap-2">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-primary">
                {messages.home.heroEyebrow}
              </p>
              <h1 className="max-w-xl text-4xl font-black leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
                {messages.home.heroTitle}
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" size="lg" onClick={() => onNavigate('/inventory')} className="h-11 rounded-md px-5">
                {messages.home.browseInventory}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedListingsSection onNavigate={onNavigate} />

      <PublicSection className="py-8 sm:py-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <h2 className="max-w-sm text-3xl font-black leading-none sm:text-4xl">
              {messages.home.showroomCtaTitle}
            </h2>
            <Button
              type="button"
              className="mt-5 h-10 rounded-md px-4"
              onClick={() => onNavigate('/contact')}
            >
              <MessageSquare className="size-4" />
              {messages.home.contactTeam}
            </Button>
          </div>
        </div>
      </PublicSection>

      <RecentlySoldSection onNavigate={onNavigate} />
    </div>
  )
}

export default HomePage
