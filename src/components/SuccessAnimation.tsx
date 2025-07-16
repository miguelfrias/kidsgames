import { useEffect, useState } from 'react'

interface SuccessAnimationProps {
  word: string
  image: string
  onComplete: () => void
}

function SuccessAnimation({ word, image, onComplete }: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`
      fixed inset-0 z-50 
      bg-black bg-opacity-50 
      flex items-center justify-center
      transition-opacity duration-300
      ${isVisible ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className={`
        bg-white 
        rounded-3xl 
        p-8 
        text-center 
        shadow-2xl
        transform transition-all duration-500
        ${isVisible ? 'scale-100' : 'scale-50'}
      `}>
        <div className="text-8xl mb-4 animate-bounce">
          {image}
        </div>
        
        <h2 className="text-4xl font-bold text-green-600 mb-4">
          Amazing! 🎉
        </h2>
        
        <div className="text-6xl font-bold text-blue-800 mb-4 animate-pulse">
          {word.toUpperCase()}
        </div>
        
        <div className="text-2xl text-gray-600">
          You built the word perfectly! ✨
        </div>
        
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-3 h-3 
                bg-yellow-400 
                rounded-full 
                animate-ping
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SuccessAnimation
