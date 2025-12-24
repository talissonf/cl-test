import { useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import type { User as FirebaseUser } from 'firebase/auth'
import { UserContext } from './userContextTypes'
import { isFirebaseSettedUp } from '../utils/appConfig'

const USERNAME_KEY = 'username'
const FIREBASE_AUTH_KEY = 'firebase_auth'

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(USERNAME_KEY)
    }
    return null
  })
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)

  useEffect(() => {
    if (!isFirebaseSettedUp()) {
      return
    }

    // load firebase dynamically to avoid errors if firebase is not setted up
    import('../lib/firebase').then(({ auth }) => {
      if (!auth) {
        return
      }
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setFirebaseUser(user)
        if (user) {
          const firebaseUsername = user.displayName || user.email?.split('@')[0] || null
          if (firebaseUsername) {
            setUsernameState(firebaseUsername)
            localStorage.setItem(USERNAME_KEY, firebaseUsername)
            localStorage.setItem(FIREBASE_AUTH_KEY, 'true')
          }
        } else {
          const wasFirebaseAuth = localStorage.getItem(FIREBASE_AUTH_KEY) === 'true'
          if (wasFirebaseAuth) {
            localStorage.removeItem(FIREBASE_AUTH_KEY)
            setUsernameState(null)
            localStorage.removeItem(USERNAME_KEY)
          } else {
            localStorage.removeItem(FIREBASE_AUTH_KEY)
          }
        }
      })

      return () => unsubscribe()
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (username && !firebaseUser) {
      localStorage.setItem(USERNAME_KEY, username)
    } else if (!username && !firebaseUser) {
      localStorage.removeItem(USERNAME_KEY)
    }
  }, [username, firebaseUser])

  const setUsername = useCallback((newUsername: string | null) => {
    if (firebaseUser) {
      return
    }
    setUsernameState(newUsername)
  }, [firebaseUser])

  const clearUsername = useCallback(() => {
    setUsernameState(null)
    setFirebaseUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USERNAME_KEY)
      localStorage.removeItem(FIREBASE_AUTH_KEY)
    }
  }, [])

  const signOut = useCallback(async () => {
    const wasFirebaseAuth = firebaseUser !== null || localStorage.getItem(FIREBASE_AUTH_KEY) === 'true'

    clearUsername()

    if (wasFirebaseAuth && isFirebaseSettedUp()) {
      try {
        const { auth } = await import('../lib/firebase')
        if (auth) {
          await firebaseSignOut(auth)
        }
      } catch (error) {
        console.error('Error signing out from Firebase:', error)
      }
    }
  }, [firebaseUser, clearUsername])

  const isOwner = useCallback(
    (postUsername: string) => {
      const currentUsername = username || firebaseUser?.displayName || firebaseUser?.email?.split('@')[0] || null
      return currentUsername !== null && currentUsername === postUsername
    },
    [username, firebaseUser]
  )

  const isAuthenticated = username !== null || firebaseUser !== null

  return (
    <UserContext.Provider
      value={{
        username: username || firebaseUser?.displayName || firebaseUser?.email?.split('@')[0] || null,
        firebaseUser,
        setUsername,
        clearUsername,
        isOwner,
        isAuthenticated,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
