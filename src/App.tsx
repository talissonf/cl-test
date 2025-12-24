import { useUser } from './hooks/useUser'

import Network from './pages/network'
import SignUp from './pages/sign-up'

function App() {
  const { isAuthenticated } = useUser()
  return isAuthenticated ? <Network /> : <SignUp />
}

export default App
