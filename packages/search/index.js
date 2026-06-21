class SearchInitializer {
    constructor(textManager, keyCodeByKeyName) {
        this.#view = new SearchView();
        this.#controller = new SearchController(textManager, keyCodeByKeyName);

        return this.#controller;
    }

    #controller;
    #view;
}