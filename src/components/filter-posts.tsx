import { useEffect, useState } from 'react'

import styles from '../css/filter-posts.module.css'

import { IconFilter, IconFilterFilled } from './icons'

interface FilterPostsProps {
  onFilterChange: (username: string) => void
}

export default function FilterPosts({ onFilterChange }: FilterPostsProps) {
  const [username, setUsername] = useState('')
  const [debouncedUsername, setDebouncedUsername] = useState('')
  const hasFilter = debouncedUsername.trim() !== ''

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(username)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [username])

  useEffect(() => {
    onFilterChange(debouncedUsername.trim())
  }, [debouncedUsername, onFilterChange])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleClearFilter = () => {
    setUsername('')
    setDebouncedUsername('')
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterInputWrapper}>
        {hasFilter ? (
          <IconFilterFilled className={styles.filterIcon} />
        ) : (
          <IconFilter className={styles.filterIcon} />
        )}
        <input
          type="text"
          placeholder="Filter by username"
          className={styles.filterInput}
          value={username}
          onChange={handleInputChange}
        />
        {hasFilter && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearFilter}
            aria-label="Clear filter"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
