import type { PublicListingFilters as PublicListingFilterValues } from '../types'

const fieldClassName =
  'grid min-w-0 gap-1.5 text-sm font-medium text-foreground'

const controlClassName =
  'h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'

const selectClassName = `${controlClassName} appearance-none pr-9`

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
    <aside className="h-fit rounded-lg border bg-card text-card-foreground shadow-xs">
      <div className="flex items-center justify-between gap-3">
        <h2 className="p-4 pb-0 font-semibold">Filters</h2>
        <button
          type="button"
          onClick={clearFilters}
          className="mr-4 mt-4 text-xs font-medium text-red-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-4 p-4">
        <label className={fieldClassName}>
          Search
          <input
            value={filters.search}
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Search vehicles"
            className={controlClassName}
          />
        </label>

        <label className={fieldClassName}>
          Year
          <input
            value={filters.year}
            onChange={(event) => updateFilter('year', event.target.value)}
            placeholder="2020"
            inputMode="numeric"
            className={controlClassName}
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <label className={fieldClassName}>
            Min price
            <input
              value={filters.min_price}
              onChange={(event) =>
                updateFilter('min_price', event.target.value)
              }
              placeholder="10000"
              inputMode="numeric"
              className={controlClassName}
            />
          </label>

          <label className={fieldClassName}>
            Max price
            <input
              value={filters.max_price}
              onChange={(event) =>
                updateFilter('max_price', event.target.value)
              }
              placeholder="50000"
              inputMode="numeric"
              className={controlClassName}
            />
          </label>
        </div>

        <label className={fieldClassName}>
          Fuel type
          <select
            value={filters.fuel_type}
            onChange={(event) => updateFilter('fuel_type', event.target.value)}
            className={selectClassName}
          >
            <option value="">Any</option>
            <option value="diesel">Diesel</option>
            <option value="petrol">Petrol</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
        </label>

        <label className={fieldClassName}>
          Transmission
          <select
            value={filters.transmission}
            onChange={(event) =>
              updateFilter('transmission', event.target.value)
            }
            className={selectClassName}
          >
            <option value="">Any</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </label>

        <label className={fieldClassName}>
          Body type
          <select
            value={filters.body_type}
            onChange={(event) => updateFilter('body_type', event.target.value)}
            className={selectClassName}
          >
            <option value="">Any</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
            <option value="wagon">Wagon</option>
            <option value="coupe">Coupe</option>
          </select>
        </label>
      </div>
    </aside>
  )
}

export default PublicListingFilters
