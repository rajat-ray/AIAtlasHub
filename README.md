# AIAtlasHub — Independent AI Tool Library

Standalone Next.js 15 / React 19 / TypeScript AI tools discovery website. Not connected to 12FactorAI.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` before deployment.

## GitHub (create a NEW repository)

```bash
git init
git add .
git commit -m "Initial AIAtlasHub library"
git branch -M main
gh repo create aiatlashub --private --source=. --remote=origin --push
```

Or create an empty repository in GitHub and push this folder. Do not use your 12FactorAI repository.

## Vercel deployment

1. Import the new GitHub repository into Vercel.
2. Select Next.js, leave build command as `npm run build`.
3. Deploy to the temporary `*.vercel.app` URL.
4. Confirm trademark and domain availability, register the domain, then add it in Vercel Project Settings > Domains.
5. Configure DNS according to Vercel's exact displayed records.

## Launch checklist

- `aiatlashub.com` is a PROPOSED domain, not verified as available or purchased.
- `hello@aiatlashub.com` is a PLACEHOLDER contact address; configure mailbox before public launch.
- Seeded AI product names, descriptions, URLs and pricing labels require review and correction.
- Search, category filtering, saved favourites, detail dialogs and basic comparison shortlist are implemented.
- No real affiliate tracking, billing, subscriptions, vendor accounts, submissions backend or admin dashboard is configured.
- Add privacy policy, terms, affiliate/sponsored disclosures, moderation, accessibility audit and analytics before public launch.
- Paid placements must be visibly identified as sponsored; do not imply editorial picks are paid.
- Do not publish production before legal/name clearance.

## Future architecture

Next.js App Router + Supabase Postgres/Auth + Stripe Billing and webhook-verified entitlements + server-side moderation + scheduled content verification. Keep secret API keys server-side.


## Cloudflare Workers deployment (Next.js 15 / OpenNext)

This existing Next.js 15 starter uses the OpenNext adapter for Cloudflare Workers. Cloudflare currently recommends vinext for **new** Next.js projects; check vinext compatibility before a future upgrade.

1. Create the `AIAtlasHub` GitHub organisation and the `aiatlashub-web` repository. Push this project to `main`.
2. Run `npm install` and `npm run build` to validate the project.
3. Run `npx wrangler login` in a browser authenticated to your Cloudflare account.
4. Run `npm run preview:cloudflare` to test in a local Workers runtime.
5. Run `npm run deploy:cloudflare` to publish to your Cloudflare `workers.dev` subdomain.
6. For automated deployment, connect the GitHub repository using Cloudflare Workers Builds and configure build command `npx opennextjs-cloudflare build` and deploy command `npx opennextjs-cloudflare deploy`, or use a GitHub Actions workflow with a scoped Cloudflare API token. Do not commit API tokens.
7. Add your custom domain only after verifying ownership and brand clearance.

No Cloudflare account has been linked, and no deployment has been performed by this package.
