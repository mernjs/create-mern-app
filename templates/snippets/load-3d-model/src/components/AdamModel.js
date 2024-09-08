"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import LoadingSpinner from './LoadingSpinner';  // Import the spinner component

const AdamModel = () => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);  // Add loading state
  const controlsRef = useRef(null);  // Create a ref for controls

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 15, 15); // Adjust the camera position to see the whole model

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; // Enable zoom functionality
    controls.zoomSpeed = 1.2;   // Adjust the zoom speed (default is 1.0)
    controls.minDistance = 5;  // Minimum zoom distance
    controls.maxDistance = 50; // Maximum zoom distance
    controlsRef.current = controls;  // Assign controls to ref for access in zoom functions

    // Add a light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // Create a loading manager to handle loading events
    const loadingManager = new THREE.LoadingManager(
      () => {
        // This function will be called when the model is fully loaded
        setLoading(false);
        console.log('Model loaded successfully');
      },
      (url, itemsLoaded, itemsTotal) => {
        // This function will be called while loading progress is made
        console.log(`Loading model: ${itemsLoaded}/${itemsTotal}`);
      },
      (error) => {
        // This function will be called when there is an error
        console.error('An error occurred while loading the model:', error);
        setLoading(false);
      }
    );

    // Load the GLTF model
    const loader = new GLTFLoader(loadingManager);  // Pass the loading manager to the loader
    loader.load('/assets/BallerinaLiteTextured.gltf', (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0, 0); // Center the model
      console.log('Model loaded:', model);
      scene.add(model);
      renderer.render(scene, camera);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Zoom functions
  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.1);  // Zoom in
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.1); // Zoom out
      controlsRef.current.update();
    }
  };

  const buttonStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {loading && <LoadingSpinner />}  {/* Show the loading spinner while loading */}
      <button onClick={handleZoomIn} style={buttonStyle}>Zoom In</button>
      <button onClick={handleZoomOut} style={buttonStyle}>Zoom Out</button>
    </div>
  );
};

export default AdamModel;
