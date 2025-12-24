import { useState, useEffect, useCallback } from 'react'
import { useUser } from './useUser'

const COMMENTS_STORAGE_KEY = 'post_comments'

export interface Comment {
  id: string
  username: string
  content: string
  created_at: string
}

interface CommentsData {
  [postId: number]: Comment[]
}

export function useComments(postId: number) {
  const { username } = useUser()
  const [commentsData, setCommentsData] = useState<CommentsData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COMMENTS_STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    }
    return {}
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(commentsData))
    }
  }, [commentsData])

  const comments = commentsData[postId] || []

  const addComment = useCallback(
    (content: string) => {
      if (!username || !content.trim()) return

      const newComment: Comment = {
        id: `${postId}-${Date.now()}-${Math.random()}`,
        username,
        content: content.trim(),
        created_at: new Date().toISOString(),
      }

      setCommentsData((prev) => {
        const currentComments = prev[postId] || []
        return {
          ...prev,
          [postId]: [...currentComments, newComment],
        }
      })
    },
    [postId, username]
  )

  const updateComment = useCallback(
    (commentId: string, newContent: string) => {
      if (!username || !newContent.trim()) return

      setCommentsData((prev) => {
        const currentComments = prev[postId] || []
        const updatedComments = currentComments.map((comment) => {
          if (comment.id === commentId && comment.username === username) {
            return {
              ...comment,
              content: newContent.trim(),
            }
          }
          return comment
        })
        return {
          ...prev,
          [postId]: updatedComments,
        }
      })
    },
    [postId, username]
  )

  const deleteComment = useCallback(
    (commentId: string) => {
      if (!username) return

      setCommentsData((prev) => {
        const currentComments = prev[postId] || []
        const updatedComments = currentComments.filter((comment) => {
          return !(comment.id === commentId && comment.username === username)
        })
        return {
          ...prev,
          [postId]: updatedComments,
        }
      })
    },
    [postId, username]
  )

  return {
    comments,
    addComment,
    updateComment,
    deleteComment,
  }
}
