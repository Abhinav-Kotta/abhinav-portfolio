export class LoadingScreen extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .loading-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    z-index: 9999;
                }
                .loading-screen.hidden {
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 1s ease-out;
                }
            </style>
            <div class="loading-screen">
                <p>Loading Solar System...</p>
            </div>
        `;
    }
}

customElements.define('loading-screen', LoadingScreen);