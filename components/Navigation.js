export class Navigation extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                nav {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(10px);
                    z-index: 1000;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                nav h3 {
                    color: white;
                    margin: 0;
                }
                .nav-links a {
                    color: white;
                    text-decoration: none;
                    margin-left: 1.5rem;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                .nav-links a:hover {
                    opacity: 1;
                }
            </style>
            <nav>
                <h3>Space Journey</h3>
                <div class="nav-links">
                    <a href="#overview" data-planet="overview">Overview</a>
                    <a href="#sun" data-planet="Sun">Sun</a>
                    <a href="#mercury" data-planet="Mercury">Mercury</a>
                    <a href="#venus" data-planet="Venus">Venus</a>
                    <a href="#earth" data-planet="Earth">Earth</a>
                    <a href="#mars" data-planet="Mars">Mars</a>
                    <a href="#jupiter" data-planet="Jupiter">Jupiter</a>
                    <a href="#saturn" data-planet="Saturn">Saturn</a>
                    <a href="#uranus" data-planet="Uranus">Uranus</a>
                    <a href="#neptune" data-planet="Neptune">Neptune</a>
                    <a href="#pluto" data-planet="Pluto">Pluto</a>
                </div>
            </nav>
        `;
    }
}

customElements.define('space-navigation', Navigation);