import { useState, useEffect, useCallback } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useNavigate } from 'react-router-dom'
import GameBoard from './GameBoard'
import PieceBar from './PieceBar'
import Scoreboard from './Scoreboard'
import GameEndModal from './GameEndModal'
import DifficultySelector, { DifficultySettings, DIFFICULTY_LEVELS } from './DifficultySelector'
import {
  createEmptyGrid,
  canPlacePiece,
  placePiece,
  checkAndClearLines,
  calculateScore,
  generateGuaranteedPieces,
  hasAnyValidPlacement,
  TetrominoShape,
  CellState,
  GRID_SIZE
} from './tetrisUtils'

function TetrisGame() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState<'difficulty' | 'playing' | 'ended'>('difficulty')
  const [grid, setGrid] = useState<CellState[][]>(createEmptyGrid())
  const [availablePieces, setAvailablePieces] = useState<TetrominoShape[]>([])
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(90)
  const [isPaused, setIsPaused] = useState(false)
  const [draggedPieceId, setDraggedPieceId] = useState<string | null>(null)
  const [clearedCells, setClearedCells] = useState<Set<string>>(new Set())
  const [difficulty, setDifficulty] = useState<DifficultySettings>(DIFFICULTY_LEVELS[1])

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 8,
      },
    })
  )

  const startGame = useCallback((selectedDifficulty: DifficultySettings) => {
    const emptyGrid = createEmptyGrid()
    setGrid(emptyGrid)
    setAvailablePieces(generateGuaranteedPieces(emptyGrid))
    setScore(0)
    setTimeRemaining(selectedDifficulty.timeLimit)
    setIsPaused(false)
    setGameState('playing')
    setDifficulty(selectedDifficulty)
  }, [])

  const resetGame = useCallback(() => {
    startGame(difficulty)
  }, [difficulty, startGame])

  const endGame = useCallback(() => {
    setGameState('ended')
    setIsPaused(true)
  }, [])

  useEffect(() => {
    if (gameState !== 'playing' || isPaused || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState, isPaused, timeRemaining, endGame])

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedPieceId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedPieceId(null)
    
    const { active, over } = event

    if (!over) return

    const pieceIndex = parseInt((active.id as string).split('-')[1])
    const piece = availablePieces[pieceIndex]

    if (!piece) return

    const cellId = over.id as string
    if (!cellId.startsWith('cell-')) return

    const [, row, col] = cellId.split('-').map(Number)
    const position = { x: col, y: row }

    if (canPlacePiece(grid, piece, position)) {
      const newGrid = placePiece(grid, piece, position)
      
      const { newGrid: clearedGrid, linesCleared } = checkAndClearLines(newGrid)
      
      if (linesCleared > 0) {
        const cellsToAnimate = new Set<string>()
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
            if (newGrid[r][c] !== null && clearedGrid[r][c] === null) {
              cellsToAnimate.add(`${r}-${c}`)
            }
          }
        }
        setClearedCells(cellsToAnimate)
        
        setTimeout(() => {
          setClearedCells(new Set())
          setGrid(clearedGrid)
        }, 400)
        
        setScore((prev) => prev + calculateScore(linesCleared))
      } else {
        setGrid(clearedGrid)
      }

      const newPieces = [...availablePieces]
      const emptyGrid = linesCleared > 0 ? clearedGrid : newGrid
      newPieces[pieceIndex] = generateGuaranteedPieces(emptyGrid)[0]
      
      if (!hasAnyValidPlacement(emptyGrid, newPieces)) {
        setTimeout(() => {
          endGame()
        }, linesCleared > 0 ? 500 : 0)
      } else {
        setAvailablePieces(newPieces)
      }
    }
  }

  const handlePause = () => setIsPaused(true)
  const handleResume = () => setIsPaused(false)

  const handleBackToMenu = () => {
    navigate('/')
  }

  const handleBackToDifficulty = () => {
    setGameState('difficulty')
  }

  if (gameState === 'difficulty') {
    return (
      <DifficultySelector
        onSelect={startGame}
        onBack={handleBackToMenu}
      />
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-100 to-blue-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Scoreboard
            score={score}
            timeRemaining={timeRemaining}
            isPaused={isPaused}
            onPause={handlePause}
            onResume={handleResume}
          />
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="relative">
              <GameBoard
                grid={grid}
                clearedCells={clearedCells}
              />
              {isPaused && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="text-white text-4xl font-bold">PAUSED</div>
                </div>
              )}
            </div>

            <PieceBar
              pieces={availablePieces}
              draggedPieceId={draggedPieceId}
            />
          </div>
        </DndContext>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleBackToDifficulty}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium transition-colors"
          >
            ← Change Difficulty
          </button>
        </div>
      </div>

      {gameState === 'ended' && (
        <GameEndModal
          score={score}
          onTryAgain={resetGame}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  )
}

export default TetrisGame
