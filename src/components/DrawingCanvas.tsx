import React, { useRef, useState, useEffect } from 'react';
import { getRandomColor } from '../utils';

function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>(getRandomColor()); // Initial color is black
  const [strokeWidth, setStrokeWidth] = useState<number>(8); // Initial stroke width

  function setCanvasColorAndStroke() {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      setContext(ctx);
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
    }
  }

  function initializeCanvas() {
    if (!canvasRef.current) return;
    // Use setTimeout to ensure we get the correct dimensions after orientation change
    setTimeout(() => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth - 5;
      canvasRef.current.height = window.innerHeight - 108;
      setCanvasColorAndStroke();
    }, 100);
  }

  useEffect(() => {
    setCanvasColorAndStroke();
  }, [color, strokeWidth]);

  useEffect(() => {
    // Resize the canvas when the component mounts and whenever the window is resized
    initializeCanvas();
    
    const handleResize = () => {
      initializeCanvas();
    };
    
    const handleOrientationChange = () => {
      // Add a longer delay for orientation changes
      setTimeout(() => {
        initializeCanvas();
      }, 300);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    canvasRef.current?.addEventListener('touchstart', preventDefault);
    return () => {
      canvasRef.current?.addEventListener('touchstart', preventDefault);
    }
  }, []);

  const preventDefault = (e: TouchEvent) => e.preventDefault();

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return;

    setIsDrawing(true);
    // console.log(`startDrawings: `, e);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    context.beginPath();
    context.moveTo(
      clientX - canvasRef.current.offsetLeft,
      clientY - canvasRef.current.offsetTop
    );
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    context.lineTo(
      clientX - canvasRef.current.offsetLeft,
      clientY - canvasRef.current.offsetTop
    );
    context.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
    if (context) context.closePath();
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value); // Update the drawing color
  };

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStrokeWidth(Number(e.target.value)); // Update the stroke width
  };

  return (<>
    <div className='mt-1 mb-1 flex justify-center items-center'>
      <input type="color" value={color} onChange={handleColorChange} />
      &nbsp;
      <label className='ml-4'>
        Stroke Width:
        <select value={strokeWidth} onChange={handleStrokeWidthChange}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
          <option value={12}>12</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
        </select>
      </label>
      <button className='ml-4 py-1 py-1 bg-blue-400 px-4 rounded text-gray-50' onClick={clearCanvas}>Clear Canvas</button>
    </div>
    <div className='w-full overflow-hidden'>
      <canvas
        ref={canvasRef}
        width={385}
        height={385}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        className='overscroll-none'
        style={{ borderTop: '1px solid black' }}
      />
    </div>
  </>);
}

export default DrawingCanvas;
