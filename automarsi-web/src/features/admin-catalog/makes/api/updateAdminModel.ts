import type {
  AdminModel,
  CreateAdminModelResponse,
} from '../types'

type UpdateAdminModelParams = {
  token: string
  modelId: number
  payload: {
    name: string
  }
}

export async function updateAdminModel({
  token,
  modelId,
  payload,
}: UpdateAdminModelParams): Promise<AdminModel> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/car-models/${modelId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to update model.')
  }

  const data = (await response.json()) as CreateAdminModelResponse

  return data.data
}