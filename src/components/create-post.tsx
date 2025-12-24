import { useForm } from 'react-hook-form'

import { useCreatePost } from '../hooks/useCreatePost'
import { useUser } from '../hooks/useUser'

import styles from '../css/create-post.module.css'

interface CreatePostFormData {
  title: string
  content: string
}

interface CreatePostProps {
  username?: string
}

export default function CreatePost({ username }: CreatePostProps = {}) {
  const { username: currentUsername } = useUser()
  const effectiveUsername = username || currentUsername || ''
  const { mutate: createPost, isPending } = useCreatePost()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreatePostFormData>({
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (data: CreatePostFormData) => {
    if (!effectiveUsername) {
      return
    }

    createPost(
      {
        username: effectiveUsername,
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          reset()
        },
      }
    )
  }

  return (
    <div className={styles.createPost}>
      <span className={styles.title}>What's on your mind?</span>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formControl}>
          <label htmlFor="title" className={styles.formControlLabel}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className="cl-input"
            placeholder="Hello world"
            {...register('title', {
              required: 'Title is required',
            })}
          />
          {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="content" className={styles.formControlLabel}>
            Content
          </label>
          <textarea
            id="content"
            className="cl-input"
            placeholder="Content here"
            {...register('content', {
              required: 'Content is required',
            })}
          />
          {errors.content && <span className={styles.errorMessage}>{errors.content.message}</span>}
        </div>

        <button type="submit" className="cl-button" disabled={isPending || !isValid}>
          {isPending ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  )
}
