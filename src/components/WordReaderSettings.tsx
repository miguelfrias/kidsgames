import { useMemo } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon, SpeakerWaveIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import {
  SpeechSettings,
  DEFAULT_SPEECH_SETTINGS,
  speakUtterance,
} from '../data/phonicsData'

interface WordReaderSettingsProps {
  isOpen: boolean
  onClose: () => void
  settings: SpeechSettings
  onUpdateSettings: (settings: SpeechSettings) => void
  voices: SpeechSynthesisVoice[]
}

export default function WordReaderSettings({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  voices,
}: WordReaderSettingsProps) {
  // Sort and filter voices - put English voices first
  const englishVoices = useMemo(() => {
    return voices.filter((v) => v.lang.startsWith('en'))
  }, [voices])

  const otherVoices = useMemo(() => {
    return voices.filter((v) => !v.lang.startsWith('en'))
  }, [voices])

  const handleTestVoice = (rate = settings.normalRate) => {
    speakUtterance({
      text: "Hello! Let's read a book together!",
      rate,
      pitch: settings.pitch,
      voiceURI: settings.voiceURI,
      voices,
    })
  }

  const handleResetDefaults = () => {
    onUpdateSettings(DEFAULT_SPEECH_SETTINGS)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-300 ease-in-out data-closed:translate-x-full bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⚙️</span>
                  <div>
                    <DialogTitle className="text-xl font-bold">
                      Reading Voice & Speed
                    </DialogTitle>
                    <p className="text-xs text-purple-100">
                      Customize iOS & Safari voices and pacing
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close settings"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Voice Selection */}
                <div>
                  <label
                    htmlFor="voice-select"
                    className="block text-sm font-bold text-gray-800 mb-2 flex items-center justify-between"
                  >
                    <span>🗣️ Choose Voice (iOS / Safari)</span>
                    <button
                      type="button"
                      onClick={() => handleTestVoice()}
                      className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 bg-purple-50 px-2 py-1 rounded"
                    >
                      <SpeakerWaveIcon className="w-3.5 h-3.5" />
                      Test Voice
                    </button>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Pick a pleasant voice for reading aloud. Safari provides high-quality built-in voices.
                  </p>

                  <select
                    id="voice-select"
                    value={settings.voiceURI}
                    onChange={(e) =>
                      onUpdateSettings({ ...settings, voiceURI: e.target.value })
                    }
                    className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 bg-purple-50/50 text-gray-800 text-sm font-medium"
                  >
                    <option value="">Default System Voice (Auto)</option>
                    {englishVoices.length > 0 && (
                      <optgroup label="English Voices">
                        {englishVoices.map((v) => (
                          <option key={v.voiceURI || v.name} value={v.voiceURI || v.name}>
                            {v.name} ({v.lang})
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {otherVoices.length > 0 && (
                      <optgroup label="Other Voices">
                        {otherVoices.map((v) => (
                          <option key={v.voiceURI || v.name} value={v.voiceURI || v.name}>
                            {v.name} ({v.lang})
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>

                  {voices.length === 0 && (
                    <p className="text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded-lg">
                      💡 Voices are loading from iOS Safari... If list is empty, the default system voice will be used automatically.
                    </p>
                  )}
                </div>

                <hr className="border-gray-200" />

                {/* Normal Speed Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="normal-speed-slider"
                      className="text-sm font-bold text-gray-800 flex items-center gap-1.5"
                    >
                      <span>🐰 Normal Reading Speed</span>
                    </label>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {settings.normalRate.toFixed(2)}x
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Speed used for conversational word pronunciation.
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      id="normal-speed-slider"
                      type="range"
                      min="0.6"
                      max="1.2"
                      step="0.05"
                      value={settings.normalRate}
                      onChange={(e) =>
                        onUpdateSettings({
                          ...settings,
                          normalRate: parseFloat(e.target.value),
                        })
                      }
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>Slower (0.6x)</span>
                    <span>Faster (1.2x)</span>
                  </div>
                </div>

                {/* Slow "Sound it out" Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="slow-speed-slider"
                      className="text-sm font-bold text-gray-800 flex items-center gap-1.5"
                    >
                      <span>🐢 Turtle "Sound It Out" Speed</span>
                    </label>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      {settings.slowRate.toFixed(2)}x
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Extra slow pace so your child can hear each sound clearly.
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      id="slow-speed-slider"
                      type="range"
                      min="0.3"
                      max="0.7"
                      step="0.05"
                      value={settings.slowRate}
                      onChange={(e) =>
                        onUpdateSettings({
                          ...settings,
                          slowRate: parseFloat(e.target.value),
                        })
                      }
                      className="w-full accent-green-600 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>Very Slow (0.3x)</span>
                    <span>Moderate (0.7x)</span>
                  </div>
                </div>

                {/* Voice Pitch Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="pitch-slider"
                      className="text-sm font-bold text-gray-800 flex items-center gap-1.5"
                    >
                      <span>🎵 Voice Pitch</span>
                    </label>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      {settings.pitch.toFixed(1)}x
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Higher pitch sounds friendly and child-oriented (recommended: 1.1x).
                  </p>
                  <input
                    id="pitch-slider"
                    type="range"
                    min="0.8"
                    max="1.4"
                    step="0.1"
                    value={settings.pitch}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        pitch: parseFloat(e.target.value),
                      })
                    }
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>Deeper (0.8x)</span>
                    <span>Higher (1.4x)</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 rounded-lg hover:bg-gray-200 transition"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  Reset Defaults
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-md transition"
                >
                  Save & Done
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
