import { useState } from 'react'
import { Theme, WordData } from '../types/WordBuilder.types'
import { themes, getRandomWord } from '../data/gameData'
import ThemeSelector from './ThemeSelector'
import DifficultySelector from './DifficultySelector'
import GameBoard from './GameBoard'

type GameScreen = 'theme' | 'difficulty' | 'game'

function WordBuilderGame() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('theme')
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<3 | 4 | 5 | null>(null)
  const [currentWord, setCurrentWord] = useState<WordData | null>(null)

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)
    setCurrentScreen('difficulty')
  }

  const handleDifficultySelect = (difficulty: 3 | 4 | 5) => {
    setSelectedDifficulty(difficulty)
    if (selectedTheme) {
      const word = getRandomWord(selectedTheme.id, difficulty)
      if (word) {
        setCurrentWord(word)
        setCurrentScreen('game')
      }
    }
  }

  const handleWordComplete = () => {
    // Get next word
    if (selectedTheme && selectedDifficulty) {
      const nextWord = getRandomWord(selectedTheme.id, selectedDifficulty)
      if (nextWord) {
        setCurrentWord(nextWord)
      }
    }
  }

  const handleNextWord = () => {
    // Get a different word (skip current one)
    if (selectedTheme && selectedDifficulty) {
      const nextWord = getRandomWord(selectedTheme.id, selectedDifficulty)
      if (nextWord) {
        setCurrentWord(nextWord)
      }
    }
  }

  const handleBackToThemes = () => {
    setCurrentScreen('theme')
    setSelectedTheme(null)
    setSelectedDifficulty(null)
    setCurrentWord(null)
  }

  const handleBackToDifficulty = () => {
    setCurrentScreen('difficulty')
    setCurrentWord(null)
  }

  return (
    <div className="word-builder-game">
      {currentScreen === 'theme' && (
        <ThemeSelector
          themes={themes}
          onThemeSelect={handleThemeSelect}
        />
      )}

      {currentScreen === 'difficulty' && selectedTheme && (
        <DifficultySelector
          theme={selectedTheme}
          onDifficultySelect={handleDifficultySelect}
          onBack={handleBackToThemes}
        />
      )}

      {currentScreen === 'game' && currentWord && (
        <GameBoard
          word={currentWord}
          onWordComplete={handleWordComplete}
          onBack={handleBackToDifficulty}
          onNextWord={handleNextWord}
        />
      )}
    </div>
  )
}

export default WordBuilderGame
