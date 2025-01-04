export class Hero extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .hero {
                    position: fixed;
                    top: 25%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: white;
                    z-index: 100;
                    pointer-events: none;
                }
                .hero h1 {
                    font-size: 3.5rem;
                    margin: 0;
                    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    font-weight: 700;
                }
                .hero p {
                    font-size: 1.2rem;
                    margin: 1rem 0 2rem;
                    opacity: 0.9;
                }
                .scroll-button {
                    pointer-events: auto;
                    background: rgba(255, 255, 255, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 2rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .scroll-button:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: translateY(-2px);
                }
                .scroll-arrow {
                    margin-top: 0.5rem;
                    animation: bounce 2s infinite;
                }
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
            </style>
            <div class="hero">
                <h1>Solar System Journey</h1>
                <p>Explore my universe of work through an interactive solar system</p>
                <button id="start-journey" class="scroll-button">
                    Begin Journey
                    <span class="scroll-arrow">↓</span>
                </button>
            </div>
        `;
    }
}

customElements.define('hero-section', Hero);