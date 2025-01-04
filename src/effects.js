import * as THREE from 'three';

export class SpaceEffects {
    constructor(scene) {
        this.scene = scene;
        this.starField = this.createStarField();
        this.scene.add(this.starField);
    }

    createStarField() {
        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 10000;
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let i = 0; i < starCount * 3; i += 3) {
            // Random position in a sphere
            const radius = 100 + Math.random() * 900; // Stars between 100 and 1000 units away
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);

            sizes[i / 3] = Math.random() * 2;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starsMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            sizeAttenuation: true,
            size: 0.1
        });

        return new THREE.Points(starsGeometry, starsMaterial);
    }

    update() {
        // Add any dynamic effects updates here
        this.starField.rotation.y += 0.0001;
    }
}