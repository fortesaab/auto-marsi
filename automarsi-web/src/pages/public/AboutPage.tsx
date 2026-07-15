import PublicFadingImage from '@/components/public/PublicFadingImage'
import PublicImageCarousel from '@/components/public/PublicImageCarousel'
import PublicSection from '@/components/public/PublicSection'
import supraHeroImage from '@/assets/home-hero-supra.jpg'
import { usePublicSiteMedia } from '@/features/site-media/hooks/usePublicSiteMedia'
import { useI18n } from '@/i18n/useI18n'

function AboutPage() {
  const { messages } = useI18n()
  const aboutMediaQuery = usePublicSiteMedia('about_showroom')
  const heroImage = aboutMediaQuery.data?.[0]?.image_url ?? supraHeroImage
  const carouselImages =
    aboutMediaQuery.data && aboutMediaQuery.data.length > 0
      ? aboutMediaQuery.data
      : [
          {
            id: null,
            key: 'fallback-about-showroom',
            image_url: supraHeroImage,
            alt_text: messages.about.showroomLabel,
            sort_order: 0,
            updated_at: null,
          },
        ]

  return (
    <div>
      <section className="relative -mt-16 min-h-[64svh] overflow-hidden pt-16">
        <div className="absolute inset-0 public-image-fade">
          <PublicFadingImage
            src={heroImage}
            alt={messages.about.showroomLabel}
            className="size-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[64svh] max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid max-w-2xl gap-3">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-primary">
              {messages.about.storyEyebrow}
            </p>
            <h1 className="text-4xl font-black leading-[0.95] sm:text-5xl">
              {messages.about.storyTitle}
            </h1>
          </div>
        </div>
      </section>

      <PublicSection className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-4xl gap-8 sm:gap-10">
          <PublicImageCarousel
            images={carouselImages}
            label={messages.about.showroomLabel}
            aspect="aspect-[16/9] sm:aspect-[16/7]"
            showCaption
          />

          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground">
            {messages.about.body}
          </p>
        </div>
      </PublicSection>
    </div>
  )
}

export default AboutPage
