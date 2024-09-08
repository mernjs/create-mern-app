import React, { useRef, useEffect, useState } from 'react';

const CeilingView = () => {
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [length, setLength] = useState(0);
  const [desiredLength, setDesiredLength] = useState('');
  const [lines, setLines] = useState([]);
  const [viewMode, setViewMode] = useState('floor');
  const [wallHeightA, setWallHeightA] = useState('');
  const [wallHeightB, setWallHeightB] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(null);

  const PIXELS_PER_CM = 96 / 2.54;

  useEffect(() => {
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
  }, [lines, viewMode]);

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

  const redrawLine = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (viewMode === 'ceiling') {
      context.fillStyle = '#f0f0f0';
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    lines.forEach((line, index) => {
      context.beginPath();
      context.moveTo(line.start.x, line.start.y);
      context.lineTo(line.end.x, line.end.y);
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.stroke();

      if (line.heightA || line.heightB) {
        const midX = (line.start.x + line.end.x) / 2;
        const midY = (line.start.y + line.end.y) / 2;

        const padding = 5;
        const text = `Length: ${line.length.toFixed(2)} cm | A: ${line.heightA || 'N/A'} cm | B: ${line.heightB || 'N/A'} cm`;
        const textWidth = context.measureText(text).width;
        context.fillStyle = 'rgba(255, 255, 255, 0.7)';
        context.fillRect(midX - textWidth / 2 - padding, midY - 40, textWidth + padding * 2, 50);

        context.font = '14px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText(text, midX, midY - 20);
      }
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
  };

  const finalizeLine = (endPoint) => {
    setLines([...lines, { start: startPoint, end: endPoint, length: length }]);
    setStartPoint(endPoint);
    setCurrentPoint(endPoint);
    setLength(0);
    setDesiredLength('');
    setCurrentLineIndex(lines.length);

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

  const handleHeightChange = (e) => {
    if (currentLineIndex !== null) {
      const updatedLines = [...lines];
      updatedLines[currentLineIndex] = {
        ...updatedLines[currentLineIndex],
        heightA: wallHeightA,
        heightB: wallHeightB,
      };
      setLines(updatedLines);
      setWallHeightA('');
      setWallHeightB('');
      setCurrentLineIndex(null);
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
        onKeyDown={handleKeyDown}
        placeholder="Enter length in cm"
        style={{ 
          position: 'absolute', 
          display: isDrawing ? 'block' : 'none',
          zIndex: 10
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 20 }}>
        <button onClick={() => setViewMode('floor')} style={{ marginRight: 10 }}>Floor View</button>
        <button onClick={() => setViewMode('ceiling')}>Ceiling View</button>
      </div>
      {currentLineIndex !== null && (
        <div style={{ position: 'absolute', top: 60, left: 10, zIndex: 20 }}>
          <div>
            <label>
              Height A (cm):
              <input
                type="number"
                value={wallHeightA}
                onChange={(e) => setWallHeightA(e.target.value)}
                placeholder="Height A"
                style={{ marginLeft: 5 }}
              />
            </label>
          </div>
          <div>
            <label>
              Height B (cm):
              <input
                type="number"
                value={wallHeightB}
                onChange={(e) => setWallHeightB(e.target.value)}
                placeholder="Height B"
                style={{ marginLeft: 5 }}
              />
            </label>
          </div>
          <button onClick={handleHeightChange}>Submit Heights</button>
        </div>
      )}
    </div>
  );
};

export default CeilingView;
