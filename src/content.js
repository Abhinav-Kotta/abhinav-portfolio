export function createContent() {
    // Create and handle planet info overlay
    const planetInfo = document.querySelector('.planet-info');
    const planetNameEl = document.getElementById('planet-name');
    const planetDescEl = document.getElementById('planet-description');

    // Handle navigation clicks to update planet info
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const planetName = e.target.getAttribute('data-planet');
            if (planetName && planetName !== 'overview') {
                updatePlanetInfo(planetName);
                planetInfo.style.display = 'block';
            } else {
                planetInfo.style.display = 'none';
            }
        });
    });

    // Update planet information
    function updatePlanetInfo(planetName) {
        const sections = [
            { name: 'Sun', description: 'Introduction & Home - Welcome to my portfolio! Here you\'ll find an overview of my work and experience.' },
            { name: 'Mercury', description: 'Skills & Technologies - Exploring my technical expertise and toolset.' },
            { name: 'Venus', description: 'Work Experience - Journey through my professional career and accomplishments.' },
            { name: 'Earth', description: 'Featured Projects - Discover the key projects that showcase my abilities.' },
            { name: 'Mars', description: 'Open Source Contributions - Exploring my contributions to the developer community.' },
            { name: 'Jupiter', description: 'Major Achievements - Highlighting significant milestones in my career.' },
            { name: 'Saturn', description: 'Education & Certifications - My academic journey and professional certifications.' },
            { name: 'Uranus', description: 'Publications & Talks - Sharing knowledge through writing and speaking.' },
            { name: 'Neptune', description: 'Future Goals - Where I\'m headed and what I aim to achieve.' },
            { name: 'Pluto', description: 'Contact - Get in touch and connect with me.' }
        ];

        const planetData = sections.find(section => section.name === planetName);
        if (planetData) {
            planetNameEl.textContent = planetData.name;
            planetDescEl.textContent = planetData.description;
        }
    }

    // Handle loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        });
    }

    // Handle start journey button
    const startButton = document.getElementById('start-journey');
    if (startButton) {
        startButton.addEventListener('click', () => {
            updatePlanetInfo('Sun');
            planetInfo.style.display = 'block';
        });
    }
}