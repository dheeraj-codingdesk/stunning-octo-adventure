# DevLog

A developer's second brain — write markdown journal entries, tag them by topic, search your knowledge, and track your learning streak.

## Features

- **Markdown journal** — write entries in markdown with full syntax support
- **Tag system** — tag entries by topic (React, DSA, Firebase…) and filter with one click
- **Debounced search** — full-text search across titles and body text (300ms debounce)
- **Learning streak** — GitHub-style 52-week activity calendar + weekly bar chart
- **Dark mode** — toggle, persisted across sessions via localStorage
- **Auth** — email/password login via Firebase, protected routes

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Backend | Firebase Auth + Firestore |
| Charts | Recharts |
| Markdown | react-markdown |

## React Concepts Used

- `useContext` — AuthContext (user state) + ThemeContext (dark mode)
- `useMemo` — filtered + searched entries list, streak calculations
- `useCallback` — debounced search handler
- `useEffect` — Firestore real-time listener, auth state observer
- `useRef` — editor textarea auto-focus on mount
- Custom hooks — `useEntries`, `useSearch`, `useStreak`
- Protected routes — redirect to `/login` if unauthenticated
- Controlled components — all form inputs

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd devlog
npm install
```

### 2. Set up Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable **Email/Password** under Authentication → Sign-in method
4. Create a **Firestore Database** (start in test mode)
5. Go to Project Settings → Your apps → Add a web app → copy the config

### 3. Configure environment

Copy `.env.example` to `.env` and fill in your Firebase values:

```bash
cp .env.example .env
```

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 4. Set Firestore security rules

In Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/entries/{entryId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
  components/   EntryCard, TagFilter, SearchBar, StreakCalendar, WeeklyChart, Navbar
  pages/        Home, NewEntry, EditEntry, Dashboard, Login, Signup
  hooks/        useEntries.js, useSearch.js, useStreak.js
  context/      AuthContext.jsx, ThemeContext.jsx
  services/     firebase.js
  utils/        dateHelpers.js
```

## Build

```bash
npm run build
```
