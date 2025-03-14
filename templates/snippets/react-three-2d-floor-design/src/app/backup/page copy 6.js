"use client";
import Layout from "@/components/Layout";
import { useCanvas } from "@/hooks/useCanvas";
import { drawDottedLine, drawGrid, drawMeasurement, drawStartPointIndicator, getCanvasCoordinates, redrawLines } from "@/hooks/useLine";
import { useState, useCallback, useEffect } from "react";

export default function Home() {
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]); // Array to store multiple lines
  const [measurements, setMeasurements] = useState([]); // Array to store measurements

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
      const newLine = { start: startPoint, end: currentPoint };
      setLines([...lines, newLine]); // Store the completed line
      setMeasurements([...measurements, { start: startPoint, end: currentPoint }]); // Store measurement for the new line

      // Clear canvas and redraw grid
      const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas);
      redrawLines(ctx, lines, measurements); // Redraw all lines with measurements

      setStartPoint(null);
      setCurrentPoint(null);
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
    redrawLines(ctx, lines); // Redraw all lines
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
  }, [isDrawing, lines, startPoint, currentPoint]);

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
    redrawLines(ctx, lines, measurements); // Draw existing lines and measurements on canvas
    canvas.addEventListener('mouseup', handleMouseUp);
    return () => {
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
    <Layout>
      <canvas 
        ref={canvasRef} 
        width={1140} 
        height={700} 
        onClick={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
    </Layout>
  );
}
