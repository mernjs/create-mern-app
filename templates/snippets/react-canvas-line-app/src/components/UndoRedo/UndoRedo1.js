import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ThreeDView = () => {
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);
  const meshRef = useRef();

  // Function to add an action to history
  const addToHistory = (newPosition) => {
    setHistory([...history, position]);
    setRedoStack([]); // Clear redo stack on new action
    setPosition(newPosition);
  };

  // Example function to move the object
  const moveObject = () => {
    const newPosition = [position[0] + 1, position[1], position[2]];
    addToHistory(newPosition);
  };

  const undo = () => {
    if (history.length > 0) {
      const lastPosition = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setRedoStack([position, ...redoStack]);
      setPosition(lastPosition);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextPosition = redoStack[0];
      setRedoStack(redoStack.slice(1));
      setHistory([...history, position]);
      setPosition(nextPosition);
    }
  };

  return (
    <div>
      <Canvas style={{ height: '600px', width: '800px' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={meshRef} position={position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
        <OrbitControls />
      </Canvas>
      <div>
        <button onClick={moveObject}>Move Object</button>
        <button onClick={undo} disabled={history.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={redoStack.length === 0}>
          Redo
        </button>
      </div>
      <p>Current Position: {`(${position.join(', ')})`}</p>
    </div>
  );
};

export default ThreeDView;
