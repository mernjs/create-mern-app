"use client";
import Layout from "@/components/Layout";
import { useCanvas } from "@/hooks/useCanvas";
import { drawDottedLine, drawGrid, drawMeasurement, drawStartPointIndicator, getCanvasCoordinates } from "@/hooks/useLine";
import { useState, useCallback } from "react";

export default function Home() {
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startLineDrawing = (e) => {
    const canvas = e.target;
    const clickPoint = getCanvasCoordinates(e, canvas);
    setIsDrawing(true);
    setStartPoint(clickPoint);
    setCurrentPoint(clickPoint);
  };

  const stopLineDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const moveLineDrawing = (e) => {
    if (!isDrawing || !startPoint) return;
    const canvas = e.target;
    const newPoint = getCanvasCoordinates(e, canvas);
    setCurrentPoint(newPoint);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx, canvas);
    drawDottedLine(ctx, startPoint, newPoint);
    drawMeasurement(ctx, startPoint, newPoint);
    drawStartPointIndicator(ctx, startPoint);
  };

  // Event handler for starting drawing
  const handleMouseDown = useCallback((e) => {
    startLineDrawing(e);
  }, [getCanvasCoordinates]);

  // Event handler for stopping drawing
  const handleMouseUp = useCallback(() => {
    stopLineDrawing();
  }, [isDrawing]);

  // Event handler for drawing on the canvas
  const handleMouseMove = useCallback((e) => {
    moveLineDrawing(e);
  }, [isDrawing, startPoint, getCanvasCoordinates]);

  const canvasRef = useCanvas((ctx, canvas) => {
    drawGrid(ctx, canvas); 
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
