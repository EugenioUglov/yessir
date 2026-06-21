class ScrollInitializer {
    constructor() {
        this.#view = new ScrollView();
        this.#controller = new ScrollController(this.#view);

        return this.#controller;
    }

    #controller; 
    #view;
}