# Iowa Trail Rides — UI (scaffold)

This is a minimal React + Vite UI demonstrating Microsoft Entra ID (Azure AD) sign-in using MSAL.

Required environment variables (for development — use .env):

- `VITE_ENTRA_CLIENT_ID` — Application (client) ID from Entra ID app registration
- `VITE_ENTRA_TENANT_ID` — Tenant ID
- `VITE_REDIRECT_URI` — Redirect URI (e.g. `http://localhost:5173`)

Quick start:

```bash
cd services/ui
npm install
# create .env with VITE_ENTRA_CLIENT_ID, VITE_ENTRA_TENANT_ID, VITE_REDIRECT_URI
npm run dev
```

Notes:
- This UI uses `@azure/msal-browser` and `@azure/msal-react` and performs interactive popup login.
- For production, register redirect URI and configure CORS on API and secure secrets in Key Vault.
