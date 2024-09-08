import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {

    const mountRef = useRef(null);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [voices, setVoices] = useState([]);

    const questions = [
        "What is your name?",
        "What is your gender, male or female?",
        "What is your age?",
        "What is your country name?",
        "What is your state name?",
        "What is your city name?"
    ];

    let recognition;

    const loadVoices = () => {
        const allVoices = window.speechSynthesis.getVoices();
        setVoices(allVoices);
    };


    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }
        camera.position.set(0, 5, 10);
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        const loader = new GLTFLoader();
        loader.load('/assets/Cute_Demon.glb', (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            model.position.set(0, 0, 0);
            animate();
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
        if (currentQuestionIndex < questions.length) {
            askQuestion();
        } else {
            console.log('All questions answered:', answers);
        }
    }, [currentQuestionIndex]);

    const saveAnswer = () => {
        if ('webkitSpeechRecognition' in window) {
            const speechRecognition = new webkitSpeechRecognition();
            speechRecognition.lang = 'en-US';
            speechRecognition.continuous = false;
            speechRecognition.interimResults = false;
           
            speechRecognition.onresult = (event) => {
                const lastResult = event.results[event.results.length - 1];
                const command = lastResult[0].transcript.trim().toLowerCase();
                console.log("Test Command recognized:", command);
                handleAnswer(command);
            };

            speechRecognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            speechRecognition.onend = () => {
                console.log('Test Speech recognition ended.');
                if (currentQuestionIndex < questions.length - 1) {
                    setTimeout(() => {
                        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                    }, 1000)
                } else {
                    console.log('All questions answered:', answers);
                }
            };
            speechRecognition.start();
        } else {
            alert('Speech recognition not supported in this browser.');
        }
    };

    const askQuestion = () => {
        if ('speechSynthesis' in window) {
            const question = questions[currentQuestionIndex];
            const utterance = new SpeechSynthesisUtterance(question);
            utterance.lang = 'en-US';
            const femaleVoice = voices.find((voice) => voice.name === 'Google UK English Female');
            if (femaleVoice) {
                utterance.voice = femaleVoice;
            } else {
                console.warn('Female voice not found. Using the default voice.');
            }
            utterance.onstart = () => {
                console.log('Asking question:', question);
                saveAnswer()
            };
            utterance.onend = () => {
                console.log('Question asked:', question);
                if (recognition && recognition.start) {
                    recognition.start();
                }
            };
            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event.error);
            };
            window.speechSynthesis.speak(utterance);
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
        console.log(`Answer for question "${questions[currentQuestionIndex]}": ${command}`);
        if (recognition) {
            recognition.stop();
        }
    };

    return (
        <div>
            <div ref={mountRef} />
            <button onClick={askQuestion}>Ask Question</button>
        </div>
    );
};

export default ThreeScene;
