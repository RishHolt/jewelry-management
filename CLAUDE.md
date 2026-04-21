# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Framework**: Next.js 16 with App Router
- **Database / Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Auth**: Supabase Auth with Row Level Security (RLS)
- **UI**: Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript
- **Package Manager**: pnpm

> **Important**: This project uses **Next.js 16** and **Tailwind CSS v4**, which have breaking changes from prior versions. Read `node_modules/next/dist/docs/` for Next.js specifics. Tailwind v4 uses CSS-based configuration (no `tailwind.config.ts`) — custom theme tokens are defined in `globals.css` with `@theme`.

## Commands

```bash
pnpm dev           # start dev server at http://localhost:3000
pnpm build         # production build
pnpm lint          # ESLint
pnpm type-check    # tsc --noEmit
pnpm test          # run all tests
pnpm test -- --testPathPattern=<file>  # run a single test file
```

Add a shadcn/ui component:
```bash
pnpm dlx shadcn@latest add <component-name>
```

Regenerate Supabase TypeScript types after schema changes:
```bash
pnpm supabase gen types typescript --project-id <project-id> > types/database.types.ts
```

## Project Structure

```
app/
  (auth)/           # unauthenticated pages (login, signup) with their own layout
  (dashboard)/      # protected pages with authenticated layout
  api/              # Route Handlers (webhooks, external integrations)
  layout.tsx        # root layout — Poppins font applied here
  globals.css       # Tailwind v4 @theme tokens (gold palette, fonts, shadcn vars)
components/
  layout/
    sidebar.tsx     # collapsible nav sidebar (client component)
    header.tsx      # top bar: breadcrumbs, live clock, user avatar/logout (client component)
    app-shell.tsx   # composes sidebar + header + main content
  ui/               # shadcn/ui generated components — do not hand-edit
  <feature>/        # feature-scoped components (e.g. inventory/, orders/)
lib/
  supabase/
    client.ts       # browser client (createBrowserClient) — use in Client Components
    server.ts       # server client (createServerClient + cookies) — use in Server Components, Route Handlers, Server Actions
  utils.ts          # shared utilities including cn() for class merging
types/
  database.types.ts # auto-generated Supabase types (do not hand-edit)
  index.ts          # hand-authored shared TypeScript types
proxy.ts            # Supabase session refresh + route protection (Next.js 16: file is proxy.ts, export is `proxy`, not `middleware`)
```

## Architecture Conventions

**Server vs Client Components**
- Default to Server Components for all pages and data-fetching components.
- Add `"use client"` only when the component needs `useState`, `useEffect`, browser APIs, or event handlers.
- Never import the server Supabase client (`lib/supabase/server.ts`) inside a Client Component.

**Supabase client usage**
- `lib/supabase/server.ts` — Server Components, Route Handlers, Server Actions (reads cookies via `next/headers`).
- `lib/supabase/client.ts` — Client Components only (uses `createBrowserClient`).
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be referenced in any `"use client"` file or exposed via `NEXT_PUBLIC_*`.

**Row Level Security**
- RLS must be enabled on every Supabase table. All access control is enforced at the database level via RLS policies, not only in application code.

**Tailwind v4 custom tokens**
- Custom colors (gold palette) and font variables are defined in `app/globals.css` inside `@theme inline { ... }`.
- There is no `tailwind.config.ts`. Do not create one.
- Use `bg-gold-500`, `text-gold-600`, etc. just like standard Tailwind utilities.

**shadcn/ui components**
- Always add new UI primitives via `pnpm dlx shadcn@latest add <component>` — this places the component in `components/ui/`.
- Do not manually edit files in `components/ui/`; re-run the add command to update them.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # server-only
```

Copy `.env.local.example` to `.env.local` for local development.
