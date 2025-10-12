export interface DifficultySettings {
  timeLimit: number
  name: string
  description: string
}

export const DIFFICULTY_LEVELS: DifficultySettings[] = [
  {
    name: 'Easy',
    timeLimit: 120,
    description: '2 minutes - Perfect for beginners!'
  },
  {
    name: 'Normal',
    timeLimit: 90,
    description: '90 seconds - Just right!'
  },
  {
    name: 'Hard',
    timeLimit: 60,
    description: '1 minute - Challenge yourself!'
  }
]

interface DifficultySelectorProps {
  onSelect: (difficulty: DifficultySettings) => void
  onBack: () => void
}

function DifficultySelector({ onSelect, onBack }: DifficultySelectorProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧩</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Tetris Puzzle
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Choose your difficulty level
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {DIFFICULTY_LEVELS.map((difficulty) => (
            <button
              key={difficulty.name}
              onClick={() => onSelect(difficulty)}
              className="
                w-full
                bg-white
                hover:bg-blue-50
                rounded-xl
                p-6
                shadow-lg
                hover:shadow-xl
                transition-all
                transform
                hover:scale-105
                text-left
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {difficulty.name}
                  </h3>
                  <p className="text-gray-600">
                    {difficulty.description}
                  </p>
                </div>
                <div className="text-4xl">
                  {difficulty.name === 'Easy' && '🌟'}
                  {difficulty.name === 'Normal' && '⭐'}
                  {difficulty.name === 'Hard' && '🔥'}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onBack}
          className="
            w-full
            px-6 py-3
            bg-gray-300
            hover:bg-gray-400
            rounded-lg
            font-bold
            text-gray-700
            transition-all
          "
        >
          ← Back to Games
        </button>
      </div>
    </div>
  )
}

export default DifficultySelector
