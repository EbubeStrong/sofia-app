#!/bin/bash
set -e

SECRET_ID="staging-creds"
REGION="us-west-1"

echo "Fetching secrets from AWS Secrets Manager ($SECRET_ID)..."

# Fetch secret as JSON string
SECRET_JSON=$(aws secretsmanager get-secret-value \
  --secret-id "$SECRET_ID" \
  --query SecretString \
  --output text \
  --region "$REGION")

if [ -z "$SECRET_JSON" ]; then
  echo "Failed to retrieve secrets or secret is empty."
  exit 1
fi

echo "Secrets retrieved successfully!"
echo ""
echo "$SECRET_JSON" | jq .