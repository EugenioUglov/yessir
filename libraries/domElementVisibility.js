class DomElementVisibility {
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

// class DomElementVisibility {
//     #displayedElements = [];

//     showElement(element) {
//         element.show();
//         this.#displayedElements.push(element);
//     }

//     hideShowedElements() {
//         // console.log('hide elements', this.#showed_elements);
//         this.#displayedElements.forEach(element => element.hide());
//         this.#displayedElements = [];
//     }
// }