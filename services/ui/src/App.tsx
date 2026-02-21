import React from 'react'
import { PublicClientApplication, EventType } from '@azure/msal-browser'
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react'

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_ENTRA_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_ENTRA_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI || window.location.origin
  }
}

const pca = new PublicClientApplication(msalConfig)

function LoginButton() {
  const { instance } = useMsal()
  const login = () => instance.loginPopup({ scopes: ['openid', 'profile', 'User.Read'] }).catch(console.error)
  return <button onClick={login}>Sign in with Entra ID</button>
}

function LogoutButton() {
  const { instance } = useMsal()
  return <button onClick={() => instance.logoutPopup()}>Sign out</button>
}

function Profile() {
  const isAuthenticated = useIsAuthenticated()
  const { instance } = useMsal()
  if (!isAuthenticated) return <div>Please sign in.</div>
  const account = instance.getAllAccounts()[0]
  return (
    <div>
      <h3>Welcome, {account?.name}</h3>
      <p>{account?.username}</p>
      <LogoutButton />
    </div>
  )
}

export default function App() {
  return (
    <MsalProvider instance={pca}>
      <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <h1>Iowa Trail Rides — CRM</h1>
        <LoginButton />
        <Profile />
      </div>
    </MsalProvider>
  )
}
