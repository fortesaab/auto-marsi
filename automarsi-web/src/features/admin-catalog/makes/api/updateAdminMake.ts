import type {
  AdminMake,
  CreateAdminMakePayload,
  CreateAdminMakeResponse,
} from '../types'

type UpdateAdminMakeParams = {
  token: string
  makeId: number
  payload: CreateAdminMakePayload
}

export async function updateAdminMake({
  token,
  makeId,
  payload,
}: UpdateAdminMakeParams): Promise<AdminMake> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/makes/${makeId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to update make.')
  }

  const data = (await response.json()) as CreateAdminMakeResponse

  return data.data
}