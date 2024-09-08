// src/components/Canvas2D.js
import React, { useRef, useEffect } from 'react';

const Canvas2D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw a simple rectangle
    context.fillStyle = '#FF0000';
    context.fillRect(50, 50, 200, 100);

    // Add more drawing logic here
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }} />;
};

export default Canvas2D;
