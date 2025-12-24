import { useCallback, useState } from 'react'

import CreatePost from '../components/create-post'
import FilterPosts from '../components/filter-posts'
import { IconLogout } from '../components/icons'
import PostList from '../components/list-posts'

import { useUser } from '../hooks/useUser'

import styles from '../css/network.module.css'

export default function Network() {
  const [filterUsername, setFilterUsername] = useState('')
  const { signOut } = useUser()

  const handleLogout = useCallback(async () => {
    await signOut()
    window.location.reload()
  }, [signOut])

  return (
    <div className={styles.network}>
      <div className={styles.networkHeader}>
        <span>CodeLeap Network</span>

        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          title="Logout"
          aria-label="Logout"
        >
          <IconLogout className={styles.logoutIcon} />
        </button>
      </div>

      <div className={styles.networkContent}>
        <CreatePost />
        <FilterPosts onFilterChange={setFilterUsername} />
        <PostList username={filterUsername} />
      </div>
    </div>
  )
}
