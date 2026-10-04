# 🗣️ Spell & Read (Word Reader)

## Problem Statement
How might we empower an early reader sitting with a physical book to independently bridge the gap between printed letters and spoken pronunciation without breaking their reading flow or feeling discouraged?

---

## Recommended Direction: "Spell & Read" Companion

A focused, child-first reading companion designed specifically to sit alongside a physical storybook on an iPad (with embedded keyboard folio, Magic Keyboard, or native Safari keyboard) or laptop.

When a 3–6 year old encounters an unfamiliar word in their book (e.g., Dr. Seuss, Elephant & Piggie, or early reader books), they type the letters into the app. 

### Why Native / Hardware Keyboard (and No Custom Virtual Keyboard):
1. **Zero Screen Clutter**: Eliminating a bulky custom on-screen keyboard leaves the entire screen for gigantic, playful letter cards and high-contrast action buttons.
2. **Native iOS & Hardware Keyboard Harmony**: Works seamlessly with iPad hardware keyboard cases (Magic Keyboard, Smart Folio, Bluetooth) while Safari automatically surfaces the native iOS keyboard when the input is tapped on touch-only iPads.
3. **No Layout Jumps**: Avoids viewport resize conflicts (`interactive-widget`) common when custom virtual keyboards fight with native Safari keyboards.
4. **Safari Input Tuning**: Uses `autoCorrect="off"`, `autoCapitalize="none"`, `spellCheck={false}`, and `enterKeyHint="go"` so iOS does not interfere with early reader phonetic transcription.

### Interactive Loop:
- As each letter is typed, the app renders a vibrant, bouncing letter card and immediately speaks either the **Letter Name** ("C", "A", "T") or its **Phonetic Sound** ("/k/", "/æ/", "/t/").
- Hitting **Enter** on the keyboard (or tapping the big **"Say It! 🔊"** button) speaks the entire word in clear, warm audio.
- The child can tap the **🐢 Turtle** button to hear it sounded out in slow motion, the **🐰 Rabbit** button for conversational speed, or hit the **🔄 Clear / Start Over** button to wipe the slate clean for the next word.

---

## Key Assumptions to Validate

- [ ] **Letter Recognition Transfer**: The child can visually match letters from the printed book page to the keyboard keys. (*Validated by testing 3-5 words from a real storybook with the child*).
- [ ] **Dual Feedback Value**: Toggling between Letter Names vs. Phonics Sounds helps rather than confuses the child during real reading sessions. (*Validated through parent observation during bedtime reading*).
- [ ] **Speech Synthesis Clarity**: Browser native `SpeechSynthesisUtterance` pronounces short early-reader words accurately without external paid APIs. (*Validated with top 100 Dolch/Fry sight words*).

---

## MVP Scope

### In Scope
1. **Interactive Word Stage (Input-First & Above the Fold)**:
   - Sits right at the very top of the content area without any redundant top sub-header or back button.
   - Form-level controls colocated inside the card:
     - `⌫ Delete` button for quick single-character correction.
     - `🔄 Clear` button to immediately wipe the word and re-focus for the next word.
   - Large, vibrant letter cards (`w-12 h-16 sm:w-16 sm:h-22 md:w-20 md:h-26`) with auto-wrapping.
   - Integrated native input bar with:
     - `autoComplete="off"`
     - `autoCorrect="off"`
     - `autoCapitalize="none"`
     - `spellCheck={false}`
     - `enterKeyHint="go"`
   - Interactive focus: Tapping anywhere on the letter stage immediately focuses the input.
2. **Audio & Pronunciation Engine**:
   - Letter-by-letter audio feedback on every keystroke.
   - Whole-word pronunciation on **Enter** key or button click.
   - **🐰 Normal Speed** (`rate: 0.85`) & **🐢 Slow Speed** (`rate: 0.5`).
   - Clean audio queue handling (cancels prior utterances immediately).
3. **Primary Pronunciation Actions**:
   - Primary **🔊 SAY THE WORD** button (prominent, pulsating when letters are entered).
   - Speed buttons: **🐢 Sound Out Slow** & **🐰 Normal Speed**.
4. **Secondary Settings Bar (Bottom Footer)**:
   - Quiet, slim bar at the bottom out of the child's primary flow.
   - Mode switch: **🔤 Letter Names** vs. **🗣️ Phonics Sounds**.
   - **⚙️ Voice & Speed Settings** button (opens the iOS/Safari voice and speed drawer).
5. **App Integration**:
   - Dedicated route (`/#/word-reader`) in `kidsgames`.
   - Card on Dashboard and link in Navbar.

### Not Doing (and Why for MVP)
- **Custom Virtual Keyboard**: *Why not*: Redundant on iPad with hardware keyboards or Safari's built-in keyboard, and consumes valuable screen space.
- **Camera OCR / Photo Scanning**: *Why not*: Complex, error-prone, and removes active child learning engagement.
- **Complex Dictionary Definitions / Quizzes**: *Why not*: Distracts from bedtime story flow.

---

## Implementation Plan

### Step 1: Phonics & Speech Utility Module
- Location: `src/data/phonicsData.ts`
- English phonetic mapping for A–Z sounds (`A` ➔ *"ah"*, `B` ➔ *"buh"*, etc.).
- Speech helper with rates and child-friendly voice defaults.

### Step 2: Build `WordReader.tsx` Component
- Location: `src/components/WordReader.tsx`
- Auto-focused input connected to visual letter tiles.
- Audio triggers on letter keystroke and word submission.
- Control buttons: Say It, Turtle, Rabbit, Reset, Backspace, Phonics toggle.

### Step 3: Register Route & Navigation
- `src/main.tsx`: Add route `/word-reader`.
- `src/components/Dashboard.tsx`: Add "Word Reader" card.
- `src/page/Navbar.tsx`: Add "Word Reader" navigation item.

### Step 4: Verification & Build
- Verify with `npm run build`.
