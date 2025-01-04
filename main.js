import * as THREE from 'three';
import { SolarSystem } from './src/planets';
import { SpaceEffects } from './src/effects';
import { CameraController } from './src/camera';
import { createContent } from './src/content';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Initialize systems
const solarSystem = new SolarSystem(scene);
const spaceEffects = new SpaceEffects(scene);
const cameraController = new CameraController(camera, document.body, solarSystem);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffffff, 5, 2500);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Set initial camera position
camera.position.set(350, 0, 900);
camera.lookAt(350, 100, 0);

// Animation
function animate() {
    requestAnimationFrame(animate);
    solarSystem.update();
    spaceEffects.update();
    renderer.render(scene, camera);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize content
createContent();