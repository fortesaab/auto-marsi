import { usePublicMakeOptions } from '../hooks/usePublicMakeOptions'
import type { PublicListingFilters as PublicListingFilterValues } from '../types'
import { useI18n } from '@/i18n/useI18n'

const fieldClassName =
  'grid min-w-0 gap-1.5 text-sm font-medium text-foreground'

const controlClassName =
  'h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60'

const selectClassName = `${controlClassName} appearance-none pr-9`

type PublicListingFiltersProps = {
  filters: PublicListingFilterValues
  onFiltersChange: (filters: PublicListingFilterValues) => void
}

function PublicListingFilters({
  filters,
  onFiltersChange,
}: PublicListingFiltersProps) {
  const { messages } = useI18n()
  const { makes, models, makesQuery, modelsQuery } = usePublicMakeOptions({
    makeId: filters.make_id,
  })

  function updateFilter(key: keyof PublicListingFilterValues, value: string) {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1,
    })
  }

  function updateMake(makeId: string) {
    onFiltersChange({
      ...filters,
      make_id: makeId,
      car_model_id: '',
      page: 1,
    })
  }

  function clearFilters() {
    onFiltersChange({
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
    })
  }

  return (
    <aside className="h-fit rounded-lg border bg-card text-card-foreground shadow-xs">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <h2 className="font-semibold">{messages.inventory.filters.title}</h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-muted-foreground transition hover:text-red-600"
        >
          {messages.inventory.filters.reset}
        </button>
      </div>

      <div className="grid gap-4 p-4">
        <label className={fieldClassName}>
          {messages.inventory.filters.make}
          <select
            value={filters.make_id}
            onChange={(event) => updateMake(event.target.value)}
            className={selectClassName}
            disabled={makesQuery.isLoading}
          >
            <option value="">
              {makesQuery.isLoading
                ? messages.inventory.filters.loadingMakes
                : messages.inventory.filters.allMakes}
            </option>

            {makes.map((make) => (
              <option key={make.id} value={make.id}>
                {make.name}
              </option>
            ))}
          </select>
        </label>

        <label className={fieldClassName}>
          {messages.inventory.filters.model}
          <select
            value={filters.car_model_id}
            onChange={(event) =>
              updateFilter('car_model_id', event.target.value)
            }
            className={selectClassName}
            disabled={!filters.make_id || modelsQuery.isLoading}
          >
            <option value="">
              {!filters.make_id
                ? messages.inventory.filters.selectMakeFirst
                : modelsQuery.isLoading
                  ? messages.inventory.filters.loadingModels
                  : messages.inventory.filters.allModels}
            </option>

            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </label>

        <label className={fieldClassName}>
          {messages.inventory.filters.keyword}
          <input
            value={filters.search}
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder={messages.inventory.filters.searchPlaceholder}
            className={controlClassName}
          />
        </label>

        <label className={fieldClassName}>
          {messages.inventory.filters.year}
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
            {messages.inventory.filters.minPrice}
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
            {messages.inventory.filters.maxPrice}
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
          {messages.inventory.filters.fuelType}
          <select
            value={filters.fuel_type}
            onChange={(event) => updateFilter('fuel_type', event.target.value)}
            className={selectClassName}
          >
            <option value="">{messages.inventory.filters.any}</option>
            <option value="diesel">{messages.inventory.values.diesel}</option>
            <option value="petrol">{messages.inventory.values.petrol}</option>
            <option value="hybrid">{messages.inventory.values.hybrid}</option>
            <option value="electric">
              {messages.inventory.values.electric}
            </option>
          </select>
        </label>

        <label className={fieldClassName}>
          {messages.inventory.filters.transmission}
          <select
            value={filters.transmission}
            onChange={(event) =>
              updateFilter('transmission', event.target.value)
            }
            className={selectClassName}
          >
            <option value="">{messages.inventory.filters.any}</option>
            <option value="automatic">
              {messages.inventory.values.automatic}
            </option>
            <option value="manual">{messages.inventory.values.manual}</option>
          </select>
        </label>

        <label className={fieldClassName}>
          {messages.inventory.filters.bodyType}
          <select
            value={filters.body_type}
            onChange={(event) => updateFilter('body_type', event.target.value)}
            className={selectClassName}
          >
            <option value="">{messages.inventory.filters.any}</option>
            <option value="sedan">{messages.inventory.values.sedan}</option>
            <option value="suv">{messages.inventory.values.suv}</option>
            <option value="hatchback">
              {messages.inventory.values.hatchback}
            </option>
            <option value="wagon">{messages.inventory.values.wagon}</option>
            <option value="coupe">{messages.inventory.values.coupe}</option>
          </select>
        </label>
      </div>
    </aside>
  )
}

export default PublicListingFilters
