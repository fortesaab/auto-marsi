import { Settings2 } from 'lucide-react'
import FormField from '@/components/admin/FormField'
import {
  fuelTypeOptions,
  transmissionOptions,
} from '../../form/listingOptions'
import type { ListingFormState } from '../../form/listingFormState'
import ListingFormSection from './ListingFormSection'

type ListingSpecificationFieldsProps = {
  formState: ListingFormState
  onFieldChange: (
    field: keyof ListingFormState,
    value: string
  ) => void | Promise<void>
}

function ListingSpecificationFields({
  formState,
  onFieldChange,
}: ListingSpecificationFieldsProps) {
  return (
    <ListingFormSection
      title="Specifications"
      description="Record the essential technical details."
      icon={Settings2}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <FormField label="Fuel type">
          <select
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.fuelType}
            onChange={(event) => {
              void onFieldChange('fuelType', event.target.value)
            }}
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
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.transmission}
            onChange={(event) => {
              void onFieldChange('transmission', event.target.value)
            }}
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
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.bodyType}
            onChange={(event) => {
              void onFieldChange('bodyType', event.target.value)
            }}
            placeholder="SUV"
          />
        </FormField>

        <FormField label="Color">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.color}
            onChange={(event) => {
              void onFieldChange('color', event.target.value)
            }}
            placeholder="Black"
          />
        </FormField>
        <FormField label="Engine size">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.engineSize}
            onChange={(event) => {
              void onFieldChange('engineSize', event.target.value)
            }}
            placeholder="2.0"
            inputMode="decimal"
          />
        </FormField>

        <FormField label="Horsepower">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.horsepower}
            onChange={(event) => {
              void onFieldChange('horsepower', event.target.value)
            }}
            placeholder="245"
            inputMode="numeric"
          />
        </FormField>
      </div>
    </ListingFormSection>
  )
}

export default ListingSpecificationFields
