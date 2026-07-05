import { useState, type ReactNode } from 'react'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import { Button } from '@/components/ui/button'
import PublicInventoryMobileControls from '@/features/public-listings/components/PublicInventoryMobileControls'
import PublicListingFilters from '@/features/public-listings/components/PublicListingFilters'
import PublicListingGrid from '@/features/public-listings/components/PublicListingGrid'
import PublicListingPagination from '@/features/public-listings/components/PublicListingPagination'
import { usePublicListings } from '@/features/public-listings/hooks/usePublicListings'
import type { PublicListingFilters as PublicListingFiltersType } from '@/features/public-listings/types'
import { useI18n } from '@/i18n/useI18n'

type InventoryPageProps = {
  onNavigate: (path: string) => void
}

const initialFilters: PublicListingFiltersType = {
  page: 1,
  make_id: '',
  car_model_id: '',
  search: '',
  year: '',
  min_price: '',
  max_price: '',
  fuel_type: '',
  transmission: '',
  body_type: '',
}

function formatCount(value: number) {
  return String(Math.trunc(Number(String(value).replace(',', '.'))))
}

function InventoryPage({ onNavigate }: InventoryPageProps) {
  const { messages } = useI18n()
  const [filters, setFilters] =
    useState<PublicListingFiltersType>(initialFilters)

  const { listings, meta, listingsQuery, errorMessage } = usePublicListings({
    filters,
  })

  const vehiclesFoundLabel = meta
    ? `${formatCount(listings.length)}/${formatCount(meta.total)}`
    : messages.inventory.loadingVehicles

  return (
    <PublicSection className="pt-8 md:pt-12">
      <div className="grid gap-7">
        <InventoryHeader countLabel={vehiclesFoundLabel} />

        <PublicInventoryMobileControls
          filters={filters}
          countLabel={vehiclesFoundLabel}
          onFiltersChange={setFilters}
        />

        <div className="grid min-w-0 gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <PublicListingFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          <InventoryResults
            listingsQuery={listingsQuery}
            errorMessage={errorMessage}
            hasListings={listings.length > 0}
          >
            <PublicListingGrid listings={listings} onNavigate={onNavigate} />

            {meta ? (
              <PublicListingPagination
                meta={meta}
                onPageChange={(page) =>
                  setFilters((currentFilters) => ({
                    ...currentFilters,
                    page,
                  }))
                }
              />
            ) : null}
          </InventoryResults>
        </div>
      </div>
    </PublicSection>
  )
}

type InventoryHeaderProps = {
  countLabel: string
}

function InventoryHeader({ countLabel }: InventoryHeaderProps) {
  const { messages } = useI18n()

  return (
    <div className="grid gap-5 border-b pb-6 lg:flex lg:items-end lg:justify-between">
      <div className="hidden lg:block">
        <PublicSectionHeader
          eyebrow={messages.inventory.eyebrow}
          title={messages.inventory.title}
          description={messages.inventory.description}
        />
      </div>

      <h1 className="text-5xl font-black tracking-[-0.06em] lg:hidden">
        {messages.nav.inventory}
      </h1>

      <div className="hidden w-fit rounded-full border bg-white/80 px-4 py-2 text-sm font-semibold text-muted-foreground shadow-xs lg:block">
        {countLabel}
      </div>
    </div>
  )
}

type InventoryResultsProps = {
  listingsQuery: ReturnType<typeof usePublicListings>['listingsQuery']
  errorMessage: string | null
  hasListings: boolean
  children: ReactNode
}

function InventoryResults({
  listingsQuery,
  errorMessage,
  hasListings,
  children,
}: InventoryResultsProps) {
  const { messages } = useI18n()

  if (listingsQuery.isLoading) {
    return (
      <div className="rounded-[1.75rem] border bg-card p-8 text-sm text-muted-foreground shadow-[0_18px_40px_rgba(31,25,76,0.06)]">
        {messages.inventory.loadingAvailable}
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="grid gap-3 rounded-[1.75rem] border bg-card p-8 shadow-[0_18px_40px_rgba(31,25,76,0.06)]">
        <div className="grid gap-1">
          <p className="font-medium">{messages.inventory.couldNotLoad}</p>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={() => listingsQuery.refetch()}
        >
          {messages.common.tryAgain}
        </Button>
      </div>
    )
  }

  if (!hasListings) {
    return (
      <div className="rounded-[1.75rem] border bg-card p-8 shadow-[0_18px_40px_rgba(31,25,76,0.06)]">
        <p className="font-medium">{messages.inventory.noVehicles}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {messages.inventory.noVehiclesDescription}
        </p>
      </div>
    )
  }

  return <div className="grid min-w-0 gap-5">{children}</div>
}

export default InventoryPage
