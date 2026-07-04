import { Edit, Plus, Trash2 } from 'lucide-react'
import AdminSurface from '@/components/admin/AdminSurface'
import { Button } from '@/components/ui/button'
import type { AdminVehicleFeature } from '../types'
import VehicleFeatureIcon from './VehicleFeatureIcon'

type FeatureCatalogBoardProps = {
  features: AdminVehicleFeature[]
  isDeleting: boolean
  isToggling: boolean
  onAdd: () => void
  onEdit: (feature: AdminVehicleFeature) => void
  onToggle: (feature: AdminVehicleFeature) => Promise<void>
  onDelete: (featureId: number) => Promise<void>
}

type FeatureGroup = 'Safety' | 'Comfort' | 'Infotainment' | 'Performance'

const groupColors: Record<FeatureGroup, string> = {
  Safety: 'bg-emerald-500',
  Comfort: 'bg-amber-500',
  Infotainment: 'bg-sky-500',
  Performance: 'bg-foreground',
}

function featureGroup(feature: AdminVehicleFeature): FeatureGroup {
  const value = `${feature.name} ${feature.icon ?? ''}`.toLowerCase()

  if (
    value.includes('cruise') ||
    value.includes('parking') ||
    value.includes('camera') ||
    value.includes('assist') ||
    value.includes('safety') ||
    value.includes('shield')
  ) {
    return 'Safety'
  }

  if (
    value.includes('sound') ||
    value.includes('bluetooth') ||
    value.includes('navigation') ||
    value.includes('display') ||
    value.includes('phone')
  ) {
    return 'Infotainment'
  }

  if (
    value.includes('sport') ||
    value.includes('performance') ||
    value.includes('power') ||
    value.includes('gauge')
  ) {
    return 'Performance'
  }

  return 'Comfort'
}

function FeatureCatalogBoard({
  features,
  isDeleting,
  isToggling,
  onAdd,
  onEdit,
  onToggle,
  onDelete,
}: FeatureCatalogBoardProps) {
  const groups = features.reduce<Record<FeatureGroup, number>>(
    (summary, feature) => {
      summary[featureGroup(feature)] += 1

      return summary
    },
    {
      Safety: 0,
      Comfort: 0,
      Infotainment: 0,
      Performance: 0,
    }
  )
  const maxGroupValue = Math.max(...Object.values(groups), 1)

  return (
    <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <AdminSurface>
        <div className="border-b px-5 py-4">
          <h3 className="text-base font-bold tracking-[-0.03em]">
            Feature catalog
          </h3>
          <p className="text-xs text-muted-foreground">
            Options buyers can filter and search by
          </p>
        </div>

        <div className="divide-y">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="flex items-center justify-between gap-4 px-5 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-muted">
                  <VehicleFeatureIcon
                    icon={feature.icon}
                    className="size-4 text-foreground"
                  />
                </span>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-bold tracking-[-0.02em]">
                    {feature.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {featureGroup(feature)} · {feature.listings_count ?? 0}{' '}
                    vehicles
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className={`relative h-6 w-10 rounded-full transition ${
                    feature.is_active ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                  disabled={isToggling}
                  onClick={() => onToggle(feature)}
                  aria-pressed={feature.is_active}
                  aria-label={`Turn ${feature.name} ${
                    feature.is_active ? 'off' : 'on'
                  }`}
                >
                  <span
                    className={`absolute top-1 size-4 rounded-full bg-white transition ${
                      feature.is_active ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="size-8 rounded-xl"
                  onClick={() => onEdit(feature)}
                  aria-label={`Edit ${feature.name}`}
                >
                  <Edit className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="size-8 rounded-xl"
                  disabled={isDeleting}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `Delete ${feature.name}?`
                    )

                    if (!confirmed) {
                      return
                    }

                    await onDelete(feature.id)
                  }}
                  aria-label={`Delete ${feature.name}`}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </AdminSurface>

      <div className="grid content-start gap-4">
        <AdminSurface>
          <div className="grid gap-4 p-5">
            <div>
              <h3 className="text-base font-bold tracking-[-0.03em]">
                Feature groups
              </h3>
              <p className="text-xs text-muted-foreground">
                Derived from feature names and icons
              </p>
            </div>

            <div className="grid gap-3">
              {Object.entries(groups).map(([group, count]) => (
                <div key={group} className="grid gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">{group}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={groupColors[group as FeatureGroup]}
                      style={{
                        width: `${Math.max((count / maxGroupValue) * 100, 8)}%`,
                        height: '100%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminSurface>

        <button
          type="button"
          className="flex items-center gap-4 rounded-2xl bg-foreground p-5 text-left text-background shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
          onClick={onAdd}
        >
          <span className="grid size-11 place-items-center rounded-xl bg-amber-400/20 text-amber-300">
            <Plus className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-bold">Add a feature</span>
            <span className="text-xs text-background/60">
              Create a new filterable option
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default FeatureCatalogBoard
