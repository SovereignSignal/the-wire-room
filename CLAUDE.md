# CLAUDE.md - AI Context for The Wire Room

## Project Overview

**The Wire Room** is the public-facing Next.js website for the Grant Wire intelligence platform. It displays editorially approved grant opportunities across three beats: Crypto, AI, and Open Source.

**Live site:** thewireroom.xyz

## Architecture

### Two Repos, One Database

The Wire Room is the **frontend** half of a two-repo system:

| Repo | Role | Stack | Deploys to |
|------|------|-------|-----------|
| `the-wire-room` (this repo) | Public website | Next.js 16, Tailwind | Vercel/Railway |
| `grant-wire-summarizer` | Backend pipeline + admin dashboard | Node.js, Express, TypeScript | Railway |

Both repos connect to the **same PostgreSQL database**. The Wire Room reads from it (read-only); the backend writes to it.

### Data Flow: Backend to Frontend

```
Grok scan / Telegram / Email
    -> scan_entries (status: raw)
    -> dedup + score (status: queued)
    -> operator reviews in backend dashboard
    -> marks "Approve" (status: approved)
    -> Wire Room queries scan_entries WHERE status = 'approved'
    -> entry appears on thewireroom.xyz
```

The Wire Room **only reads `scan_entries` with `status = 'approved'`**. No other tables are queried.

## Key Data Contract

### Table: `scan_entries` (owned by grant-wire-summarizer)

The Wire Room's `/api/wires` route reads these columns:

| Column | Type | Maps to WireItem |
|--------|------|-----------------|
| `id` | SERIAL | `id` (as string) |
| `name` | TEXT | `title` |
| `description` | TEXT | `summary` |
| `source_url` | TEXT | `sourceUrl` |
| `amount` | TEXT | `amount` (raw string, e.g. "$50,000") |
| `deadline` | TEXT | `deadline` (raw string, e.g. "March 15, 2026" or "Rolling") |
| `wire` | TEXT | `beat` (crypto/ai/oss) |
| `quality_score` | INTEGER | `qualityScore` (0-100) |
| `scan_source` | TEXT | Not displayed |
| `created_at` | TIMESTAMPTZ | `publishedAt` |
| `status` | TEXT | Only `'approved'` rows are fetched |

**Important:** `deadline` is raw text, not always an ISO date. The `formatDeadline()` helper in `lib/data.ts` handles this gracefully.

## File Structure

```
app/
  api/wires/route.ts    # API: queries scan_entries, returns WireItem[]
  page.tsx              # Landing page
  feed/page.tsx         # Full feed page
  about/page.tsx        # About page
  sitemap.ts            # Dynamic sitemap
  layout.tsx            # Root layout with metadata
components/
  landing/
    hero.tsx            # Hero section (shows latest wire count)
    latest-wires.tsx    # Landing page wire cards (top 6)
    beats-section.tsx   # Three beats overview
    newsletter-section.tsx
    workflow-section.tsx
  feed/
    wire-feed.tsx       # Full feed with search, filters, pagination
  site-header.tsx
  site-footer.tsx
  theme-provider.tsx
  ui/                   # shadcn/ui components
lib/
  data.ts              # WireItem interface, BEAT_CONFIG, formatters
  utils.ts             # cn() utility
```

## API Route: `/api/wires`

### Query Parameters
- `beat` - Filter by wire: `crypto`, `ai`, `oss`
- `limit` - Items per page (1-100, default 20)
- `offset` - Pagination offset (default 0)

### Response Shape
```json
{
  "wires": WireItem[],
  "total": 42,    // Total matching entries (for pagination)
  "count": 20     // Items in this page
}
```

### Defensive Checks
- If `scan_entries` table doesn't exist, returns `{ wires: [], total: 0, count: 0 }`
- Database pool limited to 1 connection (serverless-friendly)

## Components That Consume `/api/wires`

1. **`hero.tsx`** - `fetch("/api/wires?limit=1")` for latest count
2. **`latest-wires.tsx`** - `fetch("/api/wires?limit=20")` for landing page cards
3. **`wire-feed.tsx`** - `fetch("/api/wires?limit=50")` for full feed page

All use client-side fetch in `useEffect`, with loading states and empty-state handling.

## Category Detection

The API derives `category` from `name + description` text using keyword matching in `detectCategory()`:
- **hackathon** - "hackathon", "buildathon", "code jam"
- **fellowship** - "fellowship", "residency", "scholar"
- **governance** - "governance", "treasury", "dao proposal"
- **incentives** - "bounty", "airdrop", "rewards program"
- **grants** - default fallback

## Source Name Extraction

`extractSourceName(url, name)` derives a display name:
- X.com URLs: extracts `@handle` from path
- Other URLs: capitalizes the base domain (e.g. "gitcoin.co" -> "Gitcoin")
- Fallback: first word of `name` before ":"

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (same DB as grant-wire-summarizer) |

## Development

```bash
npm install
npm run dev    # http://localhost:3000
```

Requires the shared PostgreSQL database to be accessible. For local development, point `DATABASE_URL` at the same database the backend uses.

## Common Tasks

### Modifying how entries display
Edit `components/feed/wire-feed.tsx` (full feed) or `components/landing/latest-wires.tsx` (landing page cards).

### Changing the WireItem interface
1. Update `lib/data.ts` - the `WireItem` interface
2. Update `app/api/wires/route.ts` - the row-to-WireItem mapping
3. Both components auto-inherit the type changes

### Adding a new beat/wire
1. Add to `BEAT_CONFIG` in `lib/data.ts` with color values
2. Add to the beat filter arrays in `wire-feed.tsx` and `latest-wires.tsx`
3. Add to the validation check in `app/api/wires/route.ts`

### Adding new fields from scan_entries
1. Add column to the SELECT in `app/api/wires/route.ts`
2. Add to the row mapping object
3. Add to `WireItem` interface in `lib/data.ts`
4. Use in components as needed
