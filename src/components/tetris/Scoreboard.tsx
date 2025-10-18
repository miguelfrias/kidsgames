interface ScoreboardProps {
  score: number
  timeRemaining: number
  isPaused: boolean
  onPause: () => void
  onResume: () => void
}

function Scoreboard({ score, timeRemaining, isPaused, onPause, onResume }: ScoreboardProps) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex-1 min-w-[120px]">
          <div className="text-sm sm:text-base text-gray-600 font-medium mb-1">Score</div>
          <div className="text-3xl sm:text-4xl font-bold text-blue-600">
            {score}
          </div>
        </div>
        
        <div className="flex-1 min-w-[120px]">
          <div className="text-sm sm:text-base text-gray-600 font-medium mb-1">Time</div>
          <div className={`text-3xl sm:text-4xl font-bold ${timeRemaining <= 10 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>

        <div className="flex-1 min-w-[120px] flex justify-end">
          <button
            onClick={isPaused ? onResume : onPause}
            className={`
              px-6 py-3 
              rounded-lg 
              font-bold 
              text-white 
              text-lg
              shadow-md 
              hover:shadow-lg 
              transition-all 
              transform 
              hover:scale-105
              ${isPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}
            `}
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Scoreboard
