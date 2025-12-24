import { createContext } from 'react'
import type { User as FirebaseUser } from 'firebase/auth'

export interface UserContextType {
  username: string | null
  firebaseUser: FirebaseUser | null
  setUsername: (username: string | null) => void
  clearUsername: () => void
  isOwner: (postUsername: string) => boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)
