import type {
  AdminMake,
  CreateAdminMakePayload,
  CreateAdminMakeResponse,
} from '../types'

type CreateAdminMakeParams = {
  token: string
  payload: CreateAdminMakePayload
}

export async function createAdminMake({
  token,
  payload,
}: CreateAdminMakeParams): Promise<AdminMake> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/makes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to create make.')
  }

  const data = (await response.json()) as CreateAdminMakeResponse

  return data.data
}