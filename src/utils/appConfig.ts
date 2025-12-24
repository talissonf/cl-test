export const isFirebaseSettedUp = () => {
  try {
    const env = import.meta.env
    return !!(
      env.VITE_FIREBASE_API_KEY &&
      env.VITE_FIREBASE_AUTH_DOMAIN &&
      env.VITE_FIREBASE_PROJECT_ID &&
      env.VITE_FIREBASE_APP_ID
    )
  } catch {
    return false
  }
}


export const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'https://dev.codeleap.co.uk/careers/'