import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToHistory, undo, redo } from '../drawingSlice';
import ThreeDView from './ThreeDView'; // Import the ThreeDView component

function TwoDView() {
    const canvasRef = useRef(null);
    const dispatch = useDispatch();
    const { tool, history } = useSelector(state => state.drawing);
    const [shapes, setShapes] = React.useState([]); // State to keep track of drawn shapes

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let startX, startY;

        const startDrawing = (e) => {
            isDrawing = true;
            startX = e.clientX - canvas.getBoundingClientRect().left;
            startY = e.clientY - canvas.getBoundingClientRect().top;
        };

        const stopDrawing = (e) => {
            if (!isDrawing) return;
            isDrawing = false;

            const x = e.clientX - canvas.getBoundingClientRect().left;
            const y = e.clientY - canvas.getBoundingClientRect().top;

            let shape = null;

            if (tool === 'Line') {
                shape = { type: 'Line', startX, startY, endX: x, endY: y };
            } else if (tool === 'Rectangle') {
                shape = { type: 'Rectangle', x: startX, y: startY, width: x - startX, height: y - startY };
            } else if (tool === 'Circle') {
                const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                shape = { type: 'Circle', x: startX, y: startY, radius };
            }

            if (shape) {
                setShapes(prevShapes => [...prevShapes, shape]);
                dispatch(addToHistory(canvas.toDataURL()));
            }
        };

        const draw = (e) => {
            if (!isDrawing) return;
            const x = e.clientX - canvas.getBoundingClientRect().left;
            const y = e.clientY - canvas.getBoundingClientRect().top;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            restoreCanvas(history[history.length - 1]);

            if (tool === 'Line') {
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'black';
                ctx.stroke();
            } else if (tool === 'Rectangle') {
                const width = x - startX;
                const height = y - startY;
                ctx.strokeStyle = 'black';
                ctx.strokeRect(startX, startY, width, height);
            } else if (tool === 'Circle') {
                const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, Math.PI * 2);
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }
        };

        const restoreCanvas = (imageData) => {
            if (!imageData) return;
            const img = new Image();
            img.src = imageData;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mousemove', draw);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mousemove', draw);
        };
    }, [tool, history, dispatch]);

    return (
        <div className="flex h-screen">
            <div className="flex-1 p-4 border-r border-gray-300">
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        className="border border-gray-500"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                            onClick={() => dispatch(undo())}
                            className="p-2 bg-gray-300 rounded shadow-md hover:bg-gray-400"
                        >
                            Undo
                        </button>
                        <button
                            onClick={() => dispatch(redo())}
                            className="p-2 bg-gray-300 rounded shadow-md hover:bg-gray-400"
                        >
                            Redo
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <ThreeDView shapes={shapes} />
            </div>
        </div>
    );
}

export default TwoDView;
