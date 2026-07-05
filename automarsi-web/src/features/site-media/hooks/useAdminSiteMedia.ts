import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/hooks/useAdminToken'
import { getAdminSiteMedia } from '../api/getAdminSiteMedia'
import { updateAdminSiteMedia } from '../api/updateAdminSiteMedia'

export function useAdminSiteMedia(key: string) {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()

  const mediaQuery = useQuery({
    queryKey: ['admin', 'site-media', key],
    enabled: isAuthReady,
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminSiteMedia({ token, key })
    },
  })

  const updateMediaMutation = useMutation({
    mutationFn: async ({
      images,
      altText,
    }: {
      images: File[]
      altText: string
    }) => {
      const token = await getAdminToken()

      return Promise.all(
        images.map((image) =>
          updateAdminSiteMedia({
            token,
            key,
            image,
            altText,
          })
        )
      )
    },
    onSuccess: async () => {
      toast.success('About image updated.')

      await queryClient.invalidateQueries({
        queryKey: ['admin', 'site-media', key],
      })
      await queryClient.invalidateQueries({
        queryKey: ['public', 'site-media', key],
      })
    },
  })

  return {
    mediaItems: mediaQuery.data ?? [],
    mediaQuery,
    updateMediaMutation,
    errorMessage:
      mediaQuery.error instanceof Error
        ? mediaQuery.error.message
        : updateMediaMutation.error instanceof Error
          ? updateMediaMutation.error.message
          : null,
  }
}
