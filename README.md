# Skyline Holding — Website

The official website for **Skyline Holding, SLU**, an independent investment and holding company based in Andorra la Vella. Built as a single-page React application with a premium, editorial design language, GSAP-driven scroll animations, and Lenis smooth scrolling.

## Tech Stack

- **Framework:** React 19 + TypeScript, built with Vite 7
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP + ScrollTrigger, Lenis (smooth scroll)
- **Icons:** lucide-react
- **Fonts:** Cormorant Garamond (headings) and Inter (body / UI), loaded via Google Fonts

## Getting Started

```bash
pnpm install
pnpm run dev
```

The dev server starts on `http://localhost:5173` by default. Both the port and the base path can be overridden with environment variables if needed:

```bash
PORT=4000 BASE_PATH=/ pnpm run dev
```

### Other scripts

```bash
pnpm run build       # Production build to dist/
pnpm run preview     # Preview the production build locally
pnpm run typecheck   # TypeScript check with no emit
```

## Project Structure

```
public/
  documents/               Official registry PDF
  images/                  Team photos, logo, favicon, hero imagery
src/
  App.tsx                  Lightweight client-side router (path-based, no router library)
  components/mockups/
    <Page>.tsx              One top-level component per route (see Routes below)
    _skyline/
      data.ts               Central content store — nav items, page copy, and
                             companyInfo (the single source of truth for all
                             legal/registration details used across the site)
      gsap.ts                Shared GSAP instance, easing presets, reduced-motion helper
      smoothScroll.ts         Lenis setup, synced to GSAP's ticker
      Nav.tsx / Footer.tsx    Global header and footer, used on every page
      HeroParticles.tsx       Reusable ambient particle effect for hero sections
      WorldMapVisual.tsx      Reusable dot-matrix world map visual
      <section>/*.tsx         Page-specific sections, grouped by page (about/,
                               strategy/, opportunities/, sectors/, legal/, etc.)
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About Skyline |
| `/leadership` | Leadership |
| `/governance` | Governance |
| `/investment-strategy` | Investment Strategy |
| `/investment-opportunities` | Investment Opportunities |
| `/investment-sectors` | Investment Sectors |
| `/strategic-partnerships` | Strategic Partnerships |
| `/investor-relations` | Investor Relations |
| `/management-services` | Management Services |
| `/strategic-advisory` | Strategic Advisory |
| `/contact` | Contact |
| `/legal` | Legal & Company Information |
| `/impressum` | Impressum |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |

Routing is a simple `window.location.pathname` switch in `src/App.tsx` — there is no router dependency.

## Content & Company Data

All verified company/legal data (registered name, address, registry ID, LEI, entity status, registration date, share capital) is defined **once** in `src/components/mockups/_skyline/data.ts` as `companyInfo`, and every page reads from it. Update it there rather than hardcoding values in individual pages.

## Design System

- **Colors:** Obsidian Black `#080A0D`, Deep Midnight `#0B1017`, Midnight Navy `#0B1624`, Champagne Gold `#C7A86B`, Soft Gold `#D8BD82`, Warm Ivory `#F5F2EA`, Soft White `#F8F7F3`, Dark Text `#12161B`, Muted Light `#9DA5AE`
- **Typography:** Cormorant Garamond for headings, Inter for body/UI/navigation
- **Motion:** Restrained GSAP reveals (masked headings, staggers, clip-path image reveals, subtle parallax), respecting `prefers-reduced-motion` throughout

## License

Proprietary. All rights reserved to Skyline Holding, SLU.
