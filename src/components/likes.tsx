import styles from '../css/likes.module.css'

import { useLikes } from '../hooks/useLikes'

import { IconLike, IconLikeFilled } from './icons'

interface LikesProps {
  postId: number
}

export default function Likes({ postId }: LikesProps) {
  const { count, isLiked, toggleLike } = useLikes(postId)

  return (
    <div className={styles.likesContainer} onClick={toggleLike}>
      {isLiked ? (
        <IconLikeFilled className={`${styles.likeIcon} ${styles.likeIconFilled}`} />
      ) : (
        <IconLike className={styles.likeIcon} />
      )}
      <span className={styles.likesCount}>{count}</span>
    </div>
  )
}
