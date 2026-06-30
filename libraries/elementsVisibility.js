/**
 * Jqery mandatory. 
 * 
 */

class ElementsVisibility {
    constructor() {

    }

    #showedBlocks = [];

    showBlock(blockToShow) {
        blockToShow.show();
        this.#showedBlocks.push(blockToShow);
    }

    hideShowedBlocks() {
        if (this.#showedBlocks.length > 0) {
            this.#showedBlocks.hide();
        }
    }
}