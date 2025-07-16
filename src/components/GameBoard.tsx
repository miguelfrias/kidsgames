import { useState, useEffect } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { WordData } from '../types/WordBuilder.types'
import { shuffleArray } from '../data/gameData'
import LetterTile from './LetterTile'
import LetterSlot from './LetterSlot'
import SuccessAnimation from './SuccessAnimation'

interface GameBoardProps {
  word: WordData
  onWordComplete: () => void
  onBack: () => void
  onNextWord: () => void
}

function GameBoard({ word, onWordComplete, onBack, onNextWord }: GameBoardProps) {
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>(
    Array(word.word.length).fill(null)
  )
  const [availableLetters, setAvailableLetters] = useState<string[]>([])
  const [attemptCount, setAttemptCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Configure sensors for both mouse and touch
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 8,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)
  
  const wordLetters = word.word.toLowerCase().split('')
  const isComplete = placedLetters.every((letter, index) => 
    letter === wordLetters[index]
  )
  
  // Show hint after 3 wrong attempts
  const showHint = attemptCount >= 3
  const nextEmptyIndex = placedLetters.findIndex((letter, index) => 
    letter !== wordLetters[index]
  )

  useEffect(() => {
    // Initialize shuffled letters
    setAvailableLetters(shuffleArray(wordLetters))
    setPlacedLetters(Array(word.word.length).fill(null))
    setAttemptCount(0)
  }, [word])

  useEffect(() => {
    if (isComplete && !showSuccess) {
      setShowSuccess(true)
    }
  }, [isComplete, showSuccess])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const draggedLetter = active.id as string
    const targetSlotIndex = parseInt(over.id as string)
    
    if (isNaN(targetSlotIndex)) return

    const correctLetter = wordLetters[targetSlotIndex]
    const newPlacedLetters = [...placedLetters]
    
    // Remove letter from its current position if it exists
    const existingIndex = newPlacedLetters.indexOf(draggedLetter)
    if (existingIndex !== -1) {
      newPlacedLetters[existingIndex] = null
    }
    
    newPlacedLetters[targetSlotIndex] = draggedLetter.toLowerCase()
    setPlacedLetters(newPlacedLetters)
    
    // Track wrong attempts for hint system
    if (draggedLetter.toLowerCase() !== correctLetter) {
      setAttemptCount(prev => prev + 1)
    }
  }

  const handleSuccessComplete = () => {
    setShowSuccess(false)
    onWordComplete()
  }

  const resetWord = () => {
    setPlacedLetters(Array(word.word.length).fill(null))
    setAvailableLetters(shuffleArray(wordLetters))
    setAttemptCount(0)
  }

  const speakWord = (wordToSpeak: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(wordToSpeak)
      
      // Configure speech settings for kids
      utterance.rate = 0.7 // Slower pace for better comprehension
      utterance.pitch = 1.1 // Slightly higher pitch for kids
      utterance.volume = 0.8
      
      // Try to use a child-friendly voice if available
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('child')
      )
      
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
      
      window.speechSynthesis.speak(utterance)
    } else {
      // Fallback for browsers that don't support speech synthesis
      console.log('Speech synthesis not supported')
    }
  }

  // Calculate which letters are still available to show
  const availableLettersToShow = availableLetters.filter((letter, index) => {
    // Count how many of this letter are already placed
    const placedCount = placedLetters.filter(placedLetter => placedLetter === letter).length
    // Count how many of this letter should be in the word total
    const totalCount = wordLetters.filter(wordLetter => wordLetter === letter).length
    // Count how many of this letter we've already shown
    const shownCount = availableLetters.slice(0, index).filter(availableLetter => availableLetter === letter).length
    
    // Show this letter if we haven't placed all instances of it yet
    return placedCount + shownCount < totalCount
  })

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className=" bg-gradient-to-b from-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium transition-colors"
          >
            ← Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={resetWord}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              🔄 Try Again
            </button>
            <button
              onClick={onNextWord}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              ⏭️ Next Word
            </button>
          </div>
        </div>

        {/* Word Image */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">
            {word.image}
          </div>
          <p className="text-2xl text-gray-600">
            Drag the letters to spell this word!
          </p>
        </div>          {/* Letter Slots */}
          <div className="flex justify-center gap-2 mb-8">
            {wordLetters.map((correctLetter, index) => (
              <LetterSlot
                key={index}
                index={index}
                letter={placedLetters[index]}
                correctLetter={correctLetter}
                isHighlighted={showHint && index === nextEmptyIndex}
              />
            ))}
          </div>

          {/* Available Letters */}
          <div className="flex justify-center gap-2 flex-wrap">
            {availableLettersToShow.map((letter, index) => (
              <LetterTile
                key={`${letter}-${index}`}
                letter={letter}
                isDragging={activeId === letter}
              />
            ))}
          </div>

          {/* Speak Word Button */}
          <br />
          <br />
          <div className="flex justify-center mt-6 mb-6">
            <button
              onClick={() => speakWord(word.word)}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <span className="text-2xl">🔊</span>
              <span className="text-lg">Hear the word</span>
            </button>
          </div>

        {/* Hint Message */}
        {showHint && nextEmptyIndex !== -1 && (
          <div className="text-center mt-6">
            <p className="text-xl text-yellow-600 font-medium">
              💡 Try the "{wordLetters[nextEmptyIndex].toUpperCase()}" in the highlighted box!
            </p>
          </div>
        )}

        {/* Success Animation */}
        {showSuccess && (
          <SuccessAnimation
            word={word.word}
            image={word.image}
            onComplete={handleSuccessComplete}
          />
        )}
      </div>
    </div>
    </DndContext>
  )
}

export default GameBoard
