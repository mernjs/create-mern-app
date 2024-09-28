"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Layout from "@/components/Layout";

export default function Home() {
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]); // Array to store multiple lines
  const [measurements, setMeasurements] = useState([]); // Array to store measurements
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    camera.position.z = 500;

    const drawGrid = () => {
      // Grid drawing logic
      const size = 1000;
      const step = 50;
      const gridHelper = new THREE.GridHelper(size, size / step);
      scene.add(gridHelper);
    };

    const drawLines = () => {
      lines.forEach(({ start, end }) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(start.x, start.y, 0),
          new THREE.Vector3(end.x, end.y, 0),
        ]);
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      });
    };

    drawGrid();
    drawLines();

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);

      setIsDrawing(true);
      setStartPoint({ x: vector.x * 500, y: vector.y * 500 });
    };

    const handleMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
        const endPoint = { x: currentPoint.x, y: currentPoint.y };
        setLines([...lines, { start: startPoint, end: endPoint }]);
        setMeasurements([...measurements, { start: startPoint, end: endPoint }]);

        // Clear scene and redraw lines
        while (scene.children.length) {
          scene.remove(scene.children[0]);
        }
        drawGrid();
        drawLines();
      }
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);

      setCurrentPoint({ x: vector.x * 500, y: vector.y * 500 });

      // Clear scene and redraw everything
      while (scene.children.length) {
        scene.remove(scene.children[0]);
      }
      drawGrid();
      drawLines();

      // Draw current line
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(startPoint.x, startPoint.y, 0),
        new THREE.Vector3(currentPoint.x, currentPoint.y, 0),
      ]);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDrawing, startPoint, currentPoint, lines, measurements]);

  return (
    <Layout>
      <canvas ref={canvasRef} width={1140} height={700} />
    </Layout>
  );
}
