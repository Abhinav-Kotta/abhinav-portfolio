export class PlanetInfo extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .planet-info {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.95);
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 300px;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transform: translateY(0);
                    transition: transform 0.3s ease;
                    display: none;
                }
            </style>
            <div class="planet-info">
                <h3 id="planet-name"></h3>
                <p id="planet-description"></p>
            </div>
        `;
    }
}

customElements.define('planet-info', PlanetInfo);