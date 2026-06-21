class LoaderInitializer {
    constructor() {
        this.#view = new LoaderView();
        this.#controller = new LoaderController(this.#view);

        return this.#controller;
    }

    #view;
    #controller;
}