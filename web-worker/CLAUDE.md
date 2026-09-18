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
TURNSTILE_SITE_KEY=    # Cloudflare Turnstile site key (passed to the React widget)
CONTACT_API_URL=       # URL of the remote contact Worker (JSON POST)
```

## Architecture

Personal portfolio / freelance website for Steffen Schoonveld, built with Astro 6 as a **pre-rendered static site**. Contact submissions are posted to a separate Cloudflare Worker. No test suite exists yet.

### Key patterns

**Astro + React islands**: The site is mostly `.astro` components (zero JS shipped). The contact form is the only interactive island (`ContactForm.tsx`, `client:only="react"`). New interactive UI should follow the same island pattern rather than making entire pages client-rendered.

**Contact form**: Client-side Zod validation with `contactSchema` / `ContactFormInput` from `my-first-worker`, then `POST` JSON to `CONTACT_API_URL`. Turnstile token verification and email sending happen in the Worker, not in this app.

**Two component libraries in parallel**:
- `src/components/starwind/` — [Starwind UI](https://starwind.dev) components (Astro-native). Used in `.astro` files for layout/display (Badge, Button, Card, etc.). Managed via `starwind.config.json`; add components with the `starwind` CLI.
- `src/components/ui/` — [shadcn/ui](https://ui.shadcn.com) components (React). Used inside React islands. Both share the same Tailwind CSS theme tokens defined in `src/styles/global.css`.

**Content collections** (`src/content.config.ts`):
- `ui` — JSON translation files in `./content/ui/`.

**Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`). Brand palette is a single neutral `ink-*` ramp (chroma 0, defined as custom OKLCH colors in `src/styles/global.css`) plus Tailwind's stock `rose-*` as the accent. The same `ink-*` ramp serves both themes via the semantic tokens in `:root` and `.dark` — prefer those tokens (`bg-muted`, `text-muted-foreground`, ...) over raw `ink-*` utilities in components. Dark mode is toggled by adding/removing the `dark` class on `<html>` and persisted in `localStorage`. Scroll-reveal animations use `[data-reveal]` + `IntersectionObserver` wired up in `Layout.astro`.

**Path alias**: `@/` maps to `src/` — use this for all imports.

### File layout

```
src/
  components/
    starwind/             # Astro-native UI components
    ui/                   # shadcn/ui React components
    ContactForm.tsx       # React island — contact form with Turnstile
    ContactSection.astro  # Wraps ContactForm island
  layouts/Layout.astro    # Shell: Navigation, Footer, theme init, reveal setup
  pages/
    index.astro           # Homepage (hero + contact)
    en/index.astro        # English homepage
  styles/global.css       # Tailwind v4 theme, fonts, dark mode, reveal styles
  lib/utils.ts            # cn() helper (clsx + tailwind-merge)
  content.config.ts       # Content collection schemas
content/ui/               # Locale JSON for UI copy
```
