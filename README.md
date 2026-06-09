# MovieDiscovery

A full-featured movie browsing and discovery web app powered by the [TMDB API](https://www.themoviedb.org).

---

## Features

- Browse trending and popular movies with pagination
- Filter by genre, release year, minimum rating, and sort order
- Real-time search with autocomplete suggestions and keyboard navigation
- Movie detail pages — poster, backdrop, cast, YouTube trailer, metadata
- Save/remove favourites (persisted in `localStorage` via Zustand)
- Responsive layout with mobile slide-out nav drawer
- Skeleton loading states and error boundaries throughout
- Per-movie OpenGraph metadata for SEO

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| UI | React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State | Zustand v5 (with `persist` middleware) |
| Forms | react-hook-form v7 + Zod v4 |
| Testing | Jest v30 + Testing Library |
| Font | Montserrat (self-hosted WOFF2) |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── page.tsx            # Home (/)
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── movies/[id]/        # Movie detail route
│   ├── search/             # Search results page (/search?q=)
│   ├── favourites/         # Favourites page
│   └── api/suggestions/    # Autocomplete route handler
│
├── components/             # Shared UI primitives and composites
│   ├── movie-card/         # MovieCard, Poster, Info
│   ├── pagination/         # Pagination controls
│   ├── skeletons/          # 10 skeleton loading components
│   └── ui/                 # Button, Input, Select, SearchBar, etc.
│
├── features/               # Feature-based vertical slices
│   ├── home/               # FilterBar, TrendingSection, filter hooks
│   ├── movie/              # Detail: Backdrop, Cast, Info, Trailer
│   ├── favourites/         # Zustand store, hooks, grid, empty state
│   ├── search/             # Search results, no-results, empty state
│   └── nav/                # Navbar, NavDrawer, hamburger, links
│
├── hooks/                  # Shared hooks (useMovieCard, usePagination)
├── lib/                    # TMDB API wrappers (tmdb.ts, tmdb-images.ts)
├── types/                  # TypeScript interfaces for TMDB entities
└── test/                   # 31 unit and component test files
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Environment Variables

Create a `.env.local` file in the project root:

```env
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
```

### Install and Run

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # Lint the codebase
npm test           # Run all tests
npm run test:coverage  # Run tests with coverage report
```

---

## Key Implementation Notes

### Data Fetching
All TMDB calls are in `src/lib/tmdb.ts`. Pages use async Server Components and fetch data in parallel with `Promise.all` where possible.

### Filtering
Filters (genre, year, rating, sort) live in URL search params. The `useFilterBar` hook in `src/features/home/hooks/` syncs dropdown state to the URL so filters survive page refresh and are shareable.

### Favourites
The Zustand store in `src/features/favourites/store/favouritesStore.ts` persists to `localStorage` under the key `favourites-storage`. The `useFavourites` hook delays hydration to avoid SSR/client mismatch.

### Search Autocomplete
`SearchBar` debounces input by 300ms, then calls `/api/suggestions?q=`. The dropdown supports `ArrowUp`/`ArrowDown`/`Enter`/`Escape` keyboard navigation and closes on click-outside.

### Image Handling
All image URL construction is in `src/lib/tmdb-images.ts` (client-safe, no secrets). `next.config.ts` whitelists `image.tmdb.org` for Next.js `<Image>` optimization.

---

## Configuration Files

| File | Purpose |
|---|---|
| `next.config.ts` | Allows TMDB image hostname |
| `tsconfig.json` | Strict TS; `@/` alias maps to `./src/` |
| `jest.config.ts` | jsdom env, ts-jest, `@/` alias, coverage from `src/**` |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |
| `eslint.config.mjs` | ESLint with Next.js ruleset |
