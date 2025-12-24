import { useCallback, useState } from 'react'

import { useUser } from '../hooks/useUser'

import { signInWithGoogle } from '../components/firebase-auth'

import { isFirebaseSettedUp } from '../utils/appConfig'

import styles from '../css/sign-up.module.css'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const { setUsername: saveUsername } = useUser()

  const handleUsernameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (username.trim()) {
        saveUsername(username.trim())
        window.location.reload()
      }
    },
    [username, saveUsername]
  )

  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.signUpContainer}>

        <h1 className={styles.title}>Welcome to CodeLeap network!</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <label htmlFor="username" className={styles.formControlLabel}>
              Please enter your username
            </label>

            <input
              type="text"
              id="username"
              placeholder="Your username"
              className="cl-input"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className={styles.formButtons}>
            {isFirebaseSettedUp() && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await signInWithGoogle()
                  } catch (error) {
                    console.error('Error signing in with Google:', error)
                  }
                }}
                className="cl-button"
              >
                Login with Google
              </button>
            )}

            <button type="submit" className="cl-button" disabled={!username.trim()}>
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
