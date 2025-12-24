import styles from '../css/post-card-skeleton.module.css'

export default function PostCardSkeleton() {
  return (
    <div className={styles.postCardSkeleton}>
      <div className={styles.postCardSkeletonHeader}>
        <div className={styles.postCardSkeletonTitle}></div>
        <div className={styles.postCardSkeletonActions}>
          <div className={styles.postCardSkeletonIcon}></div>
          <div className={styles.postCardSkeletonIcon}></div>
        </div>
      </div>

      <div className={styles.postCardSkeletonContent}>
        <div className={styles.postCardSkeletonUserInfo}>
          <div className={styles.postCardSkeletonUsername}></div>
          <div className={styles.postCardSkeletonDate}></div>
        </div>

        <div className={styles.postCardSkeletonText}>
          <div className={styles.postCardSkeletonLine}></div>
          <div className={styles.postCardSkeletonLine}></div>
          <div className={styles.postCardSkeletonLineShort}></div>
        </div>
      </div>
    </div>
  )
}
