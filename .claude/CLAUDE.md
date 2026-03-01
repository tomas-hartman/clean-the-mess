# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Clean the Mess!" is a browser extension for Firefox, Chrome, and Safari that helps users manage and close tabs. It uses a monorepo structure with npm workspaces.

## Commands

- See @./package.json for available pnpm commands for this project.
- Do not call any of these commands without asking.

## Architecture

### Monorepo Structure

- **`packages/common/`** — All shared source code (UI, business logic, background script)
- **`packages/firefox/`** — Firefox-specific manifest and build config; references common source
- **`packages/chrome/`** — Chrome-specific manifest and build config; references common source
- **`packages/safari/`** — Safari-specific manifest and build config
- **`tests/`** — Jest unit tests for `_modules` functions
- **`scripts/`** — Shell and Node scripts for manifest merging and packaging

### Manifest System

Each browser package has a `manifest.{browser}.json` that is deep-merged with `packages/common/src/manifest.common.json` by `scripts/merge-manifests.js` to produce the final `manifest.json`. The build uses `BROWSER_NAME` env var to conditionally import browser-specific CSS themes.

### Extension Entry Points (`packages/common/src/`)

- **`background/background.ts`** — Service worker handling badge updates, bookmark-all, options refresh, and Chrome icon theming. Communicates with popup via `browser.runtime.onMessage`.
- **`popup/Popup.tsx`** — React app root; mounts `DataProvider → NavigationProvider → Router`. Also imports browser-specific CSS themes at runtime based on `isFirefox()`/`isChrome()`/`isSafari()`.
- **`options/options.ts`** — Vanilla JS options page; reads/writes to `browser.storage.sync`.

### State & Navigation

- **`DataProvider`** (`popup/providers/DataProvider.tsx`) — React context providing `tabs` (all current-window tabs), `closeTabs()`, and `duplicates`. Subscribes to `browser.tabs.onRemoved/onUpdated` for live updates.
- **`NavigationProvider`** (`popup/providers/NavigationProvider.tsx`) — Manages active screen via `screen` state and `navigate(screenName, options?)` function.
- **`useData`** hook — Composes `DataProvider` context with `useLatestTabs` and `useOverview` for screen-ready data.

### Screens (in `popup/screens/`)

The `Router.tsx` renders all screens simultaneously (CSS-based visibility). Screens:

- **Overview** — Main screen; groups tabs by domain using `useOverview` hook
- **Details** — Shows all tabs for a selected domain; navigated to from Overview
- **Search** — Tab search functionality
- **Duplicates** — Groups and shows duplicate URLs
- **Latest** — Firefox-only; recently used tabs

### Business Logic (`_modules/`)

Pure functions/utilities used by both popup hooks and background:

- `overview.ts` — Groups tabs by domain into `OverviewItem[]`
- `duplicates.ts` — Deduplicates tabs by URL into `DuplicateGroup[]`
- `search.ts` — Tab filtering/search logic
- `details.ts` — Details for a specific domain group
- `bookmarks.ts` — Bookmark-all functionality
- `listeners.ts` — Popup message listener handler

### Styling

Uses **vanilla-extract** (`.css.ts` files) for type-safe CSS-in-JS. Global styles are in `popup/styles/`. Browser-specific theme files (`themesFirefox.css`, `themesChrome.css`, `themesSafari.css`) are imported conditionally.

### Type Utilities (`packages/common/types/utils.ts`)

Provides `EnumGuard<T>` — enforces that a `const` object's values are the camelCase keys of a given type, ensuring enum objects stay in sync with their corresponding types.

### Options

Two user-configurable options stored in `browser.storage.sync`:

- `showFavicons` (default: true)
- `showTabsLabel` (default: true)

These are read in the popup via `useBookmarkStatus` and `useFavicons` hooks, and refreshed via `BACKGROUND_EVENT.REFRESH_OPTIONS` messages.
