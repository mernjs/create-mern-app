import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToHistory, undo, redo } from '../features/drawing/drawingSlice';

function Canvas() {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const { tool, color, history, redoStack } = useSelector(state => state.drawing);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let startX, startY;

    const startDrawing = (e) => {
      isDrawing = true;
      startX = e.clientX - canvas.getBoundingClientRect().left;
      startY = e.clientY - canvas.getBoundingClientRect().top;
      if (tool === 'Fill') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        dispatch(addToHistory(canvas.toDataURL()));
      }
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      isDrawing = false;
      if (['Pencil', 'Line', 'Rectangle', 'Circle'].includes(tool)) {
        dispatch(addToHistory(canvas.toDataURL()));
      }
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;

      if (tool === 'Pencil') {
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else if (tool === 'Line') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = color;
        ctx.stroke();
      } else if (tool === 'Rectangle') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const width = x - startX;
        const height = y - startY;
        ctx.strokeStyle = color;
        ctx.strokeRect(startX, startY, width, height);
      } else if (tool === 'Circle') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.stroke();
      } else if (tool === 'Eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.arc(x, y, 10, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mousemove', draw);
    };
  }, [tool, color, dispatch]);

  const restoreCanvas = (imageData) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  useEffect(() => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      restoreCanvas(lastState);
    } else {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [history]);

  useEffect(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      restoreCanvas(nextState);
    }
  }, [redoStack]);

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border border-gray-500"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleUndo}
            className="p-2 bg-gray-300 rounded shadow-md hover:bg-gray-400"
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            className="p-2 bg-gray-300 rounded shadow-md hover:bg-gray-400"
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
