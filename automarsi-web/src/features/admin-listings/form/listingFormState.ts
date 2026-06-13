import type { CreateAdminListingPayload } from '../types'

export type ListingFormState = {
  makeId: string
  carModelId: string
  title: string
  year: string
  price: string
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
}

export const initialListingFormState: ListingFormState = {
  makeId: '',
  carModelId: '',
  title: '',
  year: String(new Date().getFullYear()),
  price: '',
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
}

function nullableText(value: string): string | null {
  const trimmedValue = value.trim()

  return trimmedValue.length > 0 ? trimmedValue : null
}

function nullableNumber(value: string): number | null {
  if (!value) {
    return null
  }

  return Number(value)
}

export function buildCreateListingPayload(
  formState: ListingFormState
): CreateAdminListingPayload {
  return {
    make_id: Number(formState.makeId),
    car_model_id: Number(formState.carModelId),
    title: formState.title.trim(),
    year: Number(formState.year),
    price: Number(formState.price),
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
  }
}
