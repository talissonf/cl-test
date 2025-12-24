import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { isFirebaseSettedUp } from '../utils/appConfig'

let app: ReturnType<typeof initializeApp> | null = null
let auth: ReturnType<typeof getAuth> | null = null

if (isFirebaseSettedUp()) {
  try {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }

    const existingApps = getApps()
    if (existingApps.length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = existingApps[0]
    }

    auth = getAuth(app)
  } catch (error) {
    console.error('Firebase not setted up, skipping...', error)
  }
}

export { auth }
