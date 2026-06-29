import { CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListingFeature } from '../types'

type PublicListingFeaturesProps = {
  features: PublicListingFeature[]
}

function PublicListingFeatures({ features }: PublicListingFeaturesProps) {
  const { messages } = useI18n()

  if (features.length === 0) {
    return null
  }

  return (
    <section className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold">
        {messages.listingDetails.features}
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="size-4 text-red-600" />
            {feature.name}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PublicListingFeatures
