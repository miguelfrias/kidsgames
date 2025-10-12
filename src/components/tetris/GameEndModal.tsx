interface GameEndModalProps {
  score: number
  onTryAgain: () => void
  onBackToMenu: () => void
}

function GameEndModal({ score, onTryAgain, onBackToMenu }: GameEndModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full animate-bounce-in">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Game Over!
          </h2>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 mb-6">
            <div className="text-lg font-medium mb-2">Your Score</div>
            <div className="text-5xl sm:text-6xl font-bold">{score}</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onTryAgain}
              className="
                w-full
                px-8 py-4
                bg-green-500 
                hover:bg-green-600 
                text-white 
                rounded-xl 
                font-bold 
                text-xl
                shadow-lg 
                hover:shadow-xl 
                transition-all 
                transform 
                hover:scale-105
              "
            >
              🔄 Try Again
            </button>

            <button
              onClick={onBackToMenu}
              className="
                w-full
                px-8 py-4
                bg-gray-500 
                hover:bg-gray-600 
                text-white 
                rounded-xl 
                font-bold 
                text-xl
                shadow-lg 
                hover:shadow-xl 
                transition-all 
                transform 
                hover:scale-105
              "
            >
              🏠 Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameEndModal
