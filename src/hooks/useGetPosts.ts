import { useInfiniteQuery } from '@tanstack/react-query'
import { apiBaseURL } from '../utils/appConfig'

export interface Post {
  id: number
  username: string
  title: string
  content: string
  created_datetime: string
}

interface GetPostsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Post[]
}

interface UseGetPostsParams {
  limit?: number
  username?: string
}

export function useGetPosts(params?: UseGetPostsParams) {
  const limit = params?.limit || 5

  return useInfiniteQuery<GetPostsResponse, Error, GetPostsResponse, (string | undefined)[], number>({
    queryKey: ['posts', params?.username],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      const searchParams = new URLSearchParams({
        limit: limit.toString(),
        offset: pageParam.toString(),
      })

      if (params?.username) {
        searchParams.append('username', params.username)
      }

      const response = await fetch(
        `${apiBaseURL}?${searchParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Erro ao buscar posts: ${response.statusText}`)
      }

      return response.json()
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Se next não for null, ainda há mais dados para carregar
      if (lastPage.next !== null) {
        // Calcula o offset baseado no total de resultados já carregados
        const totalLoaded = allPages.reduce((acc, page) => acc + page.results.length, 0)
        return totalLoaded
      }
      return undefined
    },
  })
}
