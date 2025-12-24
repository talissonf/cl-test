import { useState } from 'react'
import TimeAgo from 'react-timeago'

import styles from '../css/post-card.module.css'

import type { Post } from '../hooks/useGetPosts'
import { useUser } from '../hooks/useUser'

import Comments from './comments'
import DeletePostModal from './delete-post-modal'
import EditPostModal from './edit-post-modal'

import { IconDelete, IconEdit } from './icons'

import Likes from './likes'

export default function PostCard({ post }: { post: Post }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { isOwner } = useUser()

  return (
    <>
      <div className={styles.postCard}>
        <div className={styles.postCardHeader}>
          <span className={styles.postCardHeaderTitle}>{post.title}</span>

          {isOwner(post.username) && (
            <div className={styles.postCardHeaderActions}>
              <span
                className={styles.postCardHeaderAction}
                onClick={() => setIsDeleteModalOpen(true)}
                title="Delete post"
              >
                <IconDelete />
              </span>
              <span
                className={styles.postCardHeaderAction}
                onClick={() => setIsEditModalOpen(true)}
                title="Edit post"
              >
                <IconEdit />
              </span>
            </div>
          )}
        </div>

        <div className={styles.postCardContent}>
          <div className={styles.postCardUserInfo}>
            <span className={styles.postCardContentUsernameText}>@{post.username}</span>
            <span className={styles.postCardContentUsernameText}>
              <TimeAgo date={post.created_datetime} live={false} />
            </span>
          </div>

          <div className={styles.postCardContentContent}>
            <span>{post.content}</span>
          </div>

          <div className={styles.postCardActions}>
            <div className={styles.postCardActionsRow}>
              <Likes postId={post.id} />
              <Comments postId={post.id} />
            </div>
          </div>
        </div>
      </div>

      <EditPostModal
        post={post}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <DeletePostModal
        post={post}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  )
}
