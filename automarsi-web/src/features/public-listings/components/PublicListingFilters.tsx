import type { PublicListingFilters as PublicListingFilterValues } from '../types'

type PublicListingFiltersProps = {
  filters: PublicListingFilterValues
  onFiltersChange: (filters: PublicListingFilterValues) => void
}

function PublicListingFilters({
  filters,
  onFiltersChange,
}: PublicListingFiltersProps) {
  function updateFilter(key: keyof PublicListingFilterValues, value: string) {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1,
    })
  }

  function clearFilters() {
    onFiltersChange({
      page: 1,
      search: '',
      year: '',
      min_price: '',
      max_price: '',
      fuel_type: '',
      transmission: '',
      body_type: '',
    })
  }

  return (
    <aside className="grid gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-xs">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Filters</h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-red-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <label className="grid gap-1.5 text-sm">
        Search
        <input
          value={filters.search}
          onChange={(event) => updateFilter('search', event.target.value)}
          placeholder="Search vehicles"
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        />
      </label>

      <label className="grid gap-1.5 text-sm">
        Year
        <input
          value={filters.year}
          onChange={(event) => updateFilter('year', event.target.value)}
          placeholder="2020"
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1.5 text-sm">
          Min price
          <input
            value={filters.min_price}
            onChange={(event) => updateFilter('min_price', event.target.value)}
            placeholder="10000"
            className="h-9 rounded-lg border bg-background px-3 text-sm"
          />
        </label>

        <label className="grid gap-1.5 text-sm">
          Max price
          <input
            value={filters.max_price}
            onChange={(event) => updateFilter('max_price', event.target.value)}
            placeholder="50000"
            className="h-9 rounded-lg border bg-background px-3 text-sm"
          />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        Fuel type
        <select
          value={filters.fuel_type}
          onChange={(event) => updateFilter('fuel_type', event.target.value)}
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="">Any</option>
          <option value="diesel">Diesel</option>
          <option value="petrol">Petrol</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>
        </select>
      </label>

      <label className="grid gap-1.5 text-sm">
        Transmission
        <select
          value={filters.transmission}
          onChange={(event) =>
            updateFilter('transmission', event.target.value)
          }
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="">Any</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </label>

      <label className="grid gap-1.5 text-sm">
        Body type
        <select
          value={filters.body_type}
          onChange={(event) => updateFilter('body_type', event.target.value)}
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="">Any</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="hatchback">Hatchback</option>
          <option value="wagon">Wagon</option>
          <option value="coupe">Coupe</option>
        </select>
      </label>
    </aside>
  )
}

export default PublicListingFilters
