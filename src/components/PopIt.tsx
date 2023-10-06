import React, { useState, useEffect, useRef } from 'react';
import 'animate.css';

const PopIt = () => {
  const imageWidth = 50;
  const imageHeight = 50;
  const runningTime = 30000; // 30 seconds
  const durationForEachItemDisplay = 2000; // 2 seconds
  const imagePath = './mickey_ears_edited.png';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [itemsDisplayed, setItemsDisplayed] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);

  // For random positioning of the item:
  useEffect(() => {
    if (!isGameRunning || isGameOver) return;

    const interval = setInterval(() => {
      setPosition(getRandomPosition());
      setItemsDisplayed(prev => prev + 1);
      imageRef?.current?.classList.toggle(`animate__bounce`);
    }, durationForEachItemDisplay);

    return () => clearInterval(interval);
  }, [isGameRunning, isGameOver]);

  // For the game timer:
  useEffect(() => {
    if (!isGameRunning) return;

    const gameTimer = setTimeout(() => {
      setIsGameOver(true);
      setIsGameRunning(false); // Stop the game after runningTime
    }, runningTime);

    return () => clearTimeout(gameTimer);
  }, [isGameRunning]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!isGameRunning) {
      return ;
    }

    if ((e.target as HTMLDivElement).tagName === 'IMG') {
      setScore(prev => prev + 1);
    }
  }

  function getRandomPosition() {
    if (!containerRef.current) return { x: 0, y: 0 };

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const x = Math.random() * (containerWidth - (imageWidth + imageWidth));
    const y = Math.random() * (containerHeight - (imageHeight + imageHeight));

    return { x, y };
  }

  function startGame() {
    setIsGameRunning(true);
    setIsGameOver(false);
    // Reset score and items displayed
    setScore(0);
    setItemsDisplayed(0);
    // Actually start the game
    setPosition(getRandomPosition());
    setItemsDisplayed(prev => prev + 1);
  }

  function stopGame() {
    setIsGameRunning(false);
    setIsGameOver(true); // To show the modal/results
    setPosition({x: 128, y: 128});
  }


  return (
    <div>
      <div className='py-1 mx-4'>
        <button className={`py-1 px-4 mr-3 rounded text-white ` + (!isGameRunning ? 'bg-blue-500' : 'bg-blue-200') } disabled={isGameRunning} onClick={startGame}>Start Game</button>
        <button className={`py-1 px-4 mr-3 rounded text-white ` + (isGameRunning ? 'bg-blue-500' : 'bg-blue-200') } disabled={!isGameRunning} onClick={stopGame}>Stop Game</button>
        <span className='ml-4'>Score {score}</span>
      </div>
      {/* Game container */}
      <div id="PopItGameContainer" ref={containerRef} onClick={(event) => { handleClick(event as React.MouseEvent<HTMLDivElement>) }} style={{ position: 'relative', width: '100vw', height: '88vh' }}>
        {/* Your image item */}
        {!isGameOver && <img ref={imageRef} className='transition-all animate__animated animate__bounce scale-150' src={imagePath} style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }} />}
        {isGameOver && <div className='shadow-2xl w-1/2 h-1/2 relative rounded border-slate-100 backdrop-contrast-80 m-auto top-6 p-5'><p><strong>Score: {score}</strong></p><p className='mt-2'>Total: {itemsDisplayed}</p></div>}
      </div>

      {/* Results modal */}
    </div>
  );
}

export default PopIt;