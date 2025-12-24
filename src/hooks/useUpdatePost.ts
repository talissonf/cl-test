import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from './useUser'
import { apiBaseURL } from '../utils/appConfig'

interface UpdatePostData {
  title: string
  content: string
}

interface UpdatePostResponse {
  id: number
  username: string
  title: string
  content: string
  created_datetime: string
}

export function useUpdatePost(postId: number, postUsername: string) {
  const queryClient = useQueryClient()
  const { username: currentUsername, isOwner } = useUser()

  return useMutation<UpdatePostResponse, Error, UpdatePostData>({
    mutationFn: async (data: UpdatePostData) => {
      if (!currentUsername || !isOwner(postUsername)) {
        throw new Error('You do not have permission to edit this post')
      }

      const response = await fetch(`${apiBaseURL}${postId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error updating post: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
