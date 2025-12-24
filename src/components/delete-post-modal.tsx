import styles from '../css/delete-post-modal.module.css'

import { useDeletePost } from '../hooks/useDeletePost'

import type { Post } from '../hooks/useGetPosts'

interface DeletePostModalProps {
  post: Post | null
  isOpen: boolean
  onClose: () => void
}

export default function DeletePostModal({ post, isOpen, onClose }: DeletePostModalProps) {
  const { mutate: deletePost, isPending } = useDeletePost(
    post?.id || 0,
    post?.username || ''
  )

  const handleDelete = () => {
    if (!post) return

    deletePost(undefined, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  const handleCancel = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Are you sure you want to delete this item?</h2>

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
