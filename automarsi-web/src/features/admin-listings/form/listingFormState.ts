import type {
  AdminListing,
  CreateAdminListingPayload,
} from '../types'

export type ListingFormState = {
  makeId: string
  carModelId: string
  title: string
  year: string
  price: string
  purchasePrice: string
  salePrice: string
  salesExpenses: string
  saleNotes: string
  currency: string
  kilometers: string
  fuelType: string
  transmission: string
  bodyType: string
  color: string
  condition: string
  status: string
  location: string
  description: string
  featureIds: string[]
  engineSize: string
  horsepower: string
  vin: string
  registrationUntil: string
}

export const initialListingFormState: ListingFormState = {
  makeId: '',
  carModelId: '',
  title: '',
  year: String(new Date().getFullYear()),
  price: '',
  purchasePrice: '',
  salePrice: '',
  salesExpenses: '',
  saleNotes: '',
  currency: 'EUR',
  kilometers: '',
  fuelType: 'diesel',
  transmission: 'automatic',
  bodyType: '',
  color: '',
  condition: 'used',
  status: 'draft',
  location: '',
  description: '',
  featureIds: [],
  engineSize: '',
  horsepower: '',
  vin: '',
  registrationUntil: '',
}

export function listingToFormState(
  listing: AdminListing
): ListingFormState {
  return {
    makeId: listing.make ? String(listing.make.id) : '',
    carModelId: listing.car_model
      ? String(listing.car_model.id)
      : '',
    title: listing.title,
    year: String(listing.year),
    price: String(Math.trunc(Number(listing.price))),
    purchasePrice:
      listing.purchase_price === null
        ? ''
        : String(Math.trunc(Number(listing.purchase_price))),
    salePrice:
      listing.sale_price === null
        ? ''
        : String(Math.trunc(Number(listing.sale_price))),
    salesExpenses:
      listing.sales_expenses === null
        ? ''
        : String(Math.trunc(Number(listing.sales_expenses))),
    saleNotes: listing.sale_notes ?? '',
    currency: listing.currency,
    kilometers:
      listing.kilometers === null
        ? ''
        : String(listing.kilometers),
    fuelType: listing.fuel_type,
    transmission: listing.transmission,
    bodyType: listing.body_type ?? '',
    color: listing.color ?? '',
    condition: listing.condition,
    status: listing.status,
    location: listing.location ?? '',
    description: listing.description ?? '',
    engineSize: listing.engine_size ?? '',
    horsepower:
      listing.horsepower === null
        ? ''
        : String(listing.horsepower),
    vin: listing.vin ?? '',
    registrationUntil: listing.registration_until ?? '',
    featureIds: listing.features.map((feature) =>
      String(feature.id)
    ),
  }
}

function nullableText(value: string): string | null {
  const trimmedValue = value.trim()

  return trimmedValue ? trimmedValue : null
}

function nullableNumber(value: string): number | null {
  return value ? Number(value) : null
}

export function buildListingPayload(
  formState: ListingFormState
): CreateAdminListingPayload {
  return {
    make_id: Number(formState.makeId),
    car_model_id: Number(formState.carModelId),
    title: formState.title.trim(),
    year: Number(formState.year),
    price: Number(formState.price),
    purchase_price: nullableNumber(formState.purchasePrice),
    sale_price: nullableNumber(formState.salePrice),
    sales_expenses: nullableNumber(formState.salesExpenses),
    sale_notes: nullableText(formState.saleNotes),
    currency: formState.currency,
    kilometers: nullableNumber(formState.kilometers),
    fuel_type: formState.fuelType,
    transmission: formState.transmission,
    body_type: nullableText(formState.bodyType),
    color: nullableText(formState.color),
    condition: formState.condition,
    status: formState.status,
    location: nullableText(formState.location),
    description: nullableText(formState.description),
    feature_ids: formState.featureIds.map(Number),
    engine_size: nullableNumber(formState.engineSize),
    horsepower: nullableNumber(formState.horsepower),
    vin: nullableText(formState.vin),
    registration_until: nullableText(formState.registrationUntil),
  }
}

export function buildGeneratedListingTitle({
  year,
  make,
  model,
}: {
  year: string
  make?: string
  model?: string
}): string {
  return [year.trim(), make?.trim(), model?.trim()]
    .filter(Boolean)
    .join(' ')
}

export function normalizePriceInput(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/^0+(?=\d)/, '')
}

export function formatPriceInput(value: string): string {
  if (!value) {
    return ''
  }

  return new Intl.NumberFormat('de-DE').format(Number(value))
}
