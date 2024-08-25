// src/components/ThreeDView.js
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';

const ThreeDView = () => {
  const meshRef = useRef();

  const exportOBJ = () => {
    const exporter = new OBJExporter();
    const result = exporter.parse(meshRef.current);
    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'model.obj';
    link.click();
  };

  return (
    <div>
      <Canvas style={{ height: '600px', width: '800px' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
        <OrbitControls />
      </Canvas>
      <button onClick={exportOBJ}>Export as OBJ</button>
    </div>
  );
};

export default ThreeDView;
