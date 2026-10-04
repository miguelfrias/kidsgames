# 🎮 Kids Games

> An engaging, accessible, and touch-first educational web application and Progressive Web App (PWA) designed specifically for toddlers and young children aged 3 to 6.

[![Deploy to GitHub Pages](https://github.com/miguelfrias/kidsgames/actions/workflows/node.js.yml/badge.svg)](https://github.com/miguelfrias/kidsgames/actions/workflows/node.js.yml)
[![Node.js Version](https://img.shields.io/badge/node-22.x-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.1.0-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/vite-7.0.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4.1.11-38bdf8.svg)](https://tailwindcss.com/)

**Live Production App**: [https://sea-turtle-app-nsnbs.ondigitalocean.app/](https://sea-turtle-app-nsnbs.ondigitalocean.app/)  
**iPad Mini Legacy Portal (iOS 9.3.5)**: [https://sea-turtle-app-nsnbs.ondigitalocean.app/mini/](https://sea-turtle-app-nsnbs.ondigitalocean.app/mini/)

---

## 🌟 Overview

**Kids Games** is an interactive learning platform built to help young children practice core early-childhood skills—including letter recognition, phonics, spelling, vocabulary, color identification, fine motor control, and basic strategy.

Designed from the ground up for tablets, mobile touchscreens, and desktop browsers, the application follows an **error-tolerant, encouraging design philosophy**: no penalties for mistakes, vibrant and high-contrast visuals, child-friendly audio synthesis, and oversized interactive targets.

---

## 🕹️ Included Games & Activities

| Game | Route | Description | Educational Focus |
| :--- | :--- | :--- | :--- |
| **🗣️ Spell & Read** | `/#/word-reader` | Dedicated companion for reading physical books. Type any unfamiliar word to hear each letter spoken (letter names or phonics) and pronounce the whole word. Includes an iOS/Safari voice & speed configuration drawer (🐰 normal & 🐢 turtle slow speed). | Independent reading, phonics, pronunciation, vocabulary |
| **📱 Spell & Read (iPad Mini)** | `/mini/` | Standalone zero-dependency ES5 mini-app specifically engineered for legacy devices like the iPad Mini 1st Gen (iOS 9.3.5 / Safari 9). Automatic redirection for legacy browsers. | Legacy hardware compatibility, phonics, pronunciation |
| **📝 Word Builder** | `/#/word-builder` | Drag-and-drop letter tiles into designated slots to spell words across themes (Animals, Nature, Vehicles, Food) and difficulty levels (3, 4, 5 letters). Features audio pronunciation, intelligent hints after 3 attempts, and celebratory confetti. | Phonics, spelling, vocabulary, motor skills |
| **🔤 Random Letter** | `/#/random-letter` | Large-scale letter flashcards with speech synthesis. Toggle between vowels only or the full alphabet. Features bilingual animal associations (English & Spanish) with real-world animal imagery. | Alphabet recognition, phonics, bilingual vocabulary (EN/ES) |
| **🌈 Random Color** | `/#/random-color` | High-impact, full-screen color display with a simple tap-to-change button for guessing and learning colors. | Color recognition, visual discrimination |
| **⭕ Tic Tac Toe** | `/#/tic-tac-toe` | Classic 3x3 turn-based board game with vibrant indicators for turns, winning states, and draws. | Turn-taking, spatial logic, strategic thinking |
| **🎨 Draw** | `/#/draw` | Freeform digital canvas supporting touch and mouse input. Offers customizable palette colors and 10 stroke widths (2px to 30px) with canvas clear support. | Fine motor skills, creativity, self-expression |
| **🫧 PopIt** | `/#/popit` | A 30-second timed reaction game where animated targets appear across the screen for children to tap and pop, complete with a celebratory score summary. | Hand-eye coordination, reaction time |

---

## 👶 Child-Centered Design Principles

- **Touch-First & High Tolerance**: Interactive elements are sized generously (e.g., `w-16 h-16` / `w-20 h-20` letter tiles) with activation delays and tolerances tuned for small hands.
- **Positive Reinforcement**: No "game over" penalties or discouraging states. Activities encourage repeated tries, offer gentle visual cues (e.g., pulsating hints), and celebrate wins with audio and animations.
- **Native Speech Synthesis**: Leverages browser `SpeechSynthesisUtterance` with child-friendly pitch (`1.1`) and slower pace (`0.7`) to speak words and letters clearly.
- **Distraction-Free Interface**: Clean layouts with minimal clutter, bright palettes, and intuitive navigation so children can play independently or with parents.

---

## 🛠️ Technology Stack

- **Framework**: [React 19.1.0](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 7.0.0](https://vitejs.dev/) with `@vitejs/plugin-react-swc` for ultra-fast SWC compiles
- **Styling**: [Tailwind CSS 4.1.11](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Routing**: [React Router DOM 7.6.3](https://reactrouter.com/) using `createHashRouter` for zero-configuration static hosting
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/) (`MouseSensor` & `TouchSensor`) with accessible drop slots
- **UI Components & Icons**: [@headlessui/react 2.2](https://headlessui.com/) and [@heroicons/react 2.2](https://heroicons.com/)
- **Animations**: [animate.css 4.1](https://animate.style/)
- **PWA**: [vite-plugin-pwa 1.0](https://vite-pwa-org.netlify.app/) (auto-updating service worker with Workbox precaching)
- **HTTP Client**: [Axios 1.6](https://axios-http.com/)

---

## 📁 Project Structure

```text
kidsgames/
├── .github/
│   ├── workflows/
│   │   └── node.js.yml          # GitHub Pages build and deploy workflow
│   └── copilot-instructions.md  # Copilot coding conventions
├── public/
│   ├── mickey_ears_edited.png   # PopIt game target asset
│   ├── vite.svg                 # Application favicon
│   └── mini/                    # iPad Mini (iOS 9.3.5) standalone legacy app
│       ├── index.html           # Semantic zero-scroll markup
│       ├── style.css            # Standard CSS with -webkit- prefixes
│       └── app.js               # Strict ES5 speech and letter engine
├── src/
│   ├── assets/
│   │   ├── animals-EN.tsx       # English A-Z animal vocabulary dictionary
│   │   └── animals-ES.tsx       # Spanish A-Z animal vocabulary dictionary
│   ├── components/
│   │   ├── Animal.tsx           # Asynchronous animal photo fetcher component
│   │   ├── Dashboard.tsx        # Main game selection grid menu
│   │   ├── DifficultySelector.tsx# Word Builder 3/4/5-letter difficulty picker
│   │   ├── DrawingCanvas.tsx    # HTML5 Canvas touch/mouse drawing tool
│   │   ├── GameBoard.tsx        # Word Builder interactive play area (DnD)
│   │   ├── LetterSlot.tsx       # Droppable letter slot with validation styling
│   │   ├── LetterTile.tsx       # Draggable letter tile
│   │   ├── Loading.tsx          # Spinner feedback indicator
│   │   ├── PopIt.tsx            # Bouncing bubble/target popping game
│   │   ├── RandomColor.tsx      # Random full-screen color flashcard
│   │   ├── RandomLetter.tsx     # Letter flashcard with speech & bilingual animal
│   │   ├── SuccessAnimation.tsx # Word completion modal with confetti
│   │   ├── ThemeSelector.tsx    # Word Builder theme category picker
│   │   ├── TicTacToe.tsx        # 3x3 strategy board game
│   │   ├── WordBuilderGame.tsx  # Word Builder screen state controller
│   │   ├── WordReader.tsx       # Spell & Read physical book reading companion
│   │   └── WordReaderSettings.tsx# Slide-over voice & speed config panel
│   ├── data/
│   │   ├── gameData.ts          # Word lists, categories, and shuffle utilities
│   │   └── phonicsData.ts       # Phonics sound maps & speech synthesis engine
│   ├── page/
│   │   └── Navbar.tsx           # Responsive navigation bar with mobile drawer
│   ├── routes/
│   │   └── root.tsx             # Route error boundary component
│   ├── types/
│   │   ├── StringArrays.type.tsx# Key-value string array type definition
│   │   └── WordBuilder.types.ts # TypeScript interfaces for themes and tiles
│   ├── App.css                  # Global styles & Tailwind imports
│   ├── App.tsx                  # Root layout (Navbar + Outlet)
│   ├── index.css                # Base stylesheet
│   ├── main.tsx                 # Entry point & HashRouter definitions
│   ├── utils.tsx                # Color generator and shared helper functions
│   └── vite-env.d.ts            # Vite client types declaration
├── index.html                   # HTML template with viewport & PWA meta tags
├── package.json                 # Project dependencies and npm scripts
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript project configuration
├── tsconfig.node.json           # Node configuration for Vite config
└── vite.config.ts               # Vite configuration with PWA and Tailwind plugins
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `22.x` (recommended, matches `.github/workflows/node.js.yml` and `package.json` engines)
- **npm**: `10.x` or later

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:miguelfrias/kidsgames.git
   cd kidsgames
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:
   If you are running the backend animal image API proxy, create a `.env` file:
   ```env
   VITE_API_URL=https://your-api-endpoint.com
   ```

### Development

Run the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser at the URL shown in the terminal (typically `http://localhost:5173/`).

### Building for Production

Compile TypeScript and build optimized static assets:

```bash
npm run build
```

The compiled output will be generated in the `dist/` directory, including service worker scripts (`sw.js`) and Web Manifest files for PWA installation.

### Local Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

*(Note: ESLint v9 is installed. If using the legacy `.eslintrc.cjs`, prefix with `ESLINT_USE_FLAT_CONFIG=false npm run lint`).*

---

## 🌐 Deployment

### GitHub Pages (Automated via GitHub Actions)

The repository includes a GitHub Actions workflow at [`.github/workflows/node.js.yml`](.github/workflows/node.js.yml) that automatically builds and deploys the app to GitHub Pages on every push to the `main` branch.

- Routing uses `createHashRouter` in [`src/main.tsx`](src/main.tsx), ensuring direct URLs and page refreshes work seamlessly on GitHub Pages without requiring server-side fallback rules or 404 hacks.
- PWA service worker caching is enabled through `vite-plugin-pwa` for reliable offline play.

### DigitalOcean App Platform

The production application is continuously deployed to DigitalOcean App Platform on every push to the `main` branch:

- **Live URL**: [https://sea-turtle-app-nsnbs.ondigitalocean.app/](https://sea-turtle-app-nsnbs.ondigitalocean.app/)
- **iPad Mini Legacy Portal**: [https://sea-turtle-app-nsnbs.ondigitalocean.app/mini/](https://sea-turtle-app-nsnbs.ondigitalocean.app/mini/)

Build script configured in `package.json`:

```bash
npm run build:digitalocean
```

*(Note: During build, Vite compiles the modern React 19 app into `dist/` and automatically copies the zero-dependency ES5 iPad Mini legacy portal from `public/mini/` into `dist/mini/`, allowing both to be served seamlessly from the same domain).*

---

## 🤝 Contributing

Contributions, bug reports, and suggestions for new educational games are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-game`)
3. Commit your changes following clear commit messages (`git commit -m 'Add shape matching game'`)
4. Push to your branch (`git push origin feature/new-game`)
5. Open a Pull Request

---

## 📄 License

This project is open-source. See the repository for license details.
