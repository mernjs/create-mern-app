"use client";
import Layout from "@/components/Layout";
import { useCanvas } from "@/hooks/useCanvas";
import { drawDottedLine, drawGrid, drawMeasurement, drawStartPointIndicator, getCanvasCoordinates } from "@/hooks/useLine";
import { useState, useCallback, useEffect } from "react";

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
      setStartPoint(null);
      setCurrentPoint(null);
      // Clear canvas and redraw grid
      const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas);
    }
  };

  const moveLineDrawing = (e) => {
    if (!isDrawing || !startPoint) return;
    const canvas = e.target;
    const newPoint = getCanvasCoordinates(e, canvas);
    setCurrentPoint(newPoint);

    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    
    drawGrid(ctx, canvas);
    drawDottedLine(ctx, startPoint, newPoint);
    drawMeasurement(ctx, startPoint, newPoint);
    drawStartPointIndicator(ctx, startPoint);

    ctx.restore();
  };

  const handleMouseDown = useCallback((e) => {
    startLineDrawing(e);
  }, []);

  const handleMouseUp = useCallback(() => {
    stopLineDrawing();
  }, [isDrawing]);

  const handleMouseMove = useCallback((e) => {
    moveLineDrawing(e);
  }, [isDrawing, startPoint]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      stopLineDrawing();
    }
  }, [isDrawing]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
        width={1140} 
        height={700} 
      />
    </Layout>
  );
}
