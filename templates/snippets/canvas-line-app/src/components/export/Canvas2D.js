import React, { useRef, useEffect } from 'react';

const Canvas2D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#FF0000';
    context.fillRect(50, 50, 200, 100);
  }, []);

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'design.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }} />
      <button onClick={exportCanvas}>Export as PNG</button>
    </div>
  );
};

export default Canvas2D;
