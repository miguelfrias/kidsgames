import { LetterTileProps } from '../types/WordBuilder.types'

function LetterTile({ letter, index, onDragStart, onDragEnd, isDragging }: LetterTileProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', letter)
    e.dataTransfer.setData('index', index.toString())
    onDragStart(index)
  }

  const handleDragEnd = () => {
    onDragEnd()
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        w-16 h-16 sm:w-20 sm:h-20 
        bg-white 
        border-4 border-blue-400 
        rounded-xl 
        flex items-center justify-center 
        text-3xl sm:text-4xl 
        font-bold 
        text-blue-800 
        cursor-grab
        shadow-lg
        transition-all duration-200
        hover:shadow-xl hover:scale-105
        ${isDragging ? 'opacity-50 scale-95' : ''}
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        select-none
        touch-manipulation
      `}
    >
      {letter.toUpperCase()}
    </div>
  )
}

export default LetterTile
