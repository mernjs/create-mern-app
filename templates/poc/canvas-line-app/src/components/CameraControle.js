import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';

const CameraControle = () => {
  const [lightType, setLightType] = useState('ambient');
  const [isWireframe, setIsWireframe] = useState(false);
  const [shapeType, setShapeType] = useState('Box');
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);

  const shaderMaterial = useRef(
    new THREE.MeshStandardMaterial({
      color: 'orange',
      wireframe: isWireframe,
    })
  ).current;

  useEffect(() => {
    shaderMaterial.wireframe = isWireframe;
  }, [isWireframe]);

  const renderLighting = () => {
    switch (lightType) {
      case 'ambient':
        return <ambientLight intensity={0.5} />;
      case 'directional':
        return <directionalLight position={[10, 10, 5]} intensity={1} />;
      case 'point':
        return <pointLight position={[10, 10, 10]} intensity={1} />;
      case 'spot':
        return <spotLight position={[10, 10, 10]} angle={Math.PI / 6} intensity={1} />;
      case 'hemisphere':
        return <hemisphereLight skyColor={0x87ceeb} groundColor={0x2e8b57} intensity={1} />;
      default:
        return <ambientLight intensity={0.5} />;
    }
  };

  const renderShape = () => {
    switch (shapeType) {
      case 'Sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'Cylinder':
        return <cylinderGeometry args={[1, 1, 1, 32]} />;
      case 'Cone':
        return <coneGeometry args={[1, 1, 32]} />;
      case 'Box':
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <div>
      <Canvas
        style={{ height: '600px', width: '800px' }}
        camera={{ position: cameraPosition, fov: 75 }}
      >
        <Grid cellSize={1} args={[10, 10]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
        {renderLighting()}
        <mesh>
          {renderShape()}
          <primitive object={shaderMaterial} />
        </mesh>
        <OrbitControls />
      </Canvas>
      <div>
        <label>
          Select Light Type:
          <select value={lightType} onChange={(e) => setLightType(e.target.value)}>
            <option value="ambient">Ambient Light</option>
            <option value="directional">Directional Light</option>
            <option value="point">Point Light</option>
            <option value="spot">Spot Light</option>
            <option value="hemisphere">Hemisphere Light</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Shape:
          <select value={shapeType} onChange={(e) => setShapeType(e.target.value)}>
            <option value="Box">Box</option>
            <option value="Sphere">Sphere</option>
            <option value="Cylinder">Cylinder</option>
            <option value="Cone">Cone</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isWireframe}
            onChange={(e) => setIsWireframe(e.target.checked)}
          />
          Wireframe
        </label>
      </div>
    </div>
  );
};

export default CameraControle;
