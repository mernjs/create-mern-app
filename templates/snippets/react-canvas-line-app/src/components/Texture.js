import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

// Constants
const GRID_SIZE = 1;

const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

// Shape Types
const SHAPE_TYPES = {
  BOX: 'Box',
  SPHERE: 'Sphere',
  CYLINDER: 'Cylinder',
  CONE: 'Cone',
};

const Texture = () => {
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [transform, setTransform] = useState({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  });
  const [shapeType, setShapeType] = useState(SHAPE_TYPES.BOX);
  const [texture, setTexture] = useState(null);
  const meshRef = useRef();

  useEffect(() => {
    if (texture) {
      const loader = new THREE.TextureLoader();
      loader.load(texture, (loadedTexture) => {
        if (meshRef.current) {
          meshRef.current.material.map = loadedTexture;
          meshRef.current.material.needsUpdate = true;
        }
      });
    }
  }, [texture]);

  const addToHistory = (newTransform) => {
    setHistory([...history, transform]);
    setRedoStack([]); // Clear redo stack on new action
    setTransform(newTransform);
  };

  const moveObject = () => {
    const newPosition = [
      snapToGrid(transform.position[0] + 1),
      snapToGrid(transform.position[1]),
      snapToGrid(transform.position[2]),
    ];
    addToHistory({ ...transform, position: newPosition });
  };

  const rotateObject = () => {
    const newRotation = [
      snapToGrid(transform.rotation[0]),
      snapToGrid(transform.rotation[1] + Math.PI / 4),
      snapToGrid(transform.rotation[2]),
    ];
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

  const exportAsSTL = () => {
    const exporter = new STLExporter();
    const scene = new THREE.Scene();
    scene.add(meshRef.current);

    const stlData = exporter.parse(scene);
    const blob = new Blob([stlData], { type: 'application/sla' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'model.stl';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderShape = () => {
    switch (shapeType) {
      case SHAPE_TYPES.SPHERE:
        return <sphereGeometry args={[1, 32, 32]} />;
      case SHAPE_TYPES.CYLINDER:
        return <cylinderGeometry args={[1, 1, 1, 32]} />;
      case SHAPE_TYPES.CONE:
        return <coneGeometry args={[1, 1, 32]} />;
      case SHAPE_TYPES.BOX:
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const handleTextureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTexture(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Canvas style={{ height: '600px', width: '800px' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={meshRef} position={transform.position} rotation={transform.rotation}>
          {renderShape()}
          <meshStandardMaterial color={'orange'} />
        </mesh>
        <Grid
          cellSize={GRID_SIZE}
          args={[10, 10]} // grid dimensions
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
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
        <button onClick={exportAsSTL}>Save as STL</button>
      </div>
      <div>
        <label>
          Select Shape:
          <select
            value={shapeType}
            onChange={(e) => setShapeType(e.target.value)}
          >
            {Object.values(SHAPE_TYPES).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Upload Texture:
          <input type="file" accept="image/*" onChange={handleTextureUpload} />
        </label>
      </div>
      <p>Current Position: {`(${transform.position.join(', ')})`}</p>
      <p>Current Rotation: {`(${transform.rotation.map(r => (r * 180 / Math.PI).toFixed(2)).join(', ')}°)`}</p>
    </div>
  );
};

export default Texture;
