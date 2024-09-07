"use client"
import { useState, useCallback, useEffect, useRef } from "react";
import * as THREE from 'three';
import Layout from "@/components/Layout";
import { drawDottedLine, drawGrid, drawMeasurement, drawStartPointIndicator, getCanvasCoordinates, redrawLines } from "@/hooks/useLine";

export default function Home() {
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [is3DView, setIs3DView] = useState(false);
  
  const canvas2DRef = useRef(null);
  const canvas3DRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const lineMeshesRef = useRef([]); // Store references to line meshes

  const startLineDrawing = (e) => {
    const canvas = canvas2DRef.current;
    const clickPoint = getCanvasCoordinates(e, canvas);
    setIsDrawing(true);
    setStartPoint(clickPoint);
    setCurrentPoint(clickPoint);
  };

  const stopLineDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const newLine = { start: startPoint, end: currentPoint };
      setLines([...lines, newLine]);
      setMeasurements([...measurements, { start: startPoint, end: currentPoint }]);

      // Clear 2D canvas and redraw
      const canvas = canvas2DRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas);
      redrawLines(ctx, lines, measurements);


      setStartPoint(null);
      setCurrentPoint(null);
    }
  };

  const moveLineDrawing = (e) => {
    if (!isDrawing || !startPoint) return;
    const canvas = canvas2DRef.current;
    const newPoint = getCanvasCoordinates(e, canvas);
    setCurrentPoint(newPoint);

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx, canvas);
    redrawLines(ctx, lines);
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

  useEffect(() => {
    if (is3DView) {
      const canvas = canvas3DRef.current;
      if (canvas) {
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        rendererRef.current = renderer;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        sceneRef.current = scene;
        cameraRef.current = camera;

        // Create a function to update the 3D view with lines
        const update3DView = () => {
          console.log("LINES ==>>", lines)
          const linesIn3D = lines.map(line => {
            const material = new THREE.LineBasicMaterial({ color: 0xffffff });
            const points = [
              new THREE.Vector3(line.start.x, line.start.y, 0),
              new THREE.Vector3(line.end.x, line.end.y, 0),
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            return new THREE.Line(geometry, material);
          });

          // Clear existing line meshes
          lineMeshesRef.current.forEach(mesh => scene.remove(mesh));
          lineMeshesRef.current = [];

          // Add new line meshes
          linesIn3D.forEach(lineMesh => {
            scene.add(lineMesh);
            lineMeshesRef.current.push(lineMesh);
          });

          // Render the scene
          const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };

          animate();
        };

        update3DView();
      }
    }
  }, [is3DView, lines]);

  const toggleView = () => {
    setIs3DView(!is3DView);
  };

  return (
    <Layout>
      <button onClick={toggleView} style={{ margin: '10px' }}>
        {is3DView ? 'Switch to 2D View' : 'Switch to 3D View'}
      </button>
      {!is3DView && (
        <canvas 
          ref={canvas2DRef} 
          width={1140} 
          height={700} 
          onClick={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      )}
      {is3DView && (
        <canvas 
          ref={canvas3DRef} 
          width={1140} 
          height={700}
        />
      )}
    </Layout>
  );
}
