#!/usr/bin/env bash
set -euo pipefail

# The Replit preview runs the standalone portfolio artifact. A code-only merge
# does not need a package install; pnpm installations restart every workflow.
if git diff --quiet HEAD^ HEAD -- pnpm-lock.yaml; then
  echo "pnpm-lock.yaml is unchanged; skipping dependency installation."
else
  pnpm install --filter @workspace/solomon-nwapa --frozen-lockfile
fi
