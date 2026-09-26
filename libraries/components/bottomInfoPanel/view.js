class BottomInfoPanelView {
    constructor({ domContainer }) {
        this.#domContainer = domContainer;

        // On click Close btn.
        this.#domContainer.querySelector(".close-btn").addEventListener('click', () => {
            this.hidePanel();
        });
    }

    #domContainer;

    showPanel({ message, duration = 3000 }) {
        const panel = this.#domContainer.querySelector('#info-panel');
        const messageElement = this.#domContainer.querySelector('#info-message');
        
        messageElement.innerText = message;
        panel.classList.add('show');

        // Hide on duration passed.
        setTimeout(() => {
            this.hidePanel();
        }, duration);
    }

    hidePanel() {
        this.#domContainer.querySelector('#info-panel').classList.remove('show');
    }

    bindPanelClosed({ handler }) {
        const panel = document.querySelector('.info-panel');

        panel.addEventListener('transitionend', (event) => {
        // Check that transform animation is completed and no class 'show'.
            if (event.propertyName === 'transform' && !panel.classList.contains('show')) {
                if (handler) handler();
            }
        });
    }
}