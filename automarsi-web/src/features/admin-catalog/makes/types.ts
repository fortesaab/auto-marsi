export type AdminMake = {
  id: number
  name: string
  slug: string
  logo_url: string | null
  models_count?: number
  listings_count?: number
  models?: AdminModel[]
}

export type AdminModel = {
  id: number
  make_id: number
  name: string
  slug: string
}

export type AdminMakesResponse = {
  data: AdminMake[]
}

export type AdminModelsResponse = {
  data: AdminModel[]
}

export type CreateAdminMakePayload = {
  name: string
  logo_url?: string | null
}

export type CreateAdminMakeResponse = {
  data: AdminMake
}

export type CreateAdminModelPayload = {
  make_id: number
  name: string
}

export type CreateAdminModelResponse = {
  data: AdminModel
}

export type CatalogModelSuggestion = {
  name: string
}

export type CatalogModelSuggestionsResponse = {
  data: CatalogModelSuggestion[]
}

export type ImportCatalogModelsPayload = {
  make_id: number
  models: string[]
}

export type ImportCatalogModelsResponse = {
  data: AdminModel[]
}
