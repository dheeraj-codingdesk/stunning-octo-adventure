# DevLog — Design Spec
Date: 2026-04-20

## Overview
A developer journal web app — college project. Engineers write markdown entries, tag them by topic, search them, and track their learning streak on a dashboard.

**Out of scope:** AI summary, Snippet Vault.

---

## Stack
- React (Vite) + Tailwind CSS + React Router v6
- Firebase Auth (email/password)
- Firestore (entries per user)
- Recharts (dashboard charts)
- react-markdown (render markdown preview)

---

## Firestore Schema
```
users/{uid}/entries/{entryId}
  title:     string
  body:      string   ← raw markdown
  tags:      string[]
  createdAt: timestamp
```

---

## Pages & Routes
| Route | Page | Access |
|-------|------|--------|
| /login | Login | public |
| /signup | Signup | public |
| / | Home | protected |
| /new | New Entry | protected |
| /entry/:id | Edit Entry | protected |
| /dashboard | Dashboard | protected |

---

## Components
| Component | Purpose |
|-----------|---------|
| EntryCard | Title, date, tag badges, click to edit |
| TagFilter | Chip row, active tag highlights, filters list |
| SearchBar | Debounced input (300ms), filters by title+body |
| StreakCalendar | 52-week GitHub-style grid, color by entry count |
| WeeklyChart | Recharts BarChart, last 8 weeks of entry counts |
| Navbar | Logo, dark mode toggle, logout |

---

## Context
| Context | Provides |
|---------|---------|
| AuthContext | `user`, `loading`, `login`, `signup`, `logout` |
| ThemeContext | `theme`, `toggleTheme` — persisted in localStorage |

---

## Custom Hooks
| Hook | Logic |
|------|-------|
| `useEntries()` | Firestore `onSnapshot` listener; returns `entries[]`, `add`, `update`, `remove` |
| `useSearch(entries)` | `useMemo` on tag filter + search term; `useCallback` on debounced handler |
| `useStreak(entries)` | Derives `{date → count}` map; calculates current streak + longest streak |

---

## Key React Concepts Used (Rubric)
- **Controlled components** — all form inputs
- **Context API** — Auth + Theme
- **useMemo** — filtered+searched entries list
- **useCallback** — debounced search handler
- **useEffect** — Firestore listener setup/teardown, auth state observer
- **useRef** — editor textarea focus on mount
- **Custom hooks** — `useEntries`, `useSearch`, `useStreak`
- **Protected routes** — redirect to /login if no user

---

## Dark Mode
Toggle in Navbar. `ThemeContext` stores `"light" | "dark"`. Persisted in `localStorage`. Tailwind `dark:` classes throughout.

---

## Folder Structure
```
src/
  components/   EntryCard, TagFilter, SearchBar, StreakCalendar, WeeklyChart, Navbar
  pages/        Home, NewEntry, EditEntry, Dashboard, Login, Signup
  hooks/        useEntries.js, useSearch.js, useStreak.js
  context/      AuthContext.jsx, ThemeContext.jsx
  services/     firebase.js
  utils/        dateHelpers.js
```
