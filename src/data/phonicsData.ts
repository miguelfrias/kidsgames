export const PHONICS_SOUNDS: Record<string, string> = {
  A: 'ah',
  B: 'buh',
  C: 'kuh',
  D: 'duh',
  E: 'eh',
  F: 'fff',
  G: 'guh',
  H: 'huh',
  I: 'ih',
  J: 'juh',
  K: 'kuh',
  L: 'lll',
  M: 'mmm',
  N: 'nnn',
  O: 'aw',
  P: 'puh',
  Q: 'kwuh',
  R: 'rrr',
  S: 'sss',
  T: 'tuh',
  U: 'uh',
  V: 'vvv',
  W: 'wuh',
  X: 'ks',
  Y: 'yuh',
  Z: 'zzz',
}

export interface SpeechSettings {
  voiceURI: string
  normalRate: number
  slowRate: number
  pitch: number
  phonicsMode: boolean
}

export const STORAGE_KEY = 'kidsgames_word_reader_settings'

export const DEFAULT_SPEECH_SETTINGS: SpeechSettings = {
  voiceURI: '',
  normalRate: 0.85,
  slowRate: 0.5,
  pitch: 1.1,
  phonicsMode: false,
}

export function loadSpeechSettings(): SpeechSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        ...DEFAULT_SPEECH_SETTINGS,
        ...parsed,
      }
    }
  } catch (e) {
    console.warn('Could not load speech settings from localStorage', e)
  }
  return DEFAULT_SPEECH_SETTINGS
}

export function saveSpeechSettings(settings: SpeechSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.warn('Could not save speech settings to localStorage', e)
  }
}

export function speakUtterance({
  text,
  rate,
  pitch,
  voiceURI,
  voices,
}: {
  text: string
  rate: number
  pitch: number
  voiceURI?: string
  voices: SpeechSynthesisVoice[]
}): void {
  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this browser.')
    return
  }

  // Cancel any active speech to avoid queue delays or stutter
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  utterance.pitch = pitch
  utterance.lang = 'en-US'

  if (voiceURI && voices.length > 0) {
    const matchedVoice = voices.find(
      (v) => v.voiceURI === voiceURI || v.name === voiceURI
    )
    if (matchedVoice) {
      utterance.voice = matchedVoice
    }
  } else if (voices.length > 0) {
    // Fallback: prefer high-quality English voice if no specific voice selected
    const preferred = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Samantha') ||
          v.name.includes('Karen') ||
          v.name.includes('Daniel') ||
          v.name.includes('Natural') ||
          v.name.includes('Siri'))
    ) || voices.find((v) => v.lang.startsWith('en'))
    if (preferred) {
      utterance.voice = preferred
    }
  }

  window.speechSynthesis.speak(utterance)
}
