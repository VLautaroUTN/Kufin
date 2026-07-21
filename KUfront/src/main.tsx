import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { AuthProvider } from './components/AuthContext/AuthContext.tsx'

const root = createRoot(document.getElementById('root')!)

root.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
        <App />
    </AuthProvider>
  </GoogleOAuthProvider>
)
