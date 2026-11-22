class DomElementsVisibility {
    #showedElements = new Set();
    #instance = null;

    constructor() {
        if (this.#instance) return this.#instance;
        this.#instance = this;
    }

    showElement(target) {
        const elements = this.#resolveElements(target);
        elements.forEach(el => {
            el.style.display = '';
        });
        this.#showedElements.add(target);
    }

    hideElement(target) {
        const elements = this.#resolveElements(target);
        elements.forEach(el => {
            el.style.display = 'none';
        });
        this.#showedElements.delete(target);
    }

    hideShowedElements() {
        for (const target of this.#showedElements) {
            const elements = this.#resolveElements(target);
            elements.forEach(el => {
                el.style.display = 'none';
            });
        }
        this.#showedElements.clear();
    }

    
    #resolveElements(target) {
        if (typeof target === 'string') {
            return document.querySelectorAll(target);
        }
        if (target instanceof Element) {
            return [target];
        }
        if (target instanceof NodeList || Array.isArray(target)) {
            return target;
        }
        return [];
    }
}