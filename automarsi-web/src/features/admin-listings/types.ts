export type ListingMakeOption = {
  id: number
  name: string
  slug: string
}

export type ListingCarModelOption = {
  id: number
  make_id: number
  name: string
  slug: string
}

export type CreateAdminListingPayload = {
  make_id: number
  car_model_id: number
  title: string
  year: number
  price: number
  currency: string
  kilometers?: number | null
  fuel_type: string
  transmission: string
  body_type?: string | null
  color?: string | null
  condition: string
  status: string
  location?: string | null
  description?: string | null
  feature_ids: number[]
}

export type CreateAdminListingResponse = {
  data: AdminListing
}
export type AdminListingMake = {
  id: number
  name: string
  slug?: string
}

export type AdminListingCarModel = {
  id: number
  make_id?: number
  name: string
  slug?: string
}

export type AdminListingImage = {
  id: number
  image_url: string
  alt_text: string | null
  sort_order?: number
  is_primary?: boolean
}

export type AdminListing = {
  id: number
  make: AdminListingMake | null
  car_model: AdminListingCarModel | null

  title: string
  slug: string
  description: string | null

  year: number
  price: string
  currency: string
  kilometers: number | null

  fuel_type: string
  transmission: string
  body_type: string | null
  color: string | null

  engine_size: string | null
  horsepower: number | null
  vin: string | null
  registration_until: string | null

  condition: string
  status: string
  is_featured: boolean
  location: string | null

  published_at: string | null
  sold_at: string | null

  primary_image: AdminListingImage | null
}

export type PaginationMeta = {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export type AdminListingsResponse = {
  data: AdminListing[]
  meta: PaginationMeta
}
