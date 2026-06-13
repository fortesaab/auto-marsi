import type { AdminMake, AdminMakesResponse } from '../types'

type GetAdminMakesParams = {
  token: string
}

export async function getAdminMakes({
  token,
}: GetAdminMakesParams): Promise<AdminMake[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/makes`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to load makes.')
  }

  const data = (await response.json()) as AdminMakesResponse

  return data.data
}