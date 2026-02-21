# Deploy UI to GitHub Pages and configure Entra ID

This document explains steps to publish the UI to GitHub Pages and register Microsoft Entra ID (Azure AD) app with the correct redirect URI so authentication works.

1) Target GitHub Pages URL

- When this repository is published to GitHub Pages the site URL will be:

- `https://<github-username>.github.io/Mega-Starship/` (example for repository `Mega-Starship`).

2) Build & deploy (automatic via GitHub Actions)

- The workflow `.github/workflows/deploy-ui-pages.yml` builds `services/ui` and deploys `services/ui/dist` to GitHub Pages whenever you push changes under `services/ui/` or trigger the workflow manually.

3) Register Entra ID app

- Use the script `infra/azure/create-entra-app.sh` to create an app registration and client secret. Pass the redirect URI that matches your GitHub Pages site, e.g. `https://<github-username>.github.io/Mega-Starship/`.

Example:

```bash
# make script executable
chmod +x infra/azure/create-entra-app.sh

# create app (requires az cli + jq + Azure permissions)
infra/azure/create-entra-app.sh iowa-crm-ui https://<github-username>.github.io/Mega-Starship/
```

The script prints `Client ID` and `Client Secret`. For production store secret in Azure Key Vault. For development, put `VITE_ENTRA_CLIENT_ID` and `VITE_ENTRA_TENANT_ID` in `services/ui/.env` and commit (or better, use Actions secrets).

4) Make UI use Entra client id

- Add environment variables in a GitHub Actions secret or in `services/ui/.env`:

- `VITE_ENTRA_CLIENT_ID` — App (client) ID
- `VITE_ENTRA_TENANT_ID` — Tenant ID
- `VITE_REDIRECT_URI` — `https://<github-username>.github.io/Mega-Starship/`

5) Once the workflow completes, open the Pages URL:

- `https://<github-username>.github.io/Mega-Starship/`

Troubleshooting
- If sign-in fails, ensure the redirect URI in the Entra app equals the Pages URL (including trailing slash) and client id is set correctly.
- If Pages deployment does not trigger, open the Actions tab and run the workflow manually.
