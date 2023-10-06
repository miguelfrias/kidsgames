import { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (i:  number) => {
    const newBoard = [...board];
    if (calculateWinner() || newBoard[i]) return;

    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i: number) => {
    let squareClasses = 'square flex align-center justify-center';
    if (board[i]) {
        squareClasses += ` square-${board[i]}`;
    }
    return (
      <button className={squareClasses} onClick={() => handleClick(i)}>
        {board[i] || '\u00A0'}
      </button>
    );
  };

  const winner = calculateWinner();
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every((square) => square !== null)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className="game-board grid place-content-center text-center">
        <div className="status  my-5 font-bold">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className='flex justify-center my-4'>
        <button className="reset-button px-20 bg-blue-500 py-3 px-4 w-full rounded text-white inline-block" onClick={handleReset}>
            Reset Game
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;