class SearchInitializer {
    constructor(searchService, actionBlockService, hashService, textManager, keyCodeByKeyName) {
        this.#view = new SearchView();
        this.#controller = new SearchController(searchService, actionBlockService, hashService, textManager, keyCodeByKeyName);

        return this.#controller;
    }

    #controller;
    #view;
}