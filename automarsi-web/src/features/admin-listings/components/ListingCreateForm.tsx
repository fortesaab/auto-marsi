import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'
import VehicleFeatureIcon from '@/features/admin-catalog/features/components/VehicleFeatureIcon'
import type { AdminVehicleFeature } from '@/features/admin-catalog/features/types'
import type { ListingCarModelOption, ListingMakeOption } from '../types'
import {
  conditionOptions,
  fuelTypeOptions,
  listingStatusOptions,
  transmissionOptions,
} from '../form/listingOptions'
import type { ListingFormState } from '../form/listingFormState'

type ListingCreateFormProps = {
  formState: ListingFormState
  makes: ListingMakeOption[]
  carModels: ListingCarModelOption[]
  vehicleFeatures: AdminVehicleFeature[]
  isLoadingOptions: boolean
  isSubmitting: boolean
  errorMessage: string | null
  onCancel: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onFieldChange: (field: keyof ListingFormState, value: string) => void
  onFeatureToggle: (featureId: number) => void
}

function ListingCreateForm({
  formState,
  makes,
  carModels,
  vehicleFeatures,
  isLoadingOptions,
  isSubmitting,
  errorMessage,
  onCancel,
  onSubmit,
  onFieldChange,
  onFeatureToggle,
}: ListingCreateFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-lg border bg-card p-5"
    >
      <div>
        <h3 className="text-lg font-semibold">Add listing</h3>
        <p className="text-sm text-muted-foreground">
          Create a vehicle listing for the admin inventory.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Make">
          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.makeId}
            onChange={(event) => onFieldChange('makeId', event.target.value)}
            required
            disabled={isLoadingOptions}
          >
            <option value="">Select make</option>
            {makes.map((make) => (
              <option key={make.id} value={make.id}>
                {make.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Model">
          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.carModelId}
            onChange={(event) => onFieldChange('carModelId', event.target.value)}
            required
            disabled={!formState.makeId}
          >
            <option value="">Select model</option>
            {carModels.map((carModel) => (
              <option key={carModel.id} value={carModel.id}>
                {carModel.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Title">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.title}
            onChange={(event) => onFieldChange('title', event.target.value)}
            required
          />
        </FormField>

        <FormField label="Year">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            type="number"
            min="1900"
            value={formState.year}
            onChange={(event) => onFieldChange('year', event.target.value)}
            required
          />
        </FormField>

        <FormField label="Price">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            type="number"
            min="0"
            value={formState.price}
            onChange={(event) => onFieldChange('price', event.target.value)}
            required
          />
        </FormField>

        <FormField label="Kilometers">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            type="number"
            min="0"
            value={formState.kilometers}
            onChange={(event) => onFieldChange('kilometers', event.target.value)}
          />
        </FormField>

        <FormField label="Fuel type">
          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.fuelType}
            onChange={(event) => onFieldChange('fuelType', event.target.value)}
            required
          >
            {fuelTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Transmission">
          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.transmission}
            onChange={(event) =>
              onFieldChange('transmission', event.target.value)
            }
            required
          >
            {transmissionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Body type">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.bodyType}
            onChange={(event) => onFieldChange('bodyType', event.target.value)}
            placeholder="SUV"
          />
        </FormField>

        <FormField label="Color">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.color}
            onChange={(event) => onFieldChange('color', event.target.value)}
            placeholder="Black"
          />
        </FormField>

        <FormField label="Condition">
          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.condition}
            onChange={(event) => onFieldChange('condition', event.target.value)}
          >
            {conditionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Status">
          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.status}
            onChange={(event) => onFieldChange('status', event.target.value)}
          >
            {listingStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Location">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={formState.location}
            onChange={(event) => onFieldChange('location', event.target.value)}
            placeholder="Prishtina"
          />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea
          className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
          value={formState.description}
          onChange={(event) => onFieldChange('description', event.target.value)}
        />
      </FormField>

      <FormField label="Features">
        <div className="grid gap-2 rounded-md border bg-background p-3 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleFeatures.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No vehicle features found. Add features in Catalog first.
            </p>
          ) : null}

          {vehicleFeatures.map((feature) => {
            const isSelected = formState.featureIds.includes(String(feature.id))

            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => onFeatureToggle(feature.id)}
                className={
                  isSelected
                    ? 'flex items-center gap-2 rounded-md border border-primary bg-primary/10 px-3 py-2 text-left text-sm font-medium'
                    : 'flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-left text-sm hover:bg-muted'
                }
              >
                <span className="grid size-7 place-items-center rounded-md border bg-background">
                  <VehicleFeatureIcon icon={feature.icon} className="size-4" />
                </span>

                <span>{feature.name}</span>
              </button>
            )
          })}
        </div>
      </FormField>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create listing'}
        </Button>
      </div>
    </form>
  )
}

export default ListingCreateForm
