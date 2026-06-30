import { BadgeEuro } from 'lucide-react'
import FormField from '@/components/admin/FormField'
import {
  conditionOptions,
  listingStatusOptions,
} from '../../form/listingOptions'
import {
  formatPriceInput,
  normalizePriceInput,
  type ListingFormState,
} from '../../form/listingFormState'
import ListingFormSection from './ListingFormSection'

type ListingSaleFieldsProps = {
  formState: ListingFormState
  showStatus: boolean
  onFieldChange: (
    field: keyof ListingFormState,
    value: string
  ) => void | Promise<void>
}

function ListingSaleFields({
  formState,
  showStatus,
  onFieldChange,
}: ListingSaleFieldsProps) {
  return (
    <ListingFormSection
      title="Sale details"
      description="Set the price and the information customers compare first."
      icon={BadgeEuro}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FormField label="Price">
          <div className="relative">
            <input
              className="h-9 w-full rounded-md border bg-background px-3 pr-14 text-sm"
              type="text"
              inputMode="numeric"
              value={formatPriceInput(formState.price)}
              onChange={(event) => {
                void onFieldChange(
                  'price',
                  normalizePriceInput(event.target.value)
                )
              }}
              placeholder="35.000"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
              {formState.currency}
            </span>
          </div>
        </FormField>

        <FormField label="Purchase price">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            type="number"
            min="0"
            value={formState.purchasePrice}
            onChange={(event) => {
              void onFieldChange('purchasePrice', event.target.value)
            }}
            placeholder="28000"
          />
        </FormField>

        <FormField label="Sale price">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            type="number"
            min="0"
            value={formState.salePrice}
            onChange={(event) => {
              void onFieldChange('salePrice', event.target.value)
            }}
            placeholder="35000"
          />
        </FormField>

        <FormField label="Sales expenses">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            type="number"
            min="0"
            value={formState.salesExpenses}
            onChange={(event) => {
              void onFieldChange('salesExpenses', event.target.value)
            }}
            placeholder="500"
          />
        </FormField>

        <FormField label="Kilometers">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            type="number"
            min="0"
            value={formState.kilometers}
            onChange={(event) => {
              void onFieldChange('kilometers', event.target.value)
            }}
            placeholder="85000"
          />
        </FormField>

        <FormField label="Condition">
          <select
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.condition}
            onChange={(event) => {
              void onFieldChange('condition', event.target.value)
            }}
          >
            {conditionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Location">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.location}
            onChange={(event) => {
              void onFieldChange('location', event.target.value)
            }}
            placeholder="Prishtina"
          />
        </FormField>

        {showStatus ? (
          <FormField label="Status">
            <select
              className="h-9 rounded-md border bg-background px-3 text-sm"
              value={formState.status}
              onChange={(event) => {
                void onFieldChange('status', event.target.value)
              }}
            >
              {listingStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
        ) : null}
      </div>

      <FormField label="Sale notes">
        <textarea
          className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
          value={formState.saleNotes}
          onChange={(event) => {
            void onFieldChange('saleNotes', event.target.value)
          }}
          placeholder="Buyer notes, negotiation details, expenses, or next follow-up."
        />
      </FormField>
    </ListingFormSection>
  )
}

export default ListingSaleFields
