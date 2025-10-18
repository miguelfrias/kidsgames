import { useDroppable } from '@dnd-kit/core'
import { CellState, GRID_SIZE } from './tetrisUtils'

interface GameBoardProps {
  grid: CellState[][]
  highlightedCells?: Set<string>
  clearedCells?: Set<string>
}

function GameBoard({ grid, highlightedCells, clearedCells }: GameBoardProps) {
  return (
    <div className="inline-block bg-gray-800 p-2 rounded-lg shadow-2xl">
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              color={cell}
              isHighlighted={highlightedCells?.has(`${rowIndex}-${colIndex}`)}
              isCleared={clearedCells?.has(`${rowIndex}-${colIndex}`)}
            />
          ))
        )}
      </div>
    </div>
  )
}

interface GridCellProps {
  row: number
  col: number
  color: CellState
  isHighlighted?: boolean
  isCleared?: boolean
}

function GridCell({ row, col, color, isHighlighted, isCleared }: GridCellProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `cell-${row}-${col}`,
    data: { row, col },
  })

  return (
    <div
      ref={setNodeRef}
      className={`
        w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10
        rounded-sm
        transition-all duration-200
        ${color ? 'shadow-inner' : 'bg-gray-700'}
        ${isOver ? 'ring-2 ring-blue-400 scale-105' : ''}
        ${isHighlighted ? 'ring-2 ring-yellow-400 animate-pulse' : ''}
        ${isCleared ? 'animate-ping' : ''}
      `}
      style={{
        backgroundColor: color || undefined
      }}
    />
  )
}

export default GameBoard
