import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const FullPageCanvas3D = () => {
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [desiredLength, setDesiredLength] = useState('');
  const [lines, setLines] = useState([]); // Store 3D lines

  const PIXELS_PER_CM = 96 / 2.54;

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 500;

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
  }, []);

  const createLine = (start, end) => {
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const points = [];
    points.push(new THREE.Vector3(start.x, start.y, 0));
    points.push(new THREE.Vector3(end.x, end.y, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickPoint = {
      x: e.clientX - rect.left,
      y: -(e.clientY - rect.top), // Invert Y axis for Three.js
    };

    if (!isDrawing) {
      setIsDrawing(true);
      setStartPoint(clickPoint);
      setCurrentPoint(clickPoint);
    } else {
      finalizeLine(clickPoint);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let newPoint = {
      x: e.clientX - rect.left,
      y: -(e.clientY - rect.top), // Invert Y axis for Three.js
    };

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
  };

  const finalizeLine = (endPoint) => {
    const newLine = createLine(startPoint, endPoint);
    setLines([...lines, newLine]);
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentPoint(null);
    setDesiredLength('');
    
    // Automatically focus the input field for the next line
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setDesiredLength(e.target.value);
    if (startPoint && currentPoint) {
      handleMouseMove({ clientX: currentPoint.x, clientY: -currentPoint.y });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && startPoint && currentPoint) {
      finalizeLine(currentPoint); // Finalize the line on pressing Enter
    } else if (e.key === 'Escape') {
      setIsDrawing(false);
      setStartPoint(null);
      setCurrentPoint(null);
      setDesiredLength(''); // Reset the input value
      if (inputRef.current) {
        inputRef.current.style.display = 'none'; // Hide the input field
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
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
    </div>
  );
};

export default FullPageCanvas3D;
