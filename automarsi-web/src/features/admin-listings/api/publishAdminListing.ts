import type {
  AdminListing,
  CreateAdminListingResponse,
} from '../types'

type PublishAdminListingParams = {
  token: string
  listingId: string
}

export async function publishAdminListing({
  token,
  listingId,
}: PublishAdminListingParams): Promise<AdminListing> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/listings/${listingId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'active',
      published_at: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to publish listing.')
  }

  const data = (await response.json()) as CreateAdminListingResponse

  return data.data
}
