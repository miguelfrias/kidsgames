import Piece from './Piece'
import { TetrominoShape } from './tetrisUtils'

interface PieceBarProps {
  pieces: TetrominoShape[]
  draggedPieceId: string | null
}

function PieceBar({ pieces, draggedPieceId }: PieceBarProps) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-4 text-center">
        Drag a piece to the board
      </h3>
      <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
        {pieces.map((piece, index) => (
          <div
            key={`piece-${index}`}
            className="bg-white rounded-lg p-3 sm:p-4 shadow-md hover:shadow-xl transition-shadow"
          >
            <Piece
              piece={piece}
              id={`piece-${index}`}
              isDragging={draggedPieceId === `piece-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PieceBar
