import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Switch } from '@headlessui/react'
import {
  Cog6ToothIcon,
  ArrowPathIcon,
  BackspaceIcon,
  SpeakerWaveIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import {
  PHONICS_SOUNDS,
  SpeechSettings,
  loadSpeechSettings,
  saveSpeechSettings,
  speakUtterance,
} from '../data/phonicsData'
import WordReaderSettings from './WordReaderSettings'

const TILE_COLORS = [
  'bg-pink-500 border-pink-600 text-white shadow-pink-200',
  'bg-purple-500 border-purple-600 text-white shadow-purple-200',
  'bg-blue-500 border-blue-600 text-white shadow-blue-200',
  'bg-cyan-500 border-cyan-600 text-white shadow-cyan-200',
  'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200',
  'bg-amber-500 border-amber-600 text-white shadow-amber-200',
  'bg-orange-500 border-orange-600 text-white shadow-orange-200',
  'bg-rose-500 border-rose-600 text-white shadow-rose-200',
]

function getTileColor(index: number) {
  return TILE_COLORS[index % TILE_COLORS.length]
}

export default function WordReader() {
  const [word, setWord] = useState('')
  const [settings, setSettings] = useState<SpeechSettings>(loadSpeechSettings)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSpeakingWord, setIsSpeakingWord] = useState(false)
  const [activeSpeechSpeed, setActiveSpeechSpeed] = useState<'normal' | 'slow' | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const lastSpokenRef = useRef<{ char: string; time: number }>({ char: '', time: 0 })

  // Load and listen for SpeechSynthesis voices (iOS/Safari loads them asynchronously)
  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const available = window.speechSynthesis.getVoices()
        if (available && available.length > 0) {
          setVoices(available)
        }
      }
    }

    updateVoices()

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Persist settings whenever updated
  const handleUpdateSettings = (newSettings: SpeechSettings) => {
    setSettings(newSettings)
    saveSpeechSettings(newSettings)
  }

  // Speak a single letter (Letter Name vs. Phonics Sound)
  const speakLetter = useCallback(
    (letter: string) => {
      const now = Date.now()
      const upper = letter.toUpperCase()
      if (upper === lastSpokenRef.current.char && now - lastSpokenRef.current.time < 150) {
        return
      }
      lastSpokenRef.current = { char: upper, time: now }

      const textToSpeak = settings.phonicsMode
        ? PHONICS_SOUNDS[upper] || upper
        : upper

      speakUtterance({
        text: textToSpeak,
        rate: settings.normalRate,
        pitch: settings.pitch,
        voiceURI: settings.voiceURI,
        voices,
      })
    },
    [settings, voices]
  )

  // Speak the full word
  const speakWholeWord = useCallback(
    (speed: 'normal' | 'slow' = 'normal') => {
      const cleanWord = word.trim()
      if (!cleanWord) return

      setIsSpeakingWord(true)
      setActiveSpeechSpeed(speed)

      const targetRate = speed === 'slow' ? settings.slowRate : settings.normalRate

      speakUtterance({
        text: cleanWord,
        rate: targetRate,
        pitch: settings.pitch,
        voiceURI: settings.voiceURI,
        voices,
      })

      setTimeout(() => {
        setIsSpeakingWord(false)
        setActiveSpeechSpeed(null)
      }, 900)
    },
    [word, settings, voices]
  )

  // Handle typing input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Filter to letters, spaces, hyphens, and apostrophes
    const cleanVal = val.replace(/[^a-zA-Z\s'-]/g, '')

    if (cleanVal.length > word.length) {
      const addedChar = cleanVal[cleanVal.length - 1]
      if (/[a-zA-Z]/.test(addedChar)) {
        speakLetter(addedChar)
      }
    }

    setWord(cleanVal)
  }

  // Handle keyboard events (Enter to speak word)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      speakWholeWord('normal')
    }
  }

  // Reset/Clear button action (form level)
  const handleClear = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setWord('')
    inputRef.current?.focus()
  }

  // Single-letter backspace (form level)
  const handleBackspace = () => {
    if (word.length > 0) {
      setWord((prev) => prev.slice(0, -1))
      inputRef.current?.focus()
    }
  }

  // Focus input helper when tapping anywhere on the stage
  const focusInput = () => {
    inputRef.current?.focus()
  }

  const cleanWord = word.trim()
  const letters = cleanWord.split('')

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 via-indigo-50 to-blue-50 p-2.5 sm:p-5 select-none flex flex-col justify-between">
      <div className="max-w-3xl w-full mx-auto flex flex-col flex-1 justify-between gap-2.5 sm:gap-4">
        {/* 1. TOP: The Word Stage & Form (Immediately visible above the fold) */}
        <section
          onClick={focusInput}
          className={`
            bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4
            ${isSpeakingWord ? 'border-purple-500 shadow-purple-200' : 'border-purple-200 shadow-lg'}
            p-3.5 sm:p-5 transition-all duration-300 cursor-text flex flex-col
          `}
        >
          {/* Header row of the form: Label and Form Action Buttons (Clear & Delete) */}
          <div className="flex items-center justify-between mb-2 text-gray-500">
            <span className="text-xs sm:text-sm font-bold text-purple-700 flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-purple-500" />
              Word from your book:
            </span>

            <div className="flex items-center gap-1.5">
              {cleanWord.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBackspace()
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-gray-600 hover:text-rose-600 bg-gray-100 hover:bg-rose-50 rounded-lg transition active:scale-95"
                  title="Delete last letter"
                  aria-label="Delete last letter"
                >
                  <BackspaceIcon className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}

              {cleanWord.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear()
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition active:scale-95"
                  title="Clear entire word"
                  aria-label="Clear word"
                >
                  <ArrowPathIcon className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Letter Blocks Display Area */}
          <div className="min-h-[85px] sm:min-h-[120px] flex items-center justify-center py-1 sm:py-2">
            {letters.length === 0 ? (
              <div className="text-center text-gray-400 py-1">
                <span className="text-2xl sm:text-4xl block mb-1">📖</span>
                <p className="text-base sm:text-xl font-bold text-gray-500">
                  Tap here to type a word...
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  (Type on your iPad or computer keyboard)
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full">
                {letters.map((char, idx) =>
                  char === ' ' ? (
                    <div key={`space-${idx}`} className="w-3 sm:w-6" />
                  ) : (
                    <div
                      key={`${char}-${idx}`}
                      className={`
                        ${getTileColor(idx)}
                        w-12 h-16 sm:w-16 sm:h-22 md:w-20 md:h-26
                        rounded-xl sm:rounded-2xl border-b-4
                        flex items-center justify-center
                        text-2xl sm:text-4xl md:text-5xl font-black
                        shadow-md transform transition-transform
                        hover:scale-105 active:scale-95 animate-fadeIn
                      `}
                    >
                      {char.toUpperCase()}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Clean Embedded Native Input Bar */}
          <div className="mt-2 pt-2 border-t border-purple-50">
            <input
              ref={inputRef}
              type="text"
              value={word}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type letters here..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="go"
              className="w-full text-center text-lg sm:text-2xl font-bold tracking-widest py-2 px-4 bg-purple-50/50 rounded-xl border border-purple-200 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition text-gray-800 placeholder:text-gray-400"
            />
            <p className="text-center text-[11px] text-gray-400 mt-1">
              Press <strong>Return / Enter ↵</strong> on keyboard to speak word
            </p>
          </div>
        </section>

        {/* 2. MIDDLE: Pronunciation Action Buttons */}
        <section className="space-y-2 sm:space-y-2.5">
          {/* Big "SAY THE WORD" Primary Button */}
          <button
            type="button"
            onClick={() => speakWholeWord('normal')}
            disabled={cleanWord.length === 0}
            className={`
              w-full py-3.5 sm:py-4.5 px-6 
              rounded-2xl sm:rounded-3xl 
              text-lg sm:text-2xl font-black 
              flex items-center justify-center gap-2.5 
              shadow-md transition-all duration-200
              ${
                cleanWord.length > 0
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-[1.01] active:scale-[0.99] shadow-purple-300/50 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }
              ${isSpeakingWord && activeSpeechSpeed === 'normal' ? 'ring-4 ring-yellow-400 animate-pulse' : ''}
            `}
          >
            <SpeakerWaveIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>SAY THE WORD</span>
          </button>

          {/* Speed Buttons: Turtle vs. Rabbit */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => speakWholeWord('slow')}
              disabled={cleanWord.length === 0}
              className={`
                py-2.5 sm:py-3.5 px-3 
                rounded-xl sm:rounded-2xl 
                text-sm sm:text-lg font-bold 
                flex items-center justify-center gap-2 
                border-2 transition-all
                ${
                  cleanWord.length > 0
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-sm active:scale-95 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                }
                ${isSpeakingWord && activeSpeechSpeed === 'slow' ? 'ring-4 ring-yellow-400 animate-pulse' : ''}
              `}
            >
              <span className="text-xl sm:text-2xl">🐢</span>
              <span>Sound Out Slow</span>
            </button>

            <button
              type="button"
              onClick={() => speakWholeWord('normal')}
              disabled={cleanWord.length === 0}
              className={`
                py-2.5 sm:py-3.5 px-3 
                rounded-xl sm:rounded-2xl 
                text-sm sm:text-lg font-bold 
                flex items-center justify-center gap-2 
                border-2 transition-all
                ${
                  cleanWord.length > 0
                    ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-600 shadow-sm active:scale-95 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                }
              `}
            >
              <span className="text-xl sm:text-2xl">🐰</span>
              <span>Normal Speed</span>
            </button>
          </div>
        </section>

        {/* 3. BOTTOM: Secondary Settings Bar (Out of child's primary flow) */}
        <footer className="pt-2 border-t border-purple-100/80 flex items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Phonics Switch */}
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-purple-100 shadow-xs">
            <span className="font-semibold text-gray-600 text-xs sm:text-sm">
              {settings.phonicsMode ? '🗣️ Phonics Sounds' : '🔤 Letter Names'}
            </span>
            <Switch
              checked={settings.phonicsMode}
              onChange={(checked) =>
                handleUpdateSettings({ ...settings, phonicsMode: checked })
              }
              className={`${
                settings.phonicsMode ? 'bg-purple-600' : 'bg-gray-300'
              } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span className="sr-only">Toggle Phonics Mode</span>
              <span
                className={`${
                  settings.phonicsMode ? 'translate-x-4' : 'translate-x-1'
                } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          {/* Voice Settings Gear Button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-purple-700 font-bold rounded-xl border border-purple-100 transition shadow-xs text-xs sm:text-sm"
          >
            <Cog6ToothIcon className="w-4 h-4" />
            <span>Voice & Speed</span>
          </button>
        </footer>
      </div>

      {/* Settings Side Panel */}
      <WordReaderSettings
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        voices={voices}
      />
    </div>
  )
}
