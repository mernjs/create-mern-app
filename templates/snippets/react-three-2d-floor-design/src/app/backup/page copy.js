"use client";
import Layout from "@/components/Layout";
import { useCanvas } from "@/hooks/useCanvas";
import { useState, useCallback } from "react";

export default function Home() {
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Function to get canvas coordinates from mouse event
  const getCanvasCoordinates = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const startDrawing = (e) => {
    const canvas = e.target;
    const clickPoint = getCanvasCoordinates(e, canvas);
    setIsDrawing(true);
    setStartPoint(clickPoint);
    setCurrentPoint(clickPoint);
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  }

  const drawLine = (e) => {
    if (!isDrawing || !startPoint) return;
    
    const canvas = e.target;
    const newPoint = getCanvasCoordinates(e, canvas);
    setCurrentPoint(newPoint);

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(newPoint.x, newPoint.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw start point indicator
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  // Event handler for starting drawing
  const handleMouseDown = useCallback((e) => {
    startDrawing(e)
  }, [getCanvasCoordinates]);

  // Event handler for stopping drawing
  const handleMouseUp = useCallback((e) => {
    stopDrawing(e)
  }, [isDrawing]);

  // Event handler for drawing on the canvas
  const handleMouseMove = useCallback((e) => {
    drawLine(e)
  }, [isDrawing, startPoint, getCanvasCoordinates]);

  const canvasRef = useCanvas((ctx, canvas) => {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  });

  return (
    <Layout>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        style={{ display: 'block', width: '100vw', height: '100vh' }} 
      />
    </Layout>
  );
}
