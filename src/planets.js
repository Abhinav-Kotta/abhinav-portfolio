import * as THREE from 'three';

export class SolarSystem {
    constructor(scene) {
        this.scene = scene;
        this.planets = new Map();
        // Keep your existing orbitalData...
        this.orbitalData = {
            Mercury: { 
                orbitalPeriod: 88, 
                rotationPeriod: 58.6,
                orbitalInclination: 7.0 * Math.PI / 180,
                orbitalEccentricity: 0.206
            },
            Venus: { 
                orbitalPeriod: 225, 
                rotationPeriod: -243,
                orbitalInclination: 3.4 * Math.PI / 180,
                orbitalEccentricity: 0.007
            },
            Earth: { 
                orbitalPeriod: 365, 
                rotationPeriod: 1,
                orbitalInclination: 0,
                orbitalEccentricity: 0.017,
                moons: [{
                    name: 'Moon',
                    distance: 2,
                    size: 0.27,
                    orbitalPeriod: 27.3
                }]
            },
            Mars: { 
                orbitalPeriod: 687, 
                rotationPeriod: 1.03,
                orbitalInclination: 1.9 * Math.PI / 180,
                orbitalEccentricity: 0.093,
                moons: [
                    { name: 'Phobos', distance: 1.6, size: 0.1, orbitalPeriod: 0.32 },
                    { name: 'Deimos', distance: 2.1, size: 0.08, orbitalPeriod: 1.26 }
                ]
            },
            Jupiter: { 
                orbitalPeriod: 4333, 
                rotationPeriod: 0.41,
                orbitalInclination: 1.3 * Math.PI / 180,
                orbitalEccentricity: 0.049,
                moons: [
                    { name: 'Io', distance: 2.5, size: 0.15, orbitalPeriod: 1.77 },
                    { name: 'Europa', distance: 3, size: 0.13, orbitalPeriod: 3.55 },
                    { name: 'Ganymede', distance: 3.5, size: 0.18, orbitalPeriod: 7.15 },
                    { name: 'Callisto', distance: 4, size: 0.16, orbitalPeriod: 16.69 }
                ]
            },
            Saturn: { 
                orbitalPeriod: 10759, 
                rotationPeriod: 0.45,
                orbitalInclination: 2.5 * Math.PI / 180,
                orbitalEccentricity: 0.052,
                rings: true
            },
            Uranus: { 
                orbitalPeriod: 30687, 
                rotationPeriod: -0.72,
                orbitalInclination: 82.2 * Math.PI / 180,
                orbitalEccentricity: 0.047,
                rings: true
            },
            Neptune: { 
                orbitalPeriod: 60190, 
                rotationPeriod: 0.67,
                orbitalInclination: 1.8 * Math.PI / 180,
                orbitalEccentricity: 0.010
            },
            Pluto: { 
                orbitalPeriod: 90560, 
                rotationPeriod: 6.39,
                orbitalInclination: 17.2 * Math.PI / 180,
                orbitalEccentricity: 0.244
            }
        };

        
        this.sections = [
            { name: 'Sun', description: 'Introduction & Home', distance: 0, size: 45 },
            { name: 'Mercury', description: 'Skills & Technologies', distance: 110, size: 15 },
            { name: 'Venus', description: 'Work Experience', distance: 190, size: 22 },
            { name: 'Earth', description: 'Featured Projects', distance: 280, size: 23 },
            { name: 'Mars', description: 'Open Source Contributions', distance: 370, size: 19 },
            { name: 'Jupiter', description: 'Major Achievements', distance: 470, size: 35 },
            { name: 'Saturn', description: 'Education & Certifications', distance: 580, size: 32 },
            { name: 'Uranus', description: 'Publications & Talks', distance: 680, size: 26 },
            { name: 'Neptune', description: 'Future Goals', distance: 780, size: 26 },
            { name: 'Pluto', description: 'Contact', distance: 870, size: 12 }
        ];
        
        this.clock = new THREE.Clock();
        this.initPlanets();
    }

    async createPlanetRings(planet, innerRadius, outerRadius) {
        const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        planet.add(ring);
    }

    async createMoon(moonData, planetPosition) {
        const geometry = new THREE.SphereGeometry(moonData.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        const moon = new THREE.Mesh(geometry, material);
        
        const moonPivot = new THREE.Object3D();
        moonPivot.position.copy(planetPosition);
        moonPivot.add(moon);
        
        moon.position.x = moonData.distance * 3; // Scale up moon distance
        
        this.scene.add(moonPivot);
        return { moon, pivot: moonPivot };
    }

    async initPlanets() {
        const textureLoader = new THREE.TextureLoader();
        const systemOffset = 350; // Center offset
        
        for (const planetData of this.sections) {
            const texturePath = `/textures/${planetData.name.toLowerCase()}.jpg`;
            const texture = await textureLoader.loadAsync(texturePath);
            
            const geometry = new THREE.SphereGeometry(planetData.size, 64, 64);
            const material = new THREE.MeshStandardMaterial({ 
                map: texture,
                roughness: 0.2,
                transparent: false,
                metalness: 0.1,
            });
            
            const planet = new THREE.Mesh(geometry, material);
            const planetPivot = new THREE.Object3D();
            planetPivot.position.x = systemOffset; // Offset the pivot point
            
            planetPivot.add(planet);
            planet.position.x = planetData.distance - systemOffset;
            
            if (planetData.name === 'Saturn') {
                await this.createPlanetRings(planet, planetData.size * 1.2, planetData.size * 2);
            } else if (planetData.name === 'Uranus') {
                await this.createPlanetRings(planet, planetData.size * 1.2, planetData.size * 1.8);
            }
            
            if (this.orbitalData[planetData.name]?.moons) {
                const moons = [];
                for (const moonData of this.orbitalData[planetData.name].moons) {
                    const moonSystem = await this.createMoon(moonData, planet.position);
                    moons.push(moonSystem);
                }
                planet.moons = moons;
            }
            
            this.planets.set(planetData.name, {
                mesh: planet,
                pivot: planetPivot
            });
            this.scene.add(planetPivot);
        }
    }

    update() {
        const time = this.clock.getElapsedTime();
        const timeScale = 0.1;

        for (const [name, planetObj] of this.planets) {
            if (name === 'Sun') continue;

            const planet = planetObj.mesh;
            const pivot = planetObj.pivot;
            const data = this.orbitalData[name];

            if (data) {
                const orbitalSpeed = (2 * Math.PI * timeScale) / data.orbitalPeriod;
                pivot.rotation.y = time * orbitalSpeed;

                const rotationSpeed = (2 * Math.PI * timeScale) / data.rotationPeriod;
                planet.rotation.y = time * rotationSpeed;

                if (planet.moons) {
                    planet.moons.forEach((moonSystem, index) => {
                        const moonData = data.moons[index];
                        const moonSpeed = (2 * Math.PI * timeScale) / moonData.orbitalPeriod;
                        moonSystem.pivot.rotation.y = time * moonSpeed;
                    });
                }
            }
        }
    }

    getPlanetPosition(name) {
        const planetObj = this.planets.get(name);
        return planetObj ? planetObj.mesh.position : null;
    }
}