export type AdminMake = {
    id: number
    name: string
    slug: string
    logo_url: string | null
}

export type AdminMakesResponse = {
    data: AdminMake[]
}

export type CreateAdminMakePayload = {
    name: string
    logo_url?: string | null
}

export type CreateAdminMakeResponse = {
    data: AdminMake
}