import { Theme } from '../types/WordBuilder.types'

interface DifficultySelectorProps {
  theme: Theme
  onDifficultySelect: (difficulty: 3 | 4 | 5) => void
  onBack: () => void
}

function DifficultySelector({ theme, onDifficultySelect, onBack }: DifficultySelectorProps) {
  const difficulties = [
    { level: 3 as const, label: '3 Letters', description: 'Easy words like CAT', color: 'bg-green-500' },
    { level: 4 as const, label: '4 Letters', description: 'Medium words like BEAR', color: 'bg-yellow-500' },
    { level: 5 as const, label: '5 Letters', description: 'Hard words like HORSE', color: 'bg-red-500' }
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium transition-colors"
        >
          ← Back to Themes
        </button>
        
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          {theme.name} {theme.icon}
        </h1>
        
        <h2 className="text-2xl text-center text-gray-600 mb-8">
          How many letters do you want? 🔤
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {difficulties.map((diff) => (
            <button
              key={diff.level}
              onClick={() => onDifficultySelect(diff.level)}
              className={`${diff.color} hover:opacity-90 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 border-4 border-transparent hover:border-white`}
            >
              <div className="text-4xl font-bold mb-4">
                {diff.level}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {diff.label}
              </h3>
              <p className="text-lg opacity-90">
                {diff.description}
              </p>
              <div className="flex justify-center mt-4">
                {Array.from({ length: diff.level }, (_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-white bg-opacity-30 rounded border-2 border-white mx-1"
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">
            Choose your challenge level! 🎯
          </p>
        </div>
      </div>
    </div>
  )
}

export default DifficultySelector
