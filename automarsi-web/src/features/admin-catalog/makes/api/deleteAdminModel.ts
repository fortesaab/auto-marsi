type DeleteAdminModelParams = {
  token: string
  modelId: number
}

export async function deleteAdminModel({
  token,
  modelId,
}: DeleteAdminModelParams): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/car-models/${modelId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete model.')
  }
}