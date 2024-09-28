import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const FullPageCanvas = () => {
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [length, setLength] = useState(0);
  const [desiredLength, setDesiredLength] = useState('');
  const [lines, setLines] = useState([]);
  const [viewMode, setViewMode] = useState('2D');
  const [zoom, setZoom] = useState(1); // Track zoom level
  const [zoomStep, setZoomStep] = useState(0.1); // Zoom step size
  const threeContainerRef = useRef(null);
  const threeRendererRef = useRef(null); // Reference for the Three.js renderer
  const threeSceneRef = useRef(null); // Reference for the Three.js scene
  const threeCameraRef = useRef(null); // Reference for the Three.js camera

  const PIXELS_PER_CM = 96 / 2.54;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      clearCanvas(); // Clear the canvas on resize
      redrawLine();
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDrawing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDrawing]);

  useEffect(() => {
    if (viewMode === '3D') {
      initThreeJS();
    } else {
      if (threeRendererRef.current) {
        threeRendererRef.current.dispose(); // Clean up Three.js renderer
      }
      clearCanvas(); // Clear the canvas when switching back to 2D
      redrawLine(); // Redraw when switching back to 2D
    }
  }, [viewMode]);

  const calculateDistance = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateAngle = (startPoint, endPoint) => {
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const angleRad = Math.atan2(dy, dx); // Angle in radians
    const angleDeg = (angleRad * 180) / Math.PI; // Convert to degrees
    return angleDeg >= 0 ? angleDeg : angleDeg + 360; // Normalize to [0, 360) range
  };

  const handleCanvasClick = (e) => {
    const clickPoint = { x: e.clientX, y: e.clientY };
    
    if (!isDrawing) {
      setIsDrawing(true);
      setStartPoint(clickPoint);
      setCurrentPoint(clickPoint);
      setLength(0);
    } else {
      finalizeLine(clickPoint);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    let newPoint = { x: e.clientX, y: e.clientY };

    if (desiredLength) {
      const desiredPixels = parseFloat(desiredLength) * PIXELS_PER_CM;
      const dx = newPoint.x - startPoint.x;
      const dy = newPoint.y - startPoint.y;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      const scale = desiredPixels / currentDistance;
      
      newPoint = {
        x: startPoint.x + dx * scale,
        y: startPoint.y + dy * scale
      };
    }

    setCurrentPoint(newPoint);

    const distanceInPixels = calculateDistance(startPoint, newPoint);
    const distanceInCm = distanceInPixels / PIXELS_PER_CM;
    setLength(distanceInCm);

    redrawLine();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const redrawLine = () => {
    if (viewMode === '2D') {
      clearCanvas(); // Ensure the canvas is cleared before redrawing
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.save();
      context.scale(zoom, zoom); // Apply zoom transformation

      lines.forEach(line => {
        context.beginPath();
        context.moveTo(line.start.x, line.start.y);
        context.lineTo(line.end.x, line.end.y);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();

        // Calculate and display line length
        const lineLength = calculateDistance(line.start, line.end) / PIXELS_PER_CM;
        const midX = (line.start.x + line.end.x) / 2;
        const midY = (line.start.y + line.end.y) / 2;

        const padding = 5;
        const textWidth = context.measureText(`${lineLength.toFixed(2)} cm`).width;
        context.fillStyle = 'rgba(255, 255, 255, 0.7)';
        context.fillRect(midX - textWidth / 2 - padding, midY - 20, textWidth + padding * 2, 30);

        context.font = '14px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText(`${lineLength.toFixed(2)} cm`, midX, midY);

        // Calculate and display line angle
        const angle = calculateAngle(line.start, line.end);
        const angleText = `${angle.toFixed(2)}°`;
        const angleTextWidth = context.measureText(angleText).width;
        context.fillStyle = 'rgba(255, 255, 255, 0.7)';
        context.fillRect(midX - angleTextWidth / 2 - padding, midY - 40, angleTextWidth + padding * 2, 30);

        context.font = '14px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText(angleText, midX, midY - 20);
      });

      if (startPoint && currentPoint) {
        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(currentPoint.x, currentPoint.y);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();

        context.beginPath();
        context.arc(startPoint.x, startPoint.y, 5, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();

        const midX = (startPoint.x + currentPoint.x) / 2;
        const midY = (startPoint.y + currentPoint.y) / 2;

        const padding = 5;
        const textWidth = context.measureText(`${length.toFixed(2)} cm`).width;
        context.fillStyle = 'rgba(255, 255, 255, 0.7)';
        context.fillRect(midX - textWidth / 2 - padding, midY - 40, textWidth + padding * 2, 50);

        context.font = '14px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText(`${length.toFixed(2)} cm`, midX, midY - 20);

        if (inputRef.current) {
          inputRef.current.style.position = 'absolute';
          inputRef.current.style.left = `${midX - 50}px`;
          inputRef.current.style.top = `${midY - 60}px`;
          inputRef.current.style.width = '100px';
          inputRef.current.style.display = 'block';
        }
      }

      context.restore(); // Restore the context to its original state
    }
  };

  const finalizeLine = (endPoint) => {
    setLines([...lines, { start: startPoint, end: endPoint }]);
    setStartPoint(endPoint);
    setCurrentPoint(endPoint);
    setLength(0);
    setDesiredLength('');
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const cancelDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentPoint(null);
    setDesiredLength('');
    if (inputRef.current) {
      inputRef.current.style.display = 'none';
    }
  };

  const handleInputChange = (e) => {
    setDesiredLength(e.target.value);
    if (startPoint && currentPoint) {
      handleMouseMove({ clientX: currentPoint.x, clientY: currentPoint.y });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && startPoint && currentPoint) {
      finalizeLine(currentPoint);
    } else if (e.key === 'Escape') {
      cancelDrawing();
    }
  };

  const initThreeJS = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    if (threeContainerRef.current) {
      threeContainerRef.current.innerHTML = ''; // Clear previous content
      threeContainerRef.current.appendChild(renderer.domElement);
    }

    // Store Three.js objects in refs
    threeRendererRef.current = renderer;
    threeSceneRef.current = scene;
    threeCameraRef.current = camera;

    // Create line material
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    // Create geometry and add lines
    const lineGeometry = new THREE.BufferGeometry();
    const vertices = [];

    lines.forEach(line => {
      vertices.push(line.start.x, line.start.y, 0);
      vertices.push(line.end.x, line.end.y, 0);
    });

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Create line segments
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  };

  const toggleView = () => {
    if (viewMode === '2D') {
      setViewMode('3D');
    } else {
      setViewMode('2D');
    }
  };

  const zoomIn = () => {
    setZoom(prevZoom => prevZoom + zoomStep);
    redrawLine(); // Redraw to apply new zoom level
  };

  const zoomOut = () => {
    setZoom(prevZoom => Math.max(zoomStep, prevZoom - zoomStep)); // Prevent zoom-out below the minimum zoom level
    redrawLine(); // Redraw to apply new zoom level
  };

  return (
    <div style={{ position: 'relative' }}>
      {viewMode === '2D' ? (
        <>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            style={{ display: 'block', width: '100vw', height: '100vh' }}
          />
          <input
            ref={inputRef}
            type="number"
            value={desiredLength}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter length in cm"
            style={{ 
              position: 'absolute', 
              display: isDrawing ? 'block' : 'none',
              zIndex: 10
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={zoomIn} style={{ position: 'absolute', zIndex: 20, top: '10px', left: '10px' }}>
            Zoom In
          </button>
          <button onClick={zoomOut} style={{ position: 'absolute', zIndex: 20, top: '40px', left: '10px' }}>
            Zoom Out
          </button>
        </>
      ) : (
        <div ref={threeContainerRef} style={{ width: '100vw', height: '100vh' }} />
      )}
      <button onClick={toggleView} style={{ position: 'absolute', zIndex: 20, bottom: '10px', right: '10px' }}>
        {viewMode === '2D' ? '3D View' : '2D View'}
      </button>
    </div>
  );
};

export default FullPageCanvas;
