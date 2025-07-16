import { Link } from 'react-router-dom'

function Dashboard() {
  const games = [
    {
      name: 'Word Builder',
      href: '/word-builder',
      icon: '📝',
      description: 'Build words by dragging letters! Learn phonics and spelling.',
      color: 'bg-purple-500'
    },
    {
      name: 'Random Letter',
      href: '/random-letter',
      icon: '🔤',
      description: 'Practice letter recognition with fun animations.',
      color: 'bg-blue-500'
    },
    {
      name: 'Random Color',
      href: '/random-color',
      icon: '🌈',
      description: 'Learn colors with interactive displays.',
      color: 'bg-green-500'
    },
    {
      name: 'Tic Tac Toe',
      href: '/tic-tac-toe',
      icon: '⭕',
      description: 'Classic game to practice strategy and thinking.',
      color: 'bg-red-500'
    },
    {
      name: 'Draw',
      href: '/draw',
      icon: '🎨',
      description: 'Free drawing canvas with colors and brushes.',
      color: 'bg-yellow-500'
    },
    {
      name: 'PopIt',
      href: '/popit',
      icon: '🫧',
      description: 'Satisfying bubble popping game for relaxation.',
      color: 'bg-pink-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🎮 Kids Learning Games 🎮
          </h1>
          <p className="text-xl text-gray-600">
            Fun educational games for children aged 3-6 years old!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link
              key={game.name}
              to={game.href}
              className={`
                ${game.color} 
                text-white 
                rounded-2xl 
                shadow-lg 
                hover:shadow-xl 
                transform 
                hover:scale-105 
                transition-all 
                duration-200 
                p-6 
                block
              `}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {game.icon}
                </div>
                <h2 className="text-2xl font-bold mb-3">
                  {game.name}
                </h2>
                <p className="text-white text-opacity-90">
                  {game.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Choose a game above to start learning and having fun! 🌟
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
