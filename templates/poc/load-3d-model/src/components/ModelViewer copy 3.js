import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = [
    "What is your name?",
    "What is your gender, male or female?",
    "What is your age?",
    "What is your country name?",
    "What is your state name?",
    "What is your city name?"
  ];
  let recognition;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    camera.position.set(0, 5, 10); // Increase Y and Z values to move the camera up and back

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
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center); // Center the model

      animate();

      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const lastResult = event.results[event.results.length - 1];
          const command = lastResult[0].transcript.trim().toLowerCase();
          handleAnswer(command);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };
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
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      if (recognition) recognition.stop();
    };
  }, []);

  useEffect(() => {
    // Check for the correct index and ask the question
    if (currentQuestionIndex < questions.length) {
      askQuestion();
    } else {
      console.log('All questions answered:', answers);
    }
  }, [currentQuestionIndex]);

  const askQuestion = () => {
    // Ensure speech synthesis is available
    if ('speechSynthesis' in window) {
      const question = questions[currentQuestionIndex];
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.lang = 'en-US';

      utterance.onstart = () => {
        console.log('Asking question:', question);
      };

      utterance.onend = () => {
        console.log('Question asked:', question);
        // Ensure recognition is started and listening
        if (recognition && recognition.start) {
          recognition.start();
        }
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
      };

      // Ensure that the speech synthesis request is triggered by user interaction
      document.getElementById('startButton').addEventListener('click', () => {
        window.speechSynthesis.speak(utterance);
      });
    } else {
      console.error('Speech Synthesis API not supported in this browser.');
    }
  };

  const handleAnswer = (command) => {
    const questionKey = questions[currentQuestionIndex].toLowerCase().replace(/[^a-z]+/g, ' ').trim().replace(/\s+/g, '_');
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: command
    }));

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      <div ref={mountRef} />
      <button id="startButton">Start Interaction</button>
    </div>
  );
};

export default ThreeScene;
