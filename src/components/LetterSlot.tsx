import { useDroppable } from '@dnd-kit/core'
import { LetterSlotProps } from '../types/WordBuilder.types'

function LetterSlot({ index, letter, correctLetter, isHighlighted }: LetterSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: index.toString(),
  })

  const isEmpty = letter === null
  const isCorrect = letter === correctLetter

  return (
    <div
      ref={setNodeRef}
      className={`
        w-16 h-16 sm:w-20 sm:h-20 
        border-4 border-dashed
        rounded-xl 
        flex items-center justify-center 
        text-3xl sm:text-4xl 
        font-bold 
        transition-all duration-300
        ${isEmpty ? 'border-gray-400 bg-gray-100' : ''}
        ${isCorrect ? 'border-green-500 bg-green-100 text-green-800' : ''}
        ${!isEmpty && !isCorrect ? 'border-red-500 bg-red-100 text-red-800' : ''}
        ${isHighlighted ? 'border-yellow-500 bg-yellow-100 animate-pulse border-solid' : ''}
        ${isOver ? 'border-blue-500 bg-blue-50 scale-105' : ''}
        select-none
      `}
    >
      {letter ? letter.toUpperCase() : ''}
    </div>
  )
}

export default LetterSlot
