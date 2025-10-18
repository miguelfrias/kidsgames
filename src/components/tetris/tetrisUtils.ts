export const GRID_SIZE = 10

export type CellState = string | null

export interface Position {
  x: number
  y: number
}

export interface TetrominoShape {
  shape: number[][]
  color: string
  name: string
}

export const TETROMINO_SHAPES: TetrominoShape[] = [
  {
    name: 'I',
    shape: [
      [1, 1, 1, 1]
    ],
    color: '#00F0F0'
  },
  {
    name: 'O',
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#F0F000'
  },
  {
    name: 'T',
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: '#A000F0'
  },
  {
    name: 'S',
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: '#00F000'
  },
  {
    name: 'Z',
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: '#F00000'
  },
  {
    name: 'J',
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: '#0000F0'
  },
  {
    name: 'L',
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: '#F0A000'
  }
]

export function createEmptyGrid(): CellState[][] {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
}

export function getRandomTetromino(): TetrominoShape {
  return TETROMINO_SHAPES[Math.floor(Math.random() * TETROMINO_SHAPES.length)]
}

export function canPlacePiece(
  grid: CellState[][],
  piece: TetrominoShape,
  position: Position
): boolean {
  const { shape } = piece
  const { x, y } = position

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        const gridX = x + col
        const gridY = y + row

        if (
          gridX < 0 ||
          gridX >= GRID_SIZE ||
          gridY < 0 ||
          gridY >= GRID_SIZE ||
          grid[gridY][gridX] !== null
        ) {
          return false
        }
      }
    }
  }

  return true
}

export function placePiece(
  grid: CellState[][],
  piece: TetrominoShape,
  position: Position
): CellState[][] {
  const newGrid = grid.map(row => [...row])
  const { shape, color } = piece
  const { x, y } = position

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        newGrid[y + row][x + col] = color
      }
    }
  }

  return newGrid
}

export function checkAndClearLines(grid: CellState[][]): {
  newGrid: CellState[][]
  linesCleared: number
} {
  let linesCleared = 0
  let newGrid = grid.map(row => [...row])

  const rowsToRemove: number[] = []
  const colsToRemove: number[] = []

  for (let row = 0; row < GRID_SIZE; row++) {
    if (newGrid[row].every(cell => cell !== null)) {
      rowsToRemove.push(row)
    }
  }

  for (let col = 0; col < GRID_SIZE; col++) {
    let isColFull = true
    for (let row = 0; row < GRID_SIZE; row++) {
      if (newGrid[row][col] === null) {
        isColFull = false
        break
      }
    }
    if (isColFull) {
      colsToRemove.push(col)
    }
  }

  rowsToRemove.forEach(row => {
    for (let col = 0; col < GRID_SIZE; col++) {
      newGrid[row][col] = null
    }
    linesCleared++
  })

  colsToRemove.forEach(col => {
    for (let row = 0; row < GRID_SIZE; row++) {
      newGrid[row][col] = null
    }
    linesCleared++
  })

  return { newGrid, linesCleared }
}

export function calculateScore(linesCleared: number): number {
  let score = linesCleared * 10
  if (linesCleared > 1) {
    score += 5
  }
  return score
}

export function hasAnyValidPlacement(
  grid: CellState[][],
  pieces: TetrominoShape[]
): boolean {
  for (const piece of pieces) {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (canPlacePiece(grid, piece, { x, y })) {
          return true
        }
      }
    }
  }
  return false
}

export function generateGuaranteedPieces(grid: CellState[][]): TetrominoShape[] {
  const maxAttempts = 50
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const pieces = [
      getRandomTetromino(),
      getRandomTetromino(),
      getRandomTetromino()
    ]
    
    if (hasAnyValidPlacement(grid, pieces)) {
      return pieces
    }
  }
  
  const allPieces = [...TETROMINO_SHAPES]
  for (let i = allPieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPieces[i], allPieces[j]] = [allPieces[j], allPieces[i]]
  }
  
  for (let i = 0; i < allPieces.length - 2; i++) {
    const pieces = [allPieces[i], allPieces[i + 1], allPieces[i + 2]]
    if (hasAnyValidPlacement(grid, pieces)) {
      return pieces
    }
  }
  
  return [allPieces[0], allPieces[1], allPieces[2]]
}
