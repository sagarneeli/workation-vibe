# Workation Vibe

A Next.js + Prisma app for discovering remote-work destinations, listings, and editorial travel intelligence.

## Stack
- Next.js App Router
- Prisma + PostgreSQL
- NextAuth v5
- Tailwind CSS + shadcn/ui

## Quick start

1. Install dependencies

```bash
npm install
```

2. Set environment variables

```bash
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."
# Optional providers
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
AUTH_RESEND_KEY="..."
AUTH_RESEND_FROM="..."
# Required for open data sync
GEONAMES_USERNAME="your_geonames_username"
```

3. Apply schema

```bash
npx prisma migrate deploy
```

4. Seed baseline content

```bash
npm run db:seed
```

5. Sync live destinations and listings from free open data APIs

```bash
npm run data:sync
```

6. Start app

```bash
npm run dev
```

## Data workflows

- `npm run db:seed`
  - Inserts baseline destinations, listings, tags, and articles.
- `npm run data:sync`
  - Pulls destination candidates from GeoNames.
  - Pulls nearby listing POIs from OpenStreetMap Overpass API.
  - Enriches climate context with Open-Meteo.
  - Upserts content into PostgreSQL via Prisma.

## Notes

- In development, demo credentials sign-in is available:
  - `demo@workation.vibe`
  - `demo1234`
- For production architecture and data sourcing details, see:
  - `docs-production-data.md`
