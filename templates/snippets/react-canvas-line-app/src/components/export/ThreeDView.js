import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

const ThreeDView = () => {
  const meshRef = useRef();

  const exportGLTF = () => {
    const exporter = new GLTFExporter();
    exporter.parse(meshRef.current, (result) => {
      const output = JSON.stringify(result, null, 2);
      const blob = new Blob([output], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'model.gltf';
      link.click();
    });
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
      <button onClick={exportGLTF}>Export as GLTF</button>
    </div>
  );
};

export default ThreeDView;
