---
name: Installing imported apps in the pnpm workspace
description: Reliable dependency installation for imported app packages inside this workspace.
---

For packages inside the root pnpm workspace, install through pnpm from the workspace root, targeting the package when a full install is too heavy (for example, `pnpm install --filter @workspace/<package>`). Avoid `npm ci` inside a workspace package even if that package has a standalone npm lockfile: in this environment it returned success while leaving Next.js unavailable because package links pointed into the shared pnpm store.

**Why:** a full install of the imported monorepo was terminated, and an app-local npm install appeared successful but did not create a usable Next.js executable.

**How to apply:** when adding an existing package under `artifacts/*`, use a root-level pnpm filter, then run the package's documented script through its managed workflow.
