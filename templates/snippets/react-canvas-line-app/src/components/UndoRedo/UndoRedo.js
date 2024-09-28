import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const UndoRedo = () => {
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentObject, setCurrentObject] = useState(null);
  const meshRef = useRef();

  // Function to add an action to history
  const addToHistory = (action) => {
    setHistory([...history, action]);
    setRedoStack([]); // Clear redo stack on new action
  };

  // Example function to handle an action (e.g., moving an object)
  const handleAction = () => {
    const newAction = {
      object: currentObject,
      // add other properties as needed
    };
    addToHistory(newAction);
    // Perform the action on the object...
  };

  const undo = () => {
    if (history.length > 0) {
      const lastAction = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setRedoStack([lastAction, ...redoStack]);
      // Undo the last action
      // For example, restore the object state
      setCurrentObject(lastAction.object);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextAction = redoStack[0];
      setRedoStack(redoStack.slice(1));
      setHistory([...history, nextAction]);
      // Redo the action
      setCurrentObject(nextAction.object);
    }
  };

  return (
    <div>
      <Canvas style={{ height: '600px', width: '800px' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh
          ref={meshRef}
          onClick={handleAction}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
        <OrbitControls />
      </Canvas>
      <button onClick={undo} disabled={history.length === 0}>
        Undo
      </button>
      <button onClick={redo} disabled={redoStack.length === 0}>
        Redo
      </button>
    </div>
  );
};

export default UndoRedo;
