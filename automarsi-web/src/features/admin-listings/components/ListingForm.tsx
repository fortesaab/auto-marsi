import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'
import type {
  AdminVehicleFeature,
  CreateAdminVehicleFeaturePayload,
} from '@/features/admin-catalog/features/types'
import ListingEquipmentPicker from './ListingEquipmentPicker'
import type { ListingCarModelOption, ListingMakeOption } from '../types'
import {
  conditionOptions,
  fuelTypeOptions,
  listingStatusOptions,
  transmissionOptions,
} from '../form/listingOptions'
import {
  formatPriceInput,
  normalizePriceInput,
  type ListingFormState,
} from '../form/listingFormState'

type ListingFormProps = {
  formState: ListingFormState
  makes: ListingMakeOption[]
  carModels: ListingCarModelOption[]
  equipment: {
    features: AdminVehicleFeature[]
    suggestions: AdminVehicleFeature[]
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
  isLoadingOptions: boolean
  isSubmitting: boolean
  errorMessage: string | null
  heading: string
  description: string
  submitLabel: string
  submittingLabel: string
  showStatus?: boolean
  onCancel: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onFieldChange: (
    field: keyof ListingFormState,
    value: string
  ) => void | Promise<void>
}

function ListingForm({
  heading,
  description,
  submitLabel,
  submittingLabel,
  showStatus = true,
  formState,
  makes,
  carModels,
  equipment,
  isLoadingOptions,
  isSubmitting,
  errorMessage,
  onCancel,
  onSubmit,
  onFieldChange,
}: ListingFormProps) {
  const selectedCarModel =
    carModels.find(
      (carModel) => String(carModel.id) === formState.carModelId
    ) ?? null

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-lg border bg-card p-5"
    >
      <div>
        <h3 className="text-lg font-semibold">{heading}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
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
            onChange={(event) => {
              void onFieldChange('makeId', event.target.value)
            }}
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
            onChange={(event) => {
              void onFieldChange('carModelId', event.target.value)
            }}
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
          <div className="relative">
            <input
              className="h-10 w-full rounded-md border bg-background px-3 pr-14 text-sm"
              type="text"
              inputMode="numeric"
              value={formatPriceInput(formState.price)}
              onChange={(event) =>
                onFieldChange(
                  'price',
                  normalizePriceInput(event.target.value)
                )
              }
              placeholder="35.000"
              required
            />

            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
              {formState.currency}
            </span>
          </div>
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

        {showStatus ? (
          <FormField label="Status">
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm"
              value={formState.status}
              onChange={(event) =>
                onFieldChange('status', event.target.value)
              }
            >
              {listingStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
        ) : null}

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

      <FormField label="Equipment">
        <ListingEquipmentPicker
          modelName={selectedCarModel?.name ?? null}
          features={equipment.features}
          suggestions={equipment.suggestions}
          selectedFeatureIds={formState.featureIds}
          isLoading={equipment.isLoading}
          isCreating={equipment.isCreating}
          catalogErrorMessage={equipment.catalogErrorMessage}
          presetErrorMessage={equipment.presetErrorMessage}
          onToggle={equipment.onToggle}
          onCreate={equipment.onCreate}
          onRetry={equipment.onRetry}
        />
      </FormField>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default ListingForm
