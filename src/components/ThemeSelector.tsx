import { Theme } from '../types/WordBuilder.types'

interface ThemeSelectorProps {
  themes: Theme[]
  onThemeSelect: (theme: Theme) => void
}

function ThemeSelector({ themes, onThemeSelect }: ThemeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Choose Your Adventure! 🎯
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeSelect(theme)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-6 border-4 border-transparent hover:border-yellow-400"
            >
              <div className="text-6xl mb-4">{theme.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {theme.name}
              </h2>
              <p className="text-gray-600">
                Build words about {theme.name.toLowerCase()}!
              </p>
            </button>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">
            Pick a theme to start building words! 📝
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector
