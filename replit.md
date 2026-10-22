# Solomon Nwapa Portfolio

A Next.js portfolio site showcasing Solomon Nwapa’s software projects, capabilities, and contact information.

## Run & Operate

- `pnpm install --filter @workspace/solomon-nwapa --frozen-lockfile` — install portfolio dependencies from the existing workspace lockfile
- `pnpm --filter @workspace/solomon-nwapa run dev` — run the portfolio website; the managed web service uses port `25959` and preview path `/`
- `pnpm --filter @workspace/solomon-nwapa run typecheck` — type-check the portfolio
- `pnpm --filter @workspace/solomon-nwapa run build` — build the portfolio for production
- No required secrets or database configuration. `NEXT_PUBLIC_SITE_URL` is optional and sets the canonical site URL.

## Stack

- pnpm workspace, Node.js 24, Next.js 15, React 19, TypeScript, and Tailwind CSS
- The portfolio is a standalone website and does not require the workspace API server or database.

## Where things live

- `artifacts/solomon-nwapa/src/` — website routes, components, and content
- `artifacts/solomon-nwapa/README.md` — page overview and content-editing guidance
- `artifacts/solomon-nwapa/.replit-artifact/artifact.toml` — managed web service and preview configuration

## Architecture decisions

The portfolio is served by its own artifact workflow. Do not start the unrelated API server to run the site.

## Product

The site presents professional information, featured projects, capabilities, industries, insights, and contact links.

## User preferences

Preserve the existing GitHub repository and history; do not create a replacement repository.

## Gotchas

Use pnpm from the workspace root. Keep `pnpm-lock.yaml` and app dependency versions unchanged unless explicitly requested.

## Pointers

- GitHub remote: `https://github.com/Realgozie/Solomonnwapa.git` (`github`)
- Preserve the `gitsafe-backup` remote.
