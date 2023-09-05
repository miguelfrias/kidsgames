import React, { useRef, useState, useEffect } from 'react';
import { getRandomColor } from '../utils';

function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>(getRandomColor()); // Initial color is black
  const [strokeWidth, setStrokeWidth] = useState<number>(4); // Initial stroke width

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setContext(ctx);
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
      }
    }
  }, [color, strokeWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return;

    setIsDrawing(true);
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

  return (
    <div>
      <input type="color" value={color} onChange={handleColorChange} />
      <label>
        Stroke Width:
        <select value={strokeWidth} onChange={handleStrokeWidthChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>
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
        style={{ border: '1px solid black' }}
      />
      <button onClick={clearCanvas}>Clear Canvas</button>
    </div>
  );
}

export default DrawingCanvas;
