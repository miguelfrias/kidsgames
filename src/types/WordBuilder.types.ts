export interface Theme {
  id: string
  name: string
  icon: string
  words: WordsByLength
}

export interface WordsByLength {
  3: WordData[]
  4: WordData[]
  5: WordData[]
}

export interface WordData {
  word: string
  image: string
}

export interface GameState {
  currentTheme: Theme | null
  currentDifficulty: 3 | 4 | 5
  currentWord: WordData | null
  currentLetters: string[]
  placedLetters: (string | null)[]
  attemptCount: number
  isComplete: boolean
  showHint: boolean
}

export interface LetterTileProps {
  letter: string
  isDragging: boolean
}

export interface LetterSlotProps {
  index: number
  letter: string | null
  correctLetter: string
  isHighlighted: boolean
}
