import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { isFirebaseSettedUp } from '../utils/appConfig'

export async function signInWithGoogle() {
  if (!isFirebaseSettedUp() || !auth) {
    throw new Error('Firebase is not configured')
  }

  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}
