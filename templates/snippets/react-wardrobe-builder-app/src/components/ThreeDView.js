import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';  // Import OrbitControls

function ThreeDView({ shapes = [], textures = {} }) {  // textures prop to hold texture URLs
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 500 / 600, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(500, 600);
        mountRef.current.appendChild(renderer.domElement);

        // Add OrbitControls for camera movement
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;  // Smooth motion
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;  // Limit vertical rotation

        // Texture loader to load textures
        const textureLoader = new THREE.TextureLoader();

        // Store references to the meshes for rotation and scaling
        const meshes = [];

        // Convert 2D shapes to 3D objects
        shapes.forEach(shape => {
            let geometry;
            let material;

            if (shape.type === 'Rectangle') {
                geometry = new THREE.BoxGeometry(shape.width / 100, shape.height / 100, 1);

                // Load textures (apply the provided texture URL, if available, or use colors)
                const frontTexture = textures.front ? textureLoader.load(textures.front) : null;
                const backTexture = textures.back ? textureLoader.load(textures.back) : null;
                const leftTexture = textures.left ? textureLoader.load(textures.left) : null;
                const rightTexture = textures.right ? textureLoader.load(textures.right) : null;

                // Create materials for each face (use texture or fallback to colors)
                const materials = [
                    frontTexture ? new THREE.MeshBasicMaterial({ map: frontTexture }) : new THREE.MeshBasicMaterial({ color: 0xff0000 }),  // Front (Red or texture)
                    backTexture ? new THREE.MeshBasicMaterial({ map: backTexture }) : new THREE.MeshBasicMaterial({ color: 0x00ff00 }),   // Back (Green or texture)
                    new THREE.MeshBasicMaterial({ color: 0x0000ff }),  // Top (Blue)
                    new THREE.MeshBasicMaterial({ color: 0xffff00 }),  // Bottom (Yellow)
                    leftTexture ? new THREE.MeshBasicMaterial({ map: leftTexture }) : new THREE.MeshBasicMaterial({ color: 0x00ffff }),   // Left (Cyan or texture)
                    rightTexture ? new THREE.MeshBasicMaterial({ map: rightTexture }) : new THREE.MeshBasicMaterial({ color: 0xff00ff }),  // Right (Magenta or texture)
                ];

                material = materials;
            } else if (shape.type === 'Circle') {
                geometry = new THREE.CylinderGeometry(shape.radius / 100, shape.radius / 100, 1, 32);
                const circleTexture = textures.circle ? textureLoader.load(textures.circle) : null;
                material = circleTexture ? new THREE.MeshBasicMaterial({ map: circleTexture }) : new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            } else if (shape.type === 'Line') {
                geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(shape.startX / 100, shape.startY / 100, 0),
                    new THREE.Vector3(shape.endX / 100, shape.endY / 100, 0),
                ]);
                const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x0000ff }));
                scene.add(line);
                return;
            }

            const mesh = new THREE.Mesh(geometry, material);  // Use texture materials
            mesh.position.set(shape.x / 100, shape.y / 100, 0);
            scene.add(mesh);

            meshes.push(mesh);  // Add the mesh to the list for rotation and scaling
        });

        camera.position.z = 5;

        // Animate function to rotate, scale objects, and render the scene
        const animate = function () {
            requestAnimationFrame(animate);

            // Rotate and scale each mesh
            meshes.forEach(mesh => {
                mesh.rotation.x += 0.01;  // Rotate around the X axis
                mesh.rotation.y += 0.01;  // Rotate around the Y axis

                // Scale the object
                const scaleFactor = Math.sin(Date.now() * 0.001) * 0.5 + 1;  // Scaling factor oscillates between 0.5 and 1.5
                mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);  // Apply scaling to all axes
            });

            controls.update();  // Update controls on each frame
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup on component unmount
        return () => {
            controls.dispose();  // Remove controls
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [shapes, textures]);  // Re-render if shapes or textures change

    return (
        <div className="border border-gray-500">
            <div ref={mountRef}></div>
        </div>
    );
}

export default ThreeDView;
