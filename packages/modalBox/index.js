class ModalBoxInitializer {
    constructor() {
        this.#view = new ModalBoxView();
        this.#controller = new ModalBoxController({ view: this.#view });

        return this.#controller;    
    }

    #controller;
    #view;
}