export type PublicListingMake = {
  id: number
  name: string
  slug?: string
}

export type PublicListingCarModel = {
  id: number
  make_id?: number
  name: string
  slug?: string
}

export type PublicListingImage = {
  id: number
  image_url: string | null
  alt_text: string | null
  sort_order?: number
  is_primary?: boolean
}

export type PublicListing = {
  id: number
  make: PublicListingMake | null
  car_model: PublicListingCarModel | null
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
  condition: string
  status: string
  is_featured: boolean
  location: string | null
  published_at: string | null
  primary_image: PublicListingImage | null
  images: PublicListingImage[]
}

export type PublicListingFilters = {
  page: number
  search: string
  year: string
  min_price: string
  max_price: string
  fuel_type: string
  transmission: string
  body_type: string
}

export type PublicListingsResponse = {
  data: PublicListing[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
