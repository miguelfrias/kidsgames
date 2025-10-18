import { useDraggable } from '@dnd-kit/core'
import { TetrominoShape } from './tetrisUtils'

interface PieceProps {
  piece: TetrominoShape
  id: string
  isDragging?: boolean
}

function Piece({ piece, id, isDragging }: PieceProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: id,
    data: piece,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    // prevent browser touch scrolling/panning while dragging
    touchAction: 'none',
    WebkitTapHighlightColor: 'transparent',
  } : { touchAction: 'none', WebkitTapHighlightColor: 'transparent' }

  const cellSize = 'w-8 h-8 sm:w-10 sm:h-10'

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        inline-block
        cursor-grab
        transition-all duration-200
        hover:scale-105
        ${isDragging ? 'opacity-50 scale-95 cursor-grabbing' : ''}
        select-none
        touch-manipulation
      `}
    >
      <div className="inline-grid gap-0.5">
        {piece.shape.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-0.5">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`
                  ${cellSize}
                  rounded
                  ${cell === 1 ? 'shadow-md' : ''}
                  ${cell === 0 ? 'opacity-0' : ''}
                `}
                style={{
                  backgroundColor: cell === 1 ? piece.color : 'transparent'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Piece
