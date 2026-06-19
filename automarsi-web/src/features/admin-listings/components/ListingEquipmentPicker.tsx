import { Check, Plus, RefreshCw, Search, Sparkles, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import VehicleFeatureIcon, {
  suggestVehicleFeatureIcon,
} from '@/features/admin-catalog/features/components/VehicleFeatureIcon'
import VehicleFeatureIconPicker from '@/features/admin-catalog/features/components/VehicleFeatureIconPicker'
import type {
  AdminVehicleFeature,
  CreateAdminVehicleFeaturePayload,
} from '@/features/admin-catalog/features/types'
import { cn } from '@/lib/utils'

type ListingEquipmentPickerProps = {
  modelName: string | null
  features: AdminVehicleFeature[]
  suggestions: AdminVehicleFeature[]
  selectedFeatureIds: string[]
  isLoading: boolean
  isCreating: boolean
  catalogErrorMessage: string | null
  presetErrorMessage: string | null
  onToggle: (featureId: number) => void
  onCreate: (
    payload: CreateAdminVehicleFeaturePayload
  ) => Promise<AdminVehicleFeature>
  onRetry: () => void
}

function ListingEquipmentPicker({
  modelName,
  features,
  suggestions,
  selectedFeatureIds,
  isLoading,
  isCreating,
  catalogErrorMessage,
  presetErrorMessage,
  onToggle,
  onCreate,
  onRetry,
}: ListingEquipmentPickerProps) {
  const [search, setSearch] = useState('')
  const [newFeatureIcon, setNewFeatureIcon] = useState('shield-check')

  const selectedIds = useMemo(
    () => new Set(selectedFeatureIds),
    [selectedFeatureIds]
  )
  const suggestedIds = useMemo(
    () => new Set(suggestions.map((feature) => feature.id)),
    [suggestions]
  )
  const normalizedSearch = search.trim().toLowerCase()

  const visibleFeatures = useMemo(() => {
    const matchingFeatures = normalizedSearch
      ? features.filter((feature) =>
          feature.name.toLowerCase().includes(normalizedSearch)
        )
      : features

    return [...matchingFeatures].sort((first, second) => {
      const firstSelected = selectedIds.has(String(first.id)) ? 1 : 0
      const secondSelected = selectedIds.has(String(second.id)) ? 1 : 0

      if (firstSelected !== secondSelected) {
        return secondSelected - firstSelected
      }

      const firstSuggested = suggestedIds.has(first.id) ? 1 : 0
      const secondSuggested = suggestedIds.has(second.id) ? 1 : 0

      if (firstSuggested !== secondSuggested) {
        return secondSuggested - firstSuggested
      }

      return first.name.localeCompare(second.name)
    })
  }, [features, normalizedSearch, selectedIds, suggestedIds])

  const selectedFeatures = features.filter((feature) =>
    selectedIds.has(String(feature.id))
  )
  const hasExactMatch = features.some(
    (feature) => feature.name.trim().toLowerCase() === normalizedSearch
  )
  const canCreate = normalizedSearch.length >= 2 && !hasExactMatch

  function updateSearch(value: string) {
    setSearch(value)
    setNewFeatureIcon(suggestVehicleFeatureIcon(value))
  }

  return (
    <section className="grid gap-3 rounded-md border bg-background p-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="size-4 shrink-0" />
          {modelName
            ? `${suggestions.length} defaults loaded from ${modelName}. Adjust anything for this car.`
            : 'Select a model to load its defaults, then adjust this car.'}
        </p>

        <span className="text-xs font-medium text-muted-foreground">
          {selectedFeatureIds.length} selected
        </span>
      </div>

      {selectedFeatures.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedFeatures.map((feature) => (
            <span
              key={feature.id}
              className="inline-flex items-center gap-1.5 rounded-md border bg-muted/40 py-1 pl-2 pr-1 text-xs font-medium"
            >
              <VehicleFeatureIcon icon={feature.icon} className="size-3.5" />
              {feature.name}
              <button
                type="button"
                className="grid size-5 place-items-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => onToggle(feature.id)}
                aria-label={`Remove ${feature.name}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <label className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm"
          value={search}
          onChange={(event) => updateSearch(event.target.value)}
          placeholder="Search or create equipment"
        />
      </label>

      {presetErrorMessage && !catalogErrorMessage ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-amber-900">
          <p className="text-sm">
            Model defaults are unavailable. You can still select equipment
            manually.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw />
            Retry
          </Button>
        </div>
      ) : null}

      {catalogErrorMessage ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2">
          <p className="text-sm text-destructive">
            Equipment could not be loaded.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw />
            Retry
          </Button>
        </div>
      ) : null}

      {!catalogErrorMessage && isLoading ? (
        <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <RefreshCw className="size-4 animate-spin" />
          Loading equipment
        </div>
      ) : null}

      {!catalogErrorMessage && !isLoading ? (
        <div className="grid max-h-56 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          {visibleFeatures.map((feature) => {
            const isSelected = selectedIds.has(String(feature.id))
            const isSuggested = suggestedIds.has(feature.id)

            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => onToggle(feature.id)}
                className={cn(
                  'flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                  isSelected && 'border-primary bg-primary/10 font-medium'
                )}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-md border bg-background">
                  <VehicleFeatureIcon
                    icon={feature.icon}
                    className="size-4"
                  />
                </span>
                <span className="min-w-0 flex-1 truncate">{feature.name}</span>
                {isSuggested && !isSelected ? (
                  <Sparkles className="size-3.5 text-muted-foreground" />
                ) : null}
                {isSelected ? <Check className="size-4 text-primary" /> : null}
              </button>
            )
          })}

          {visibleFeatures.length === 0 && !canCreate ? (
            <p className="col-span-full py-5 text-center text-sm text-muted-foreground">
              No equipment matches this search.
            </p>
          ) : null}
        </div>
      ) : null}

      {!catalogErrorMessage && !isLoading && canCreate ? (
        <div className="grid gap-3 rounded-md border border-dashed bg-muted/20 p-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Create “{search.trim()}”</p>
              <p className="text-xs text-muted-foreground">
                It will be added to this car and remain available for future
                listings.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              disabled={isCreating}
              onClick={async () => {
                try {
                  await onCreate({
                    name: search.trim(),
                    icon: newFeatureIcon,
                  })
                  setSearch('')
                } catch {
                  // The mutation owns the error toast.
                }
              }}
            >
              <Plus />
              {isCreating ? 'Creating...' : 'Create and add'}
            </Button>
          </div>

          <VehicleFeatureIconPicker
            value={newFeatureIcon}
            onChange={setNewFeatureIcon}
          />
        </div>
      ) : null}
    </section>
  )
}

export default ListingEquipmentPicker
