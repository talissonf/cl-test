import { useState, useEffect, useCallback } from 'react'
import { useUser } from './useUser'

const LIKES_STORAGE_KEY = 'post_likes'

interface LikesData {
  [postId: number]: {
    count: number
    likedBy: string[]
  }
}

export function useLikes(postId: number) {
  const { username } = useUser()
  const [likesData, setLikesData] = useState<LikesData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LIKES_STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    }
    return {}
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likesData))
    }
  }, [likesData])

  const postLikes = likesData[postId] || { count: 0, likedBy: [] }
  const isLiked = username ? postLikes.likedBy.includes(username) : false
  const count = postLikes.count

  const toggleLike = useCallback(() => {
    if (!username) return

    setLikesData((prev) => {
      const current = prev[postId] || { count: 0, likedBy: [] }
      const isCurrentlyLiked = current.likedBy.includes(username)

      if (isCurrentlyLiked) {
        const newLikedBy = current.likedBy.filter((user) => user !== username)
        return {
          ...prev,
          [postId]: {
            count: Math.max(0, current.count - 1),
            likedBy: newLikedBy,
          },
        }
      } else {
        return {
          ...prev,
          [postId]: {
            count: current.count + 1,
            likedBy: [...current.likedBy, username],
          },
        }
      }
    })
  }, [postId, username])

  return {
    count,
    isLiked,
    toggleLike,
  }
}
