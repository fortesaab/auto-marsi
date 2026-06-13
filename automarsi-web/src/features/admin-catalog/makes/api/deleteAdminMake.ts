type DeleteAdminMakeParams = {
  token: string
  makeId: number
}

export async function deleteAdminMake({
  token,
  makeId,
}: DeleteAdminMakeParams): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/makes/${makeId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete make.')
  }
}