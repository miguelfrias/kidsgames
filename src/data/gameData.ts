import { Theme } from '../types/WordBuilder.types'

export const themes: Theme[] = [
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    words: {
      3: [
        { word: 'cat', image: '🐱' },
        { word: 'dog', image: '🐶' },
        { word: 'pig', image: '🐷' },
        { word: 'owl', image: '🦉' },
        { word: 'fox', image: '🦊' },
        { word: 'bee', image: '🐝' },
        { word: 'cow', image: '🐄' },
        { word: 'bat', image: '🦇' }
      ],
      4: [
        { word: 'bear', image: '🐻' },
        { word: 'lion', image: '🦁' },
        { word: 'duck', image: '🦆' },
        { word: 'frog', image: '🐸' },
        { word: 'fish', image: '🐟' },
        { word: 'bird', image: '🐦' },
        { word: 'wolf', image: '🐺' }
      ],
      5: [
        { word: 'horse', image: '🐴' },
        { word: 'tiger', image: '🐅' },
        { word: 'sheep', image: '🐑' },
        { word: 'mouse', image: '🐭' },
        { word: 'snake', image: '🐍' }
      ]
    }
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    words: {
      3: [
        { word: 'sun', image: '☀️' },
        { word: 'sky', image: '🌌' },
        { word: 'sea', image: '🌊' },
        { word: 'ice', image: '🧊' },
        { word: 'mud', image: '🟫' },
        { word: 'fog', image: '🌫️' }
      ],
      4: [
        { word: 'tree', image: '🌳' },
        { word: 'leaf', image: '🍃' },
        { word: 'rock', image: '🪨' },
        { word: 'moon', image: '🌙' },
        { word: 'rain', image: '🌧️' },
        { word: 'snow', image: '❄️' },
        { word: 'wind', image: '💨' }
      ],
      5: [
        { word: 'ocean', image: '🌊' },
        { word: 'river', image: '🏞️' },
        { word: 'field', image: '🌾' },
        { word: 'stone', image: '🪨' },
        { word: 'plant', image: '🌱' }
      ]
    }
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: '🚗',
    words: {
      3: [
        { word: 'car', image: '🚗' },
        { word: 'bus', image: '🚌' },
        { word: 'van', image: '🚐' },
        { word: 'jet', image: '✈️' }
      ],
      4: [
        { word: 'bike', image: '🚲' },
        { word: 'boat', image: '⛵' },
        { word: 'ship', image: '🚢' },
        { word: 'taxi', image: '🚕' },
        { word: 'fire', image: '🚒' }
      ],
      5: [
        { word: 'train', image: '🚂' },
        { word: 'truck', image: '🚚' },
        { word: 'plane', image: '✈️' }
      ]
    }
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍎',
    words: {
      3: [
        { word: 'pie', image: '🥧' },
        { word: 'egg', image: '🥚' },
        { word: 'ham', image: '🍖' },
        { word: 'tea', image: '🍵' },
        { word: 'nut', image: '🥜' }
      ],
      4: [
        { word: 'cake', image: '🎂' },
        { word: 'milk', image: '🥛' },
        { word: 'rice', image: '🍚' },
        { word: 'soup', image: '🍲' },
        { word: 'meat', image: '🍖' },
        { word: 'corn', image: '🌽' }
      ],
      5: [
        { word: 'bread', image: '🍞' },
        { word: 'apple', image: '🍎' },
        { word: 'pizza', image: '🍕' },
        { word: 'honey', image: '🍯' },
        { word: 'grape', image: '🍇' }
      ]
    }
  }
]

export function getRandomWord(themeId: string, difficulty: 3 | 4 | 5) {
  const theme = themes.find(t => t.id === themeId)
  if (!theme) return null
  
  const words = theme.words[difficulty]
  return words[Math.floor(Math.random() * words.length)]
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
