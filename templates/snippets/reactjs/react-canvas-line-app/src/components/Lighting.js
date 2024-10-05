import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';

const Lighting = () => {
  const [lightType, setLightType] = useState('ambient');

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

  return (
    <div>
      <Canvas style={{ height: '600px', width: '800px' }}>
        <Grid cellSize={1} args={[10, 10]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
        {renderLighting()}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='orange' />
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
    </div>
  );
};

export default Lighting;
