# 🤖 AGENT.md — Developer & AI Agent Guide for `kidsgames`

Welcome, AI Agent or developer! This document provides core architectural context, coding standards, design patterns, operational workflows, and key gotchas required to effectively navigate and develop within the **Kids Games** repository.

---

## 1. Project Overview & Mission

- **Repository**: `kidsgames`
- **Live Production URL**: [https://sea-turtle-app-nsnbs.ondigitalocean.app/](https://sea-turtle-app-nsnbs.ondigitalocean.app/)
- **iPad Mini Legacy Portal**: [https://sea-turtle-app-nsnbs.ondigitalocean.app/mini/](https://sea-turtle-app-nsnbs.ondigitalocean.app/mini/)
- **Target Audience**: Toddlers and young children aged **3 to 6 years old**.
- **Core Mission**: Provide a safe, cheerful, touch-friendly, and educational web application & Progressive Web App (PWA) where kids can learn phonics, letters, colors, basic strategy, and fine motor skills.
- **Key UX Philosophy**:
  - **Error-tolerant**: Never punish or show negative "Game Over" states for incorrect actions. Always encourage repeated attempts.
  - **Positive reinforcement**: Celebrate successes with audio, bright visuals, and playful animations (confetti, bouncing emoji).
  - **Touch-first**: Designed primarily for tablets (iPad, Android tablets) and smartphones. Oversized buttons, generous spacing, and tap-friendly targets.

---

## 2. Technology Stack & Runtime

| Layer | Technology | Version / Notes |
| :--- | :--- | :--- |
| **Runtime** | Node.js | `22.x` (configured in `package.json` engines & GitHub Actions) |
| **Framework** | React | `19.1.0` |
| **Language** | TypeScript | `5.8.3` (Strict mode enabled in `tsconfig.json`) |
| **Bundler** | Vite | `7.0.0` with `@vitejs/plugin-react-swc` |
| **Styling** | Tailwind CSS | `4.1.11` via `@tailwindcss/vite` & `@tailwindcss/postcss` |
| **Routing** | React Router DOM | `7.6.3` (uses **`createHashRouter`**) |
| **Drag & Drop** | `@dnd-kit/core` | `6.3.1` (Mouse and Touch sensors configured) |
| **UI Primitives** | Headless UI | `2.2.4` (Switches, Disclosure, Dialogs) |
| **Icons** | Heroicons | `2.2.0` |
| **PWA** | `vite-plugin-pwa` | `1.0.1` (auto-updating service worker with Workbox) |
| **Animations** | `animate.css` | `4.1.1` |
| **HTTP Client** | `axios` | `1.6.0` (used for optional animal image fetcher) |

---

## 3. Directory Architecture

```text
public/
└── mini/                    # iPad Mini 1 (iOS 9.3.5) standalone ES5 legacy app
    ├── index.html           # Semantic zero-scroll markup
    ├── style.css            # Standard CSS with -webkit- prefixes
    └── app.js               # Strict ES5 speech synthesis & letter engine
src/
├── assets/                  # Static data modules (e.g. bilingual animal dictionaries)
│   ├── animals-EN.tsx       # English vocabulary keyed by letter (A-Z)
│   └── animals-ES.tsx       # Spanish vocabulary keyed by letter (A-Z)
├── components/              # Game components & UI building blocks
│   ├── Animal.tsx           # Async animal image card (Axios + fallback)
│   ├── Dashboard.tsx        # Home screen game launcher grid
│   ├── DifficultySelector.tsx # 3/4/5-letter word difficulty selection
│   ├── DrawingCanvas.tsx    # HTML5 touch/mouse drawing canvas
│   ├── GameBoard.tsx        # Word Builder core gameplay (DnD + audio)
│   ├── LetterSlot.tsx       # Word Builder target drop slots
│   ├── LetterTile.tsx       # Word Builder draggable letter tiles
│   ├── Loading.tsx          # Reusable loading spinner
│   ├── PopIt.tsx            # Timed target tapping game
│   ├── RandomColor.tsx      # Fullscreen color identification flashcard
│   ├── RandomLetter.tsx     # Letter flashcard with speech & bilingual support
│   ├── SuccessAnimation.tsx # Confetti celebration modal
│   ├── ThemeSelector.tsx    # Word Builder theme category picker
│   ├── TicTacToe.tsx        # Turn-based 3x3 strategy game
│   ├── WordBuilderGame.tsx  # Word Builder screen state manager
│   ├── WordReader.tsx       # Spell & Read reading companion
│   └── WordReaderSettings.tsx# Slide-over voice & speed config panel
├── data/
│   ├── gameData.ts          # Word lists, category structures, shuffle utilities
│   └── phonicsData.ts       # Phonics sound maps & speech synthesis engine
├── page/
│   └── Navbar.tsx           # Headless UI responsive top navigation bar
├── routes/
│   └── root.tsx             # React Router ErrorPage boundary
├── types/
│   ├── StringArrays.type.tsx# Key-value string array interface
│   └── WordBuilder.types.ts # Type contracts for themes, words, and tiles
├── App.css                  # Global styles, Tailwind imports, root bounds
├── App.tsx                  # App shell containing Navbar and <Outlet />
├── index.css                # Additional base styles
├── main.tsx                 # App mount & HashRouter route definitions
└── utils.tsx                # Shared helpers (e.g. getRandomColor)
```

---

## 4. Key Architectural Patterns & Conventions

### 4.1 Routing: Always Use Hash Routing
- **Rule**: Keep `createHashRouter` in `src/main.tsx`.
- **Reason**: The app deploys to GitHub Pages static hosting (`https://<user>.github.io/kidsgames/`). Without server-side URL rewrites, standard HTML5 browser history (`createBrowserRouter`) causes HTTP 404 errors when reloading deep links.
- **Link usage**: When navigating within components, use `<Link to="/route-path">`. React Router automatically prefixes the hash (`/#/route-path`). Do **not** hardcode `#` into `<Link to="...">`.

### 4.2 Component Architecture
- Prefer function declarations over arrow functions for top-level components:
  ```tsx
  // PREFERRED:
  function Dashboard() { ... }
  export default Dashboard;

  // AVOID for main components:
  const Dashboard = () => { ... }
  ```
- Keep props explicitly typed via TypeScript interfaces:
  ```tsx
  interface GameBoardProps {
    word: WordData;
    onWordComplete: () => void;
    onBack: () => void;
    onNextWord: () => void;
  }
  ```
- Colocate game-specific subcomponents in `src/components/` unless they become large enough to require a dedicated subdirectory.

### 4.3 State Management
- Prefer local React state (`useState`, `useEffect`, `useCallback`, `useRef`).
- Avoid unnecessary external state management libraries unless cross-cutting state (e.g., persistent user profiles or audio volume controls) is explicitly introduced.
- Use `useCallback` and `useMemo` for handlers passed to expensive children or drag-and-drop sensors.

### 4.4 Styling Guidelines (Tailwind CSS v4)
- **Primary rule**: Use Tailwind utility classes exclusively. Custom CSS should be minimal and reserved for animations or canvas overlays.
- Tailwind v4 is imported via `@import "tailwindcss";` in `src/App.css`.
- Always verify mobile responsive variants: `sm:`, `md:`, `lg:`.
- Use touch-friendly button sizing:
  - Minimum height: `py-3` or `h-14` / `h-16`.
  - Generous padding: `px-4` to `px-6`.
  - Rounded corners: `rounded-xl` or `rounded-2xl` for kid-friendly aesthetics.
  - Active states: `hover:scale-105 active:scale-95 transition-all`.

---

## 5. Kid-Centric Interaction Patterns

When writing or modifying games, follow these rules:

### 5.1 Dual Input Handling (Touch & Mouse)
Children use both tablets (touch) and desktop computers (mouse). Event handlers that inspect pointer coordinates must account for both:
```typescript
const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  // Handle interaction...
};
```

### 5.2 Drag and Drop (`@dnd-kit/core`)
When configuring DnD sensors in components, configure both `MouseSensor` and `TouchSensor` with tolerances to prevent drag gestures from blocking natural touchscreen interactions:
```typescript
const mouseSensor = useSensor(MouseSensor, {
  activationConstraint: { distance: 8 },
});

const touchSensor = useSensor(TouchSensor, {
  activationConstraint: {
    delay: 300,    // Allow press-and-hold before dragging
    tolerance: 8,  // Tolerance against small finger jitters
  },
});

const sensors = useSensors(mouseSensor, touchSensor);
```

### 5.3 Web Speech API Audio Pronunciation
When implementing audio speech feedback:
1. Always check `'speechSynthesis' in window` before invoking.
2. Cancel active speech before starting a new utterance: `window.speechSynthesis.cancel()`.
3. Set child-friendly voice settings:
   - `utterance.rate = 0.7` (slower pace for comprehension)
   - `utterance.pitch = 1.1` (slightly higher pitch)
4. Support localization if applicable (`es-MX` vs `en-US`).

### 5.4 Progressive Hints & Graceful Fallbacks
- In `WordBuilderGame`, wrong placements track `attemptCount`. After 3 wrong attempts, gentle hints highlight the correct letter and slot (`showHint && index === nextEmptyIndex`).
- Never play harsh buzzer sounds or flash jarring red screens.
- In `DisplayAnimal`, if `import.meta.env.VITE_API_URL` is unavailable or network fails, the UI must degrade gracefully without crashing.

---

## 6. Development & Operational Commands

### 6.1 Routine Commands

| Action | Command | Purpose |
| :--- | :--- | :--- |
| **Start Dev Server** | `npm run dev` | Starts Vite HMR server at `http://localhost:5173/` |
| **Typecheck & Build** | `npm run build` | Runs `node -v && tsc && vite build` |
| **Preview Build** | `npm run preview` | Serves the generated `dist/` bundle locally |
| **Lint Code** | `npm run lint` | Runs ESLint on `.ts` and `.tsx` files |

### 6.2 ESLint v9 Notice
The repository has ESLint `9.x` installed with a legacy `.eslintrc.cjs` configuration. Until `.eslintrc.cjs` is migrated to flat config (`eslint.config.js`), run:
```bash
ESLINT_USE_FLAT_CONFIG=false npm run lint
```

---

## 7. How to Add a New Game: Step-by-Step

When tasked with adding a new game to the app, follow this checklist:

1. **Create the Game Component**:
   - Create `src/components/NewGameName.tsx`.
   - Ensure the layout uses responsive containers (`max-w-4xl mx-auto`, `min-h-[calc(100vh-4rem)]`).
   - Add a Back button or home link to return to the dashboard.
   - Include clear visual cues and reset capabilities.

2. **Register the Route in `src/main.tsx`**:
   - Import the component: `import NewGameName from './components/NewGameName.tsx';`
   - Add the route object to the `children` array under `/`:
     ```tsx
     {
       path: "new-game-slug",
       element: <NewGameName />,
     },
     ```

3. **Add the Game to the Dashboard Grid (`src/components/Dashboard.tsx`)**:
   - Add an entry to the `games` array:
     ```tsx
     {
       name: 'Game Name',
       href: '/new-game-slug',
       icon: '🎮', // Kid-friendly emoji
       description: 'Short and fun 1-sentence description.',
       color: 'bg-teal-500' // Distinct vibrant Tailwind color
     }
     ```

4. **Add to Navigation (`src/page/Navbar.tsx`)**:
   - Add an entry to the `navigation` array:
     ```tsx
     { name: 'Game Name', href: '/new-game-slug', current: false }
     ```

5. **Verify Build**:
   - Run `npm run build` to ensure TypeScript compilation and asset bundling succeed without errors.

---

## 8. Common Gotchas & Traps

| Gotcha | Root Cause | Solution |
| :--- | :--- | :--- |
| **Canvas drawing offset or broken on rotate** | `window.innerWidth`/`innerHeight` change during screen rotation before browser layout finishes. | Use a debounce/timeout (e.g. 300ms) on `orientationchange` and `resize` before recalculating canvas dimensions. |
| **Touch scrolling while dragging or drawing** | Browser interprets touch move as page scroll. | Call `e.preventDefault()` on `touchstart`/`touchmove` for canvas elements, or apply `touch-manipulation` / `overscroll-none`. |
| **Missing speech voice** | `window.speechSynthesis.getVoices()` loads asynchronously in Chrome/Blink browsers. | If voices list is empty, listen to the `onvoiceschanged` event before selecting specific voice objects. |
| **Relative asset paths in production** | Assets referenced directly without base path can fail on subpaths. | Place static public assets in `public/` and reference with root-relative paths (`/asset.png`), or import them via ES modules in `src/assets/`. |
| **React 19 type definitions** | React 19 changes some type contracts (e.g. `useRef` types, JSX definitions). | Always verify type compatibility with `tsc` during `npm run build`. |
| **iPad Mini (iOS 9.3.5) blank page** | iOS 9 lacks ES Module support (`<script type="module">`), modern syntax (`??`, `?.`), and CSS `@layer`. | Maintained via dedicated standalone ES5 app in `public/mini/`. `index.html` automatically detects and redirects legacy browsers. |

---

## 9. Verification Protocol for AI Agents

Before declaring any coding task complete on this codebase, execute the following verification steps:
1. **Type & Build Check**: Run `npm run build`. The command must finish with exit code `0` and generate production bundles in `dist/`.
2. **Import Integrity**: Verify all newly added components, assets, or types are correctly imported with matching file extensions (`.tsx` / `.ts`).
3. **Responsive & Touch Verification**: Ensure newly created UI elements have responsive classes (`sm:`, `md:`, `lg:`) and touch target sizes suitable for 3–6 year olds.
4. **No Broken Links**: Verify that routes in `main.tsx`, links in `Navbar.tsx`, and cards in `Dashboard.tsx` all match.
