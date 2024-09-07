import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Rotation = () => {
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [transform, setTransform] = useState({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  });
  const meshRef = useRef();

  // Function to add a transformation to history
  const addToHistory = (newTransform) => {
    setHistory([...history, transform]);
    setRedoStack([]); // Clear redo stack on new action
    setTransform(newTransform);
  };

  // Example function to move the object
  const moveObject = () => {
    const newPosition = [transform.position[0] + 1, transform.position[1], transform.position[2]];
    addToHistory({ ...transform, position: newPosition });
  };

  // Function to rotate the object
  const rotateObject = () => {
    const newRotation = [transform.rotation[0], transform.rotation[1] + Math.PI / 4, transform.rotation[2]];
    addToHistory({ ...transform, rotation: newRotation });
  };

  const undo = () => {
    if (history.length > 0) {
      const lastTransform = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setRedoStack([transform, ...redoStack]);
      setTransform(lastTransform);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextTransform = redoStack[0];
      setRedoStack(redoStack.slice(1));
      setHistory([...history, transform]);
      setTransform(nextTransform);
    }
  };

  return (
    <div>
      <Canvas style={{ height: '600px', width: '800px' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={meshRef} position={transform.position} rotation={transform.rotation}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
        <OrbitControls />
      </Canvas>
      <div>
        <button onClick={moveObject}>Move Object</button>
        <button onClick={rotateObject}>Rotate Object</button>
        <button onClick={undo} disabled={history.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={redoStack.length === 0}>
          Redo
        </button>
      </div>
      <p>Current Position: {`(${transform.position.join(', ')})`}</p>
      <p>Current Rotation: {`(${transform.rotation.map(r => (r * 180 / Math.PI).toFixed(2)).join(', ')}°)`}</p>
    </div>
  );
};

export default Rotation;

