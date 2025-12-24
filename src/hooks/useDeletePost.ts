import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from './useUser'
import { apiBaseURL } from '../utils/appConfig'

export function useDeletePost(postId: number, postUsername: string) {
  const queryClient = useQueryClient()
  const { username: currentUsername, isOwner } = useUser()

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!currentUsername || !isOwner(postUsername)) {
        throw new Error('You do not have permission to delete this post')
      }

      const response = await fetch(`${apiBaseURL}${postId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
