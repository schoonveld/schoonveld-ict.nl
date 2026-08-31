# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (exposed on all interfaces via --host)
npm run build     # production build
npm run preview   # preview the built output locally
```

## Environment variables

Required in `.env` for the contact form to work:

```
RESEND_API_KEY=        # Resend API key for sending contact emails
TURNSTILE_SECRET=      # Cloudflare Turnstile secret key (server-side verification)
TURNSTILE_SITE_KEY=    # Cloudflare Turnstile site key (passed to the React widget)
```

## Architecture

Personal portfolio / freelance website for Steffen Schoonveld, built with Astro 6, deployed to **Cloudflare Workers** (SSR, `output: 'server'`). No test suite exists yet.

### Key patterns

**Astro + React islands**: The site is mostly `.astro` components (zero JS shipped). The contact form is the only interactive island (`ContactForm.tsx`, `client:only="react"`). New interactive UI should follow the same island pattern rather than making entire pages client-rendered.

**Astro Actions** (`src/actions/index.ts`): Server-side form handler. The `contactAction` validates input with Zod, calls `TurnstileService` to verify the Cloudflare challenge, then calls `EmailService` to send via Resend. Actions are the correct mechanism for server-side mutations — not API routes.

**Two component libraries in parallel**:
- `src/components/starwind/` — [Starwind UI](https://starwind.dev) components (Astro-native). Used in `.astro` files for layout/display (Badge, Button, Card, etc.). Managed via `starwind.config.json`; add components with the `starwind` CLI.
- `src/components/ui/` — [shadcn/ui](https://ui.shadcn.com) components (React). Used inside React islands. Both share the same Tailwind CSS theme tokens defined in `src/styles/global.css`.

**Content collections** (`src/content.config.ts`):
- `resume` — markdown files in `./resume/`, each with frontmatter (`from`, `until`, `company`, `job-title`). Rendered on `/resume`.

**Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`). Brand palette is `navy-*` + `gold-*` defined as custom OKLCH colors in `src/styles/global.css`. Dark mode is toggled by adding/removing the `dark` class on `<html>` and persisted in `localStorage`. Scroll-reveal animations use `[data-reveal]` + `IntersectionObserver` wired up in `Layout.astro`.

**Path alias**: `@/` maps to `src/` — use this for all imports.

### File layout

```
src/
  actions/index.ts        # Astro server actions (contact form handler)
  components/
    starwind/             # Astro-native UI components
    ui/                   # shadcn/ui React components
    ContactForm.tsx       # React island — contact form with Turnstile
    ContactSection.astro  # Wraps ContactForm island
  layouts/Layout.astro    # Shell: Navigation, Footer, theme init, reveal setup
  pages/
    index.astro           # Homepage (hero + contact)
    resume.astro          # Resume page (reads from resume collection)
  services/
    Resend.ts             # Wraps Resend SDK for email delivery
    Turnstile.ts          # Verifies Cloudflare Turnstile tokens server-side
  styles/global.css       # Tailwind v4 theme, fonts, dark mode, reveal styles
  lib/utils.ts            # cn() helper (clsx + tailwind-merge)
  content.config.ts       # Content collection schemas
resume/                   # Markdown files for work-experience entries
```
