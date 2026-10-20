# AdBOSS Source and Deployment Verification Audit

**Audit date:** 14 October 2026  
**Scope:** Public repository, public Vercel site, and static source review.  
**Constraint:** This audit did not edit application code, deployment settings, or the portfolio case-study file. Only this report was added.

## Executive summary

- The supplied GitHub URL resolves to the public repository [Realgozie/adbossng](https://github.com/Realgozie/adbossng). Its current `main` commit is `ac9623e91c3229a9089579e9e17442aefbacc980`.
- GitHub records a successful Production deployment for that same commit on 6 August 2026. The requested site, [adbossng.vercel.app](https://adbossng.vercel.app), is live and its public marketing pages match the repository. The deployment record's generated Vercel URL is protected by Vercel sign-in, so the exact current custom-domain-to-deployment mapping could not be independently confirmed.
- The source contains campaign CRUD, CSV export, registration/login, password verification and reset, TOTP 2FA, session records, team records, an admin endpoint, email handlers, and Stripe subscription code. Most signed-in workflows were not exercised live.
- **High-risk source finding:** several APIs use a caller-supplied `x-user-email` header as the user's identity and do not validate a session token. This is not reliable authentication and could permit access to another user's data or privileged routes. No spoofed-header request was sent.
- **Live payment finding:** `GET /api/stripe/config` returned HTML rather than JSON. The pricing page expects JSON from this route and falls back to an unconfigured state if parsing fails. Stripe code exists, but working live checkout is not verified and appears unavailable at the checked route.
- The landing page contains hardcoded dashboard figures, customer counts, testimonials, and outcome claims. They are visible marketing copy, not independently verified customer or performance evidence.

## Scope and method

The source archive was inspected outside the portfolio workspace. The review covered the app routes, API handlers, database setup, auth/session logic, Stripe and email code, package scripts, and Vercel configuration. Public pages and safe HTTP GET responses were checked on the supplied production URL.

No account was created; no login, password-reset, contact, or team-invite form was submitted; no real payment or email was triggered; and no protected user or admin data was requested. This is a source and public-surface audit, not a penetration test or a legal review.

### Repository and deployment provenance

| Check | Result |
|---|---|
| Repository accessibility | **Verified.** The supplied `Realgozie/AdBOSS` URL resolves to public repo `Realgozie/adbossng`. |
| Current source revision | `main` at `ac9623e91c3229a9089579e9e17442aefbacc980`. [Commit](https://github.com/Realgozie/adbossng/commit/ac9623e91c3229a9089579e9e17442aefbacc980) |
| GitHub deployment record | GitHub's latest Production deployment record for this repo reports success for the same SHA on 6 August 2026. [Deployment status](https://api.github.com/repos/Realgozie/adbossng/deployments/5785721014/statuses) |
| Supplied production URL | `https://adbossng.vercel.app` responded successfully and served the AdBOSS marketing site. Its title, page copy, and static UI align with the checked-in React source. |
| Exact alias mapping | **Partially verified.** The GitHub deployment record points to a generated Vercel URL, but that URL redirects to Vercel sign-in. I could not inspect its deployed files or independently prove that the current custom domain is attached to that exact deployment. |

The repository is therefore a strong match for the live site's public app and the latest GitHub-recorded Production deployment, but the current custom-domain alias is not conclusively mapped to that deployment from public evidence alone.

## Public routes and live HTTP observations

The app uses `HashRouter`, so its client routes are hash URLs such as `/#/pricing`, not ordinary path routes. The route table is in [`src/App.jsx`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/src/App.jsx).

| Live check | Observation | Status |
|---|---|---|
| `https://adbossng.vercel.app/` | Public landing page loaded; HTTP 200 from Vercel. | **Verified in live deployment** |
| `/#/login`, `/#/register`, `/#/pricing`, `/#/about`, `/#/privacy`, `/#/terms` | Public page content was returned for each route. The presence of a page does not verify form submission or backend behavior. | **Verified in live deployment** |
| `/#/dashboard` without a signed-in browser session | Shows “Access Denied” and a login prompt. | **Verified in live deployment** |
| `GET /api/campaigns` with no identity headers | Returned HTTP 401 JSON. No authenticated request was made. | **Partially verified** |
| `GET /api/stripe/config` | Returned HTTP 200 with `text/html`, not the JSON expected by the pricing page. | **Verified in live deployment** |
| `GET /api/stripe` | Returned HTTP 500 with `text/plain`. | **Verified in live deployment** |

**Database side-effect disclosure:** the unauthenticated `GET /api/campaigns` returned 401, but the source calls `initDb()` before checking the identity header. `initDb()` runs `CREATE TABLE IF NOT EXISTS` and `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` statements in [`lib/db.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/lib/db.js). The request may therefore have initialized missing tables or columns. The route returned before changing campaign records; no campaign data was created, updated, or deleted by this check. I did not attempt to inspect or roll back the schema.

## Feature verification matrix

“Verified in source” means the implementation is present in the checked-in code; it does not mean that the workflow was successfully used against production.

| Area | Status | Evidence and limits |
|---|---|---|
| Stack and app structure | **Verified in source** | React 18/Vite frontend, Tailwind, Express server, PostgreSQL client, and Vercel build configuration are present in [`package.json`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/package.json), [`server.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/server.js), and [`vercel.json`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/vercel.json). The public React app is live. |
| Email/password registration and login | **Verified in source** | Registration hashes passwords with bcrypt; login compares hashes and creates a session record. See [`api/register.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/register.js) and [`api/login.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/login.js). Login and registration pages are public, but no credentials were submitted. |
| Email verification and password reset | **Verified in source** | Verification-token and reset-token handlers are present. Reset tokens have an expiry in the handler; the new-password minimum is six characters. Email delivery depends on configured SMTP variables. See [`api/verify-email.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/verify-email.js), [`api/forgot-password.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/forgot-password.js), and [`lib/mailer.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/lib/mailer.js). Delivery was not tested. |
| TOTP two-factor authentication | **Verified in source** | Setup, verification, disable, and login-check handlers are present in [`api/2fa.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/2fa.js). The handler returns the generated secret to the client and accepts a client-supplied fallback secret during verification; see security notes below. No 2FA flow was attempted live. |
| Session records and revocation | **Verified in source** | Session creation, listing, and revocation code exists in [`api/sessions.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/sessions.js). Other routes generally do not validate the stored session ID before trusting the email header. |
| Campaign management | **Verified in source** | The frontend and API implement campaign list/create/update/delete and status changes in [`src/components/dashboard/Campaigns.jsx`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/src/components/dashboard/Campaigns.jsx) and [`api/campaigns.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/campaigns.js). These are in-app campaign records; no external ad-network publishing was found. Authenticated CRUD was not tested live. |
| Campaign export | **Partially verified** | CSV download is implemented in [`src/components/dashboard/Home.jsx`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/src/components/dashboard/Home.jsx). The pricing copy advertises CSV/PDF export, but no PDF export implementation was found. |
| Team members and roles | **Partially verified** | The API stores pending team-member rows and role strings in [`api/team.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/team.js). The handler does not send an invitation email, and the inspected campaign/team APIs do not enforce the displayed Administrator/Editor/Viewer permissions. |
| Admin user list | **Verified in source** | An admin users endpoint exists in [`api/admin.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/admin.js). It was not called live because it can return user names and email addresses. Its authorization relies on the same client-supplied identity header described below. |
| Stripe plans, checkout, webhooks, billing portal | **Partially verified** | Stripe code exists in [`api/stripe.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/stripe.js), and the live pricing page displays Starter, Growth, and Scale prices. However, the live `/api/stripe/config` response is HTML rather than JSON; [`Pricing.jsx`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/src/components/Pricing.jsx) expects JSON and falls back to an unconfigured state when parsing fails. No checkout or payment was initiated. |
| Email and notifications | **Partially verified** | Verification, reset, and contact email code uses Nodemailer/Gmail when configured; see [`lib/mailer.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/lib/mailer.js) and [`api/contact.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/contact.js). Dashboard messages are stored in browser local storage in [`Messages.jsx`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/src/components/dashboard/Messages.jsx); no team invitation email was found. No email was sent. |
| Database persistence | **Verified in source** | PostgreSQL schema/setup covers users, sessions, campaigns, and team members in [`lib/db.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/lib/db.js); Stripe subscription metadata also uses `@replit/database`. Most inspected SQL queries are parameterized. Production database contents and configuration were not inspected. |
| External ad-platform connections or publishing | **Not found** | No Meta/Facebook, Google Ads, TikTok, LinkedIn, or other ad-platform API/OAuth client was found in the inspected source or dependencies. The campaign UI should be described as managing in-app records, not as publishing ads to those networks. |
| Plan-based feature enforcement | **Unable to verify** | Pricing tiers are displayed, but no server-side enforcement of campaign/team limits was found in the inspected API handlers. |
| Tests | **Not found** | No `*.test.*` or `*.spec.*` files were found, and `package.json` has no test script. |
| Hardcoded performance/customer claims | **Documented only** | Landing-page dashboard values are hardcoded in [`Hero.jsx`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/src/components/Hero.jsx); customer counts, ratings, testimonials, and ROI statements are static in [`Testimonials.jsx`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/src/components/Testimonials.jsx) and other marketing components. No independent evidence of those outcomes was found. |

## Security and reliability findings

These are static-code observations; no exploit attempt was made.

1. **High — user identity is supplied by the client.** The campaign, team, session, 2FA, and admin handlers commonly take `x-user-email` as the principal and check only that it is present. The browser also stores the user object in local storage. A caller can choose a header value; that value is not proof of a login or a validated session. The campaign API then scopes data by that email, while the admin endpoint compares the same header to an admin email. See [`api/campaigns.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/campaigns.js), [`api/team.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/team.js), [`api/sessions.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/sessions.js), [`api/2fa.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/2fa.js), and [`api/admin.js`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/api/admin.js). Treat authentication and tenant isolation as unverified and unsafe to claim.
2. **High — the live Stripe config path does not return the expected API response.** The live endpoint returned HTML. The pricing client expects JSON and marks the integration unconfigured if parsing fails. The server-side Stripe handler reads an internal action flag set by the Express route setup, while the Vercel configuration also uses file-based API routes; the current public response demonstrates that `/api/stripe/config` is not reaching the expected JSON handler.
3. **Conditional webhook risk.** The Stripe webhook handler verifies signatures only when `STRIPE_WEBHOOK_SECRET` is set; otherwise it parses the request body as JSON. Whether that secret is configured in production could not be established.
4. **Weak 2FA/session boundaries.** The 2FA handler returns the setup secret to the client and accepts a client-supplied secret fallback. Session IDs are stored, but most API routes do not validate them. No rate limiter was found in the inspected auth, reset, or 2FA routes.
5. **Database TLS verification is disabled for the remote PostgreSQL connection.** `lib/db.js` sets `rejectUnauthorized: false`; this weakens server-certificate verification.
6. **Unescaped user input in email HTML.** The contact handler interpolates submitted name, email, subject, and message into HTML without escaping. Registration email content also interpolates the submitted name. This was not exercised.
7. **Input validation is inconsistent.** Several endpoints use minimal checks; for example, team email validation checks for `@`, while campaign creation primarily requires a name. There is no shared schema-validation layer in the inspected source. SQL parameterization is a positive control, but it does not address the authentication issue.
8. **Marketing dashboard figures are illustrative source values.** `Hero.jsx` labels the panel as a fake browser/dashboard mockup and hardcodes revenue, campaign, conversion, and ROI figures. Testimonial and customer-count values are also in static arrays. Do not present these as actual customers, usage, or product outcomes without separate evidence.

## Facts safe to use in a portfolio case study

Use careful wording that distinguishes code presence from verified production behavior:

- The public AdBOSS marketing site is live at `https://adbossng.vercel.app`; the public source repository is `Realgozie/adbossng`.
- The source is a React 18/Vite application with Tailwind styling and Node/Express API code, configured for Vercel static output and API routes.
- The source includes password hashing, registration/login, email verification and reset handlers, TOTP 2FA flows, session-record management, campaign CRUD, CSV export, team-member records, an admin-list route, email handlers, and Stripe subscription code.
- The source defines PostgreSQL-backed user, session, campaign, and team data. Campaign data is stored as app records; no ad-network publishing integration was found.
- The current `main` SHA matches the latest successful GitHub-recorded Production deployment SHA. Phrase this as deployment-record evidence, not proof of the exact current custom-domain alias.
- Describe the Stripe portion as **integration code present, live checkout unverified**. The observed config endpoint response is not the JSON expected by the pricing page.

Do **not** claim, without separate evidence, that AdBOSS securely authenticates users, enforces role-based permissions or subscription limits, sends team invitations, publishes campaigns to ad networks, provides verified real-time ad-platform analytics, supports PDF export, or has functioning live payments. Do not use the hardcoded testimonials, customer counts, ratings, ROI figures, or dashboard numbers as real outcomes.

## Remaining uncertainties and documentation note

- Signed-in registration, login, 2FA, password reset, campaign CRUD, team management, admin access, email delivery, and billing were not end-to-end tested.
- No Vercel project access was available to inspect environment variables, function logs, or custom-domain alias settings. No secret values were read or reported.
- The repository has no root README. Its [`replit.md`](https://github.com/Realgozie/adbossng/blob/ac9623e91c3229a9089579e9e17442aefbacc980/replit.md) describes a single registration endpoint and Replit key-value database, while the current source contains multiple API handlers and PostgreSQL setup; treat that documentation as stale for current architecture.
- The portfolio case-study file `artifacts/solomon-nwapa/src/content/projects/adboss.ts` was left untouched as requested. Its current “repository unavailable/no live URL” statements are contradicted by the public repo and live site observed in this audit; revise them only in a separate approved case-study update.
