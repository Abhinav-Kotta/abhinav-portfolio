import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class CameraController {
    constructor(camera, domElement, solarSystem) {
        this.camera = camera;
        this.domElement = domElement;
        this.solarSystem = solarSystem;
        this.currentTarget = new THREE.Vector3();
        this.isTransitioning = false;
        
        // Initialize OrbitControls with stricter constraints
        this.controls = new OrbitControls(this.camera, this.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 200;
        this.controls.maxDistance = 1200;
        this.controls.maxPolarAngle = Math.PI / 1.8;    // Restrict upward movement
        this.controls.minPolarAngle = Math.PI / 2.2;    // Restrict downward movement
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.enableRotate = true;
        this.controls.autoRotate = false;
        this.controls.maxAzimuthAngle = Math.PI / 4;    // Limit horizontal rotation
        this.controls.minAzimuthAngle = -Math.PI / 4;   // Limit horizontal rotation
        
        this.setupOverview();
        this.initEventListeners();
    }

    setupOverview() {
        const targetY = -100;  // Consistent target Y position
        this.camera.position.set(350, 100, 900);
        this.camera.lookAt(350, targetY, 0);
        this.currentTarget.set(350, targetY, 0);
        if (this.controls) {
            this.controls.target.copy(this.currentTarget);
            this.controls.update();
        }
    }

    initEventListeners() {
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const planetName = e.target.getAttribute('data-planet');
                if (planetName === 'overview') {
                    this.transitionToOverview();
                } else if (planetName) {
                    this.transitionToPlanet(planetName);
                }
            });
        });

        const startButton = document.getElementById('start-journey');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.transitionToPlanet('Sun');
            });
        }
    }

    async transitionToPlanet(planetName) {
        if (this.isTransitioning) return;

        const planetObj = this.solarSystem.planets.get(planetName);
        if (!planetObj) return;

        this.isTransitioning = true;
        this.controls.enabled = false;

        const planetPos = planetObj.mesh.position;
        const targetPos = new THREE.Vector3(
            planetPos.x - 40,
            planetPos.y + 20,
            planetPos.z + 60
        );

        await this.smoothTransition(targetPos, planetPos);
        
        this.controls.target.copy(planetPos);
        this.controls.enabled = true;
        this.isTransitioning = false;
    }

    async transitionToOverview() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.controls.enabled = false;
    
        const targetY = -100;  // Use same target Y as setupOverview
        await this.smoothTransition(
            new THREE.Vector3(350, 100, 900),
            new THREE.Vector3(350, targetY, 0)
        );
    
        this.controls.target.set(350, targetY, 0);
        this.controls.enabled = true;
        this.isTransitioning = false;
    }

    async smoothTransition(targetPos, lookAtPos, duration = 2000) {
        const startPos = this.camera.position.clone();
        const startLookAt = this.currentTarget.clone();
        const startTime = Date.now();

        return new Promise((resolve) => {
            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = this.easeInOutCubic(progress);

                this.camera.position.lerpVectors(startPos, targetPos, eased);
                this.currentTarget.lerpVectors(startLookAt, lookAtPos, eased);
                this.camera.lookAt(this.currentTarget);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            animate();
        });
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}