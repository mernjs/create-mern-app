// components/ThreeScene.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Adjust camera position
    camera.position.set(0, 5, 10); // Increase Y value to lift the camera up

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load('/assets/BallerinaLiteTextured.gltf', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Center the model
      model.position.set(0, 0, 0); // Adjust as necessary

      animate();

      if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const lastResult = event.results[event.results.length - 1];
          const command = lastResult[0].transcript.trim();
          if (command.includes('rotate left')) {
            model.rotation.y -= Math.PI / 4;
          } else if (command.includes('rotate right')) {
            model.rotation.y += Math.PI / 4;
          } else if (command.includes('stop rotation')) {
            model.rotation.y = 0;
          } else if (command.includes('start rotation')) {
            animate();
          }
        };

        recognition.start();
      } else {
        alert('Speech recognition not supported in this browser.');
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
