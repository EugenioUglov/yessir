class PageElementView {
    constructor() {

    }

    #displayedElements = [];

    showElement(element) {
        element.show();
        this.#displayedElements.push(element);
    }

    hideShowedElements() {
        // console.log('hide elements', this.#showed_elements);
        this.#displayedElements.forEach(element => element.hide());
        this.#displayedElements = [];
    }
}