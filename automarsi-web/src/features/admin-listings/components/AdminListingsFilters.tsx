import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getListingCarModels } from '../api/getListingCarModels'
import { getListingMakes } from '../api/getListingMakes'
import { conditionOptions, listingStatusOptions } from '../form/listingOptions'

type AdminListingsFiltersProps = {
  search: string
  status: string
  condition: string
  makeId: string
  carModelId: string
  isFeatured: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
  onConditionChange: (value: string) => void
  onMakeChange: (value: string) => void
  onCarModelChange: (value: string) => void
  onFeaturedChange: (value: string) => void
  onClearFilters: () => void
}

function AdminListingsFilters({
  search,
  status,
  condition,
  makeId,
  carModelId,
  isFeatured,
  onSearchChange,
  onStatusChange,
  onConditionChange,
  onMakeChange,
  onCarModelChange,
  onFeaturedChange,
  onClearFilters,
}: AdminListingsFiltersProps) {
  const selectedMakeId = Number(makeId)

  const makesQuery = useQuery({
    queryKey: ['admin-listing-filters', 'makes'],
    queryFn: getListingMakes,
    staleTime: 60_000,
  })

  const carModelsQuery = useQuery({
    queryKey: ['admin-listing-filters', 'car-models', selectedMakeId],
    enabled: selectedMakeId > 0,
    queryFn: () => getListingCarModels(selectedMakeId),
    staleTime: 60_000,
  })

  const hasActiveFilter =
    search ||
    status ||
    condition ||
    makeId ||
    carModelId ||
    isFeatured

  return (
    <div className="grid gap-3 border-b p-4">
      <div className="grid gap-3 md:grid-cols-[minmax(220px,1.5fr)_repeat(5,minmax(0,1fr))_auto]">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search title, VIN, location"
          className="h-9 rounded-md border bg-background px-3 text-sm"
        />

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">All statuses</option>
          {listingStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={condition}
          onChange={(event) => onConditionChange(event.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">All conditions</option>
          {conditionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={makeId}
          onChange={(event) => onMakeChange(event.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm"
          disabled={makesQuery.isLoading}
        >
          <option value="">All makes</option>
          {makesQuery.data?.map((make) => (
            <option key={make.id} value={make.id}>
              {make.name}
            </option>
          ))}
        </select>

        <select
          value={carModelId}
          onChange={(event) => onCarModelChange(event.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm"
          disabled={!makeId || carModelsQuery.isLoading}
        >
          <option value="">All models</option>
          {carModelsQuery.data?.map((carModel) => (
            <option key={carModel.id} value={carModel.id}>
              {carModel.name}
            </option>
          ))}
        </select>

        <select
          value={isFeatured}
          onChange={(event) => onFeaturedChange(event.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Featured: all</option>
          <option value="1">Featured only</option>
          <option value="0">Not featured</option>
        </select>

        <Button
          type="button"
          variant="outline"
          disabled={!hasActiveFilter}
          onClick={onClearFilters}
        >
          <X />
          Clear
        </Button>
      </div>
    </div>
  )
}

export default AdminListingsFilters
