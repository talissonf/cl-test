import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import styles from '../css/edit-post-modal.module.css'

import type { Post } from '../hooks/useGetPosts'
import { useUpdatePost } from '../hooks/useUpdatePost'

interface EditPostFormData {
  title: string
  content: string
}

interface EditPostModalProps {
  post: Post | null
  isOpen: boolean
  onClose: () => void
}

export default function EditPostModal({ post, isOpen, onClose }: EditPostModalProps) {
  const { mutate: updatePost, isPending } = useUpdatePost(
    post?.id || 0,
    post?.username || ''
  )
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<EditPostFormData>({
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (post && isOpen) {
      reset({
        title: post.title,
        content: post.content,
      })
    }
  }, [post, isOpen, reset])

  const onSubmit = (data: EditPostFormData) => {
    if (!post) return

    updatePost(
      {
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          onClose()
          reset()
        },
      }
    )
  }

  const handleCancel = () => {
    onClose()
    reset()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Edit item</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formControl}>
            <label htmlFor="edit-title" className={styles.formControlLabel}>
              Title
            </label>
            <input
              type="text"
              id="edit-title"
              className="cl-input"
              placeholder="Hello world"
              {...register('title', {
                required: 'Title is required',
              })}
            />
            {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}
          </div>

          <div className={styles.formControl}>
            <label htmlFor="edit-content" className={styles.formControlLabel}>
              Content
            </label>
            <textarea
              id="edit-content"
              className="cl-input"
              placeholder="Content here"
              {...register('content', {
                required: 'Content is required',
              })}
            />
            {errors.content && (
              <span className={styles.errorMessage}>{errors.content.message}</span>
            )}
          </div>

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
              type="submit"
              className={styles.saveButton}
              disabled={isPending || !isValid}
            >
              {isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
