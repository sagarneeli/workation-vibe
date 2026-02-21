# Production Data Setup

## Source of truth
- Primary store: PostgreSQL (via Prisma models in `prisma/schema.prisma`).
- Auth + users: NextAuth tables (`User`, `Account`, `Session`, `VerificationToken`).
- Product content: `Destination`, `Listing`, `Article`, `Tag`, `Favorite`.

## What now uses real data
- `/destinations`: `Destination` table.
- `/destinations/[slug]`: `Destination` + `Listing` tables.
- `/blog`: `Article` + `User` + `Tag` tables (published articles only).
- `/blog/[slug]`: `Article` + `User` + `Tag` tables.
- `/dashboard`: `Favorite` and `Article` counts.
- `/dashboard/settings`: session-backed defaults should read from authenticated user context.

## Initial data population
- Run migrations and seed:
  1. `npx prisma migrate deploy`
  2. `npm run db:seed`
- Seed script: `scripts/seed.js`
- Seed creates demo user, destinations, listings, tags, articles, and favorites.

## Production ingestion strategy
- Destinations/listings:
  - Source from partner APIs or editorial CSV imports (e.g., coworking inventories, city cost datasets).
  - Ingest with scheduled jobs into `Destination` and `Listing`.
- Articles:
  - Source from your CMS/editorial workflow, publish into `Article`/`Tag`.
- User interactions:
  - Captured directly in app (`Favorite`, sessions, accounts).

## Storage and ops recommendations
- DB: Vercel Postgres, Neon, or Supabase Postgres.
- Cache layer: Upstash Redis for frequently requested destination lists.
- Blob/media: Vercel Blob / S3 for first-party images (avoid relying only on third-party hotlinks).
- Scheduled refresh: Vercel Cron triggering ingestion endpoints or background workers.
- Observability: Sentry for runtime errors + Prisma query logging in non-production.

## Required environment variables
- `DATABASE_URL`
- `AUTH_SECRET`
- Optional auth providers:
  - `AUTH_GOOGLE_ID`
  - `AUTH_GOOGLE_SECRET`
  - `AUTH_RESEND_KEY`
  - `AUTH_RESEND_FROM`
- Optional demo credentials:
  - `DEMO_USER_EMAIL`
  - `DEMO_USER_PASSWORD`
