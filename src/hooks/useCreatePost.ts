import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiBaseURL } from '../utils/appConfig'

interface CreatePostData {
  username: string
  title: string
  content: string
}

interface CreatePostResponse {
  id?: number
  username: string
  title: string
  content: string
  created_datetime?: string
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation<CreatePostResponse, Error, CreatePostData>({
    mutationFn: async (data: CreatePostData) => {
      const response = await fetch(apiBaseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          title: data.title,
          content: data.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro ao criar post: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
