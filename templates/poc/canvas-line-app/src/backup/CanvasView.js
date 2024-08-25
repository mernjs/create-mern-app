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
  const [lines, setLines] = useState([]); // Array to store multiple lines
  const [view, setView] = useState('plane'); // State to manage the view

  const PIXELS_PER_CM = 96 / 2.54;

  // Initial setup for 2D Canvas
  useEffect(() => {
    if (view === 'plane') {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redrawLine();
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [view]);

  // Set focus to input when drawing starts
  useEffect(() => {
    if (isDrawing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDrawing]);

  const calculateDistance = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleCanvasClick = (e) => {
    if (view !== 'plane') return; // Prevent interaction when not in plane view

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
    if (!isDrawing || view !== 'plane') return;

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

  const redrawLine = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw all previously drawn lines
    lines.forEach(line => {
      context.beginPath();
      context.moveTo(line.start.x, line.start.y);
      context.lineTo(line.end.x, line.end.y);
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.stroke();
    });

    // Draw the current line being drawn
    if (startPoint && currentPoint) {
      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(currentPoint.x, currentPoint.y);
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.stroke();

      // Draw start point indicator
      context.beginPath();
      context.arc(startPoint.x, startPoint.y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();

      // Calculate midpoint for text positioning
      const midX = (startPoint.x + currentPoint.x) / 2;
      const midY = (startPoint.y + currentPoint.y) / 2;

      // Draw background for text
      const padding = 5;
      const textWidth = context.measureText(`${length.toFixed(2)} cm`).width;
      context.fillStyle = 'rgba(255, 255, 255, 0.7)';
      context.fillRect(midX - textWidth / 2 - padding, midY - 40, textWidth + padding * 2, 50);

      // Draw length text
      context.font = '14px Arial';
      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.fillText(`${length.toFixed(2)} cm`, midX, midY - 20);

      // Position input field
      if (inputRef.current) {
        inputRef.current.style.position = 'absolute';
        inputRef.current.style.left = `${midX - 50}px`;
        inputRef.current.style.top = `${midY - 60}px`;
        inputRef.current.style.width = '100px';
        inputRef.current.style.display = 'block';
      }
    }
  };

  const finalizeLine = (endPoint) => {
    setLines([...lines, { start: startPoint, end: endPoint }]); // Store the completed line
    setStartPoint(endPoint); // Start a new line from the end of the previous line
    setCurrentPoint(endPoint);
    setLength(0); // Reset the length for the new line
    setDesiredLength(''); // Reset the input value after placing the line
    
    // Automatically focus the input field for the next line
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const cancelDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentPoint(null);
    setDesiredLength(''); // Reset the input value
    if (inputRef.current) {
      inputRef.current.style.display = 'none'; // Hide the input field
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
      finalizeLine(currentPoint); // Finalize the line on pressing Enter
    } else if (e.key === 'Escape') {
      cancelDrawing(); // Cancel the current line drawing on pressing Escape
    }
  };

  const render3DView = () => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 500;

    // Add lines to the 3D scene
    lines.forEach(({ start, end }) => {
      const material = new THREE.LineBasicMaterial({ color: 0x000000 });
      const points = [];
      points.push(new THREE.Vector3(start.x, start.y, 0));
      points.push(new THREE.Vector3(end.x, end.y, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  return (
    <div style={{ position: 'relative' }}>
      <div>
        <button onClick={() => setView('plane')}>Plane View</button>
        <button onClick={() => setView('3d')}>3D View</button>
      </div>
      
      {view === 'plane' && (
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
              onKeyDown={handleKeyDown} // Listen for Enter and Escape keys
              placeholder="Enter length in cm"
              style={{ 
                position: 'absolute', 
                display: isDrawing ? 'block' : 'none',
                zIndex: 10
              }}
              onClick={(e) => e.stopPropagation()} // Prevent canvas click when clicking input
            />
          </>
        )}
  
        {view === '3d' && (
          <div
            ref={canvasRef}
            style={{ display: 'block', width: '100vw', height: '100vh' }}
          />
        )}
      </div>
    );
  };
  
  export default FullPageCanvas;
  
