import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TimeAgo from 'react-timeago'

import styles from '../css/comments.module.css'

import { useComments, type Comment } from '../hooks/useComments'

import { useUser } from '../hooks/useUser'

import { IconComment, IconDeleteSmall, IconEditSmall } from './icons'

interface CommentsProps {
  postId: number
}

interface CommentFormData {
  content: string
}

interface CommentItemProps {
  comment: Comment
  onEdit: (commentId: string, newContent: string) => void
  onDelete: (commentId: string) => void
  isOwner: boolean
}

function CommentItem({ comment, onEdit, onDelete, isOwner }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<CommentFormData>({
    defaultValues: {
      content: comment.content,
    },
    mode: 'onChange',
  })

  const handleEdit = () => {
    setIsEditing(true)
    setValue('content', comment.content)
  }

  const handleCancel = () => {
    setIsEditing(false)
    reset()
  }

  const onSubmit = (data: CommentFormData) => {
    onEdit(comment.id, data.content)
    setIsEditing(false)
    reset()
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDelete(comment.id)
    }
  }

  if (isEditing) {
    return (
      <div className={styles.commentItem}>
        <form className={styles.commentEditForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formControl}>
            <textarea
              className="cl-input"
              placeholder="Edit your comment..."
              rows={3}
              {...register('content', {
                required: 'Comment is required',
                minLength: {
                  value: 1,
                  message: 'Comment cannot be empty',
                },
              })}
            />
            {errors.content && (
              <span className={styles.errorMessage}>{errors.content.message}</span>
            )}
          </div>
          <div className={styles.commentEditActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="cl-button" disabled={!isValid}>
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <div className={styles.commentHeaderInfo}>
          <span className={styles.commentUsername}>@{comment.username}</span>
          <span className={styles.commentDate}>
            <TimeAgo date={comment.created_at} live={false} />
          </span>
        </div>
        {isOwner && (
          <div className={styles.commentActions}>
            <span
              className={styles.commentAction}
              onClick={handleEdit}
              title="Edit comment"
            >
              <IconEditSmall className={styles.commentActionIcon} />
            </span>
            <span
              className={styles.commentAction}
              onClick={handleDelete}
              title="Delete comment"
            >
              <IconDeleteSmall className={styles.commentActionIcon} />
            </span>
          </div>
        )}
      </div>
      <div className={styles.commentContent}>{comment.content}</div>
    </div>
  )
}

export default function Comments({ postId }: CommentsProps) {
  const { username } = useUser()
  const { comments, addComment, updateComment, deleteComment } = useComments(postId)
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CommentFormData>({
    defaultValues: {
      content: '',
    },
    mode: 'onChange',
  })


  const onSubmit = (data: CommentFormData) => {
    if (!username) return

    addComment(data.content)
    reset()
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className={styles.commentsContainer}>
        <div className={styles.commentsHeader} onClick={toggleExpanded}>
          <IconComment className={styles.commentIcon} />
          <span className={styles.commentsCount}>{comments.length}</span>
          <span className={styles.commentsLabel}>
            {comments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.commentsContent}>
          {comments.length > 0 && (
            <div className={styles.commentsList}>
              {comments.map((comment: Comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onEdit={updateComment}
                  onDelete={deleteComment}
                  isOwner={username === comment.username}
                />
              ))}
            </div>
          )}

          {username && (
            <form className={styles.commentForm} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formControl}>
                <textarea
                  id={`comment-${postId}`}
                  className="cl-input"
                  placeholder="Write a comment..."
                  rows={3}
                  {...register('content', {
                    required: 'Comment is required',
                    minLength: {
                      value: 1,
                      message: 'Comment cannot be empty',
                    },
                  })}
                />
                {errors.content && (
                  <span className={styles.errorMessage}>{errors.content.message}</span>
                )}
              </div>

              <button type="submit" className="cl-button" disabled={!isValid}>
                Comment
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}
