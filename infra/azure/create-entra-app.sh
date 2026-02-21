#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <APP_NAME> <REDIRECT_URI> [TENANT_ID]"
  echo "Example: $0 iowa-crm-ui https://localhost:5173"
  exit 1
fi

APP_NAME="$1"
REDIRECT_URI="$2"
TENANT_ID="${3:-}" 

echo "Creating Entra ID app registration: $APP_NAME"

az login --output none

if [ -n "$TENANT_ID" ]; then
  echo "Using tenant $TENANT_ID"
  az account set --subscription "$TENANT_ID" || true
fi

APP_JSON=$(az ad app create \
  --display-name "$APP_NAME" \
  --web-redirect-uris "$REDIRECT_URI" \
  --available-to-other-tenants false \
  --output json)

APP_ID=$(echo "$APP_JSON" | jq -r '.appId')
APP_OBJ_ID=$(echo "$APP_JSON" | jq -r '.id')

echo "App created. appId=$APP_ID objectId=$APP_OBJ_ID"

echo "Creating service principal"
az ad sp create --id "$APP_ID" --output none || true

echo "Creating client secret (valid 2 years)"
SECRET_JSON=$(az ad app credential reset --id "$APP_ID" --append --years 2 --display-name "default-secret" --output json)
CLIENT_SECRET=$(echo "$SECRET_JSON" | jq -r '.password')

cat <<EOF
Entra App registration completed.

Client ID: $APP_ID
Client Secret: $CLIENT_SECRET
Redirect URI: $REDIRECT_URI

You must also:
- Add API permissions if your UI needs to call Microsoft Graph or custom APIs.
- Register the same Redirect URI in the deployed app registration in Azure Portal if necessary.
- For production, store the client secret in Azure Key Vault and use managed identities where possible.
EOF
