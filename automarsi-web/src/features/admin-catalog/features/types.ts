export type AdminVehicleFeature = {
  id: number
  name: string
  slug: string
  icon: string | null
  is_active: boolean
  listings_count?: number
}

export type AdminVehicleFeaturesResponse = {
  data: AdminVehicleFeature[]
}

export type AdminVehicleFeatureResponse = {
  data: AdminVehicleFeature
}

export type CreateAdminVehicleFeaturePayload = {
  name: string
  icon: string | null
  is_active?: boolean
}

export type UpdateAdminVehicleFeaturePayload = {
  name?: string
  icon?: string | null
  is_active?: boolean
}
