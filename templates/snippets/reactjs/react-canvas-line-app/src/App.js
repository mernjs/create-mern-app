import React from 'react';
import GridView from './components/GridView';
import ThreeDViewSTL from './components/export/ThreeDViewSTL';
import MultipleShapes from './components/MultipleShapes';
import Texture from './components/Texture';
import Shaders from './components/Shaders';
import Lighting from './components/Lighting';
import Wireframe from './components/Wireframe';
import CameraControle from './components/CameraControle';
import Camera from './components/Camera';
import ExportCamera from './components/camera/ExportCamera';

function App() {
  return (
      <ExportCamera />
  );
}

export default App;
