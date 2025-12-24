import { useEffect, useMemo, useRef } from 'react'

import styles from '../css/list-posts.module.css'

import type { Post } from '../hooks/useGetPosts'
import { useGetPosts } from '../hooks/useGetPosts'

import PostCard from './post-card'

import PostCardSkeleton from './post-card-skeleton'

interface PostListProps {
  username?: string
}

export default function PostList({ username }: PostListProps) {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useGetPosts({
    limit: 5,
    username: username || undefined,
  })

  const observerTarget = useRef<HTMLDivElement>(null)

  const infiniteData = data as
    | { pages: Array<{ next: string | null; results: Post[] }> }
    | undefined
  const lastPage = infiniteData?.pages?.[infiniteData.pages.length - 1]
  const hasMoreData = lastPage?.next !== null && lastPage?.next !== undefined

  useEffect(() => {
    if (!hasMoreData) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreData && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMoreData, isFetchingNextPage, fetchNextPage])

  const posts = infiniteData?.pages.flatMap((page) => page.results) || []
  const currentPagesCount = infiniteData?.pages.length || 0

  const previousPostsCount = useMemo(() => {
    if (!infiniteData || !infiniteData.pages || currentPagesCount <= 1) return 0
    return infiniteData.pages
      .slice(0, currentPagesCount - 1)
      .reduce((acc, page) => acc + page.results.length, 0)
  }, [infiniteData, currentPagesCount])

  const shouldAnimateNewPosts =
    !isFetchingNextPage && currentPagesCount > 1 && previousPostsCount > 0
  const newPostsStartIndex = previousPostsCount

  if (isLoading) {
    return (
      <div className={styles.postList}>
        {Array.from({ length: 5 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.postList}>
      {posts.length > 0 ? (
        posts.map((post: Post, index: number) => {
          const isNew = shouldAnimateNewPosts && index >= newPostsStartIndex
          const delayIndex = isNew ? index - newPostsStartIndex : 0

          return (
            <div
              key={post.id}
              className={isNew ? styles.newPostCard : ''}
              style={isNew ? { animationDelay: `${delayIndex * 0.1}s` } : {}}
            >
              <PostCard post={post} />
            </div>
          )
        })
      ) : (
        <div className={styles.emptyState}>No posts found</div>
      )}

      <div ref={observerTarget} className={styles.observerTarget}>
        {isFetchingNextPage && <div className={styles.loading}>Loading more posts...</div>}
      </div>

      {!hasMoreData && posts.length > 0 && <div className={styles.endMessage}>🎉 that's all</div>}
    </div>
  )
}
