import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = createRoot(document.getElementById('root')!)

root.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <React.Fragment>
      <App />
    </React.Fragment>
  </GoogleOAuthProvider>
)
