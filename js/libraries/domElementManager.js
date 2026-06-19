class DOMElementManager {
    #showedElements = [];

    constructor() {

    }

    showElement(elementCssSelector) {
        $(elementCssSelector).show();
        this.#showedElements.push(elementCssSelector);
    }

    hideElement(elementCssSelector) {
        const index = this.#showedElements.indexOf(elementCssSelector);
        
        if (index !== -1) {
            this.#showedElements.splice(index, 1);
        }

        $(elementCssSelector).hide();
    }

    hideShowedElements() {
        for (const elementCssSelector of this.#showedElements) {
            $(elementCssSelector).hide();
        }
    }
}