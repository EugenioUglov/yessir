class LogsInitializer {
    constructor(fileManager, dateManager) {
        this.#view = new LogsView();
        this.#controller = new LogsController({ view: this.#view, fileManager: fileManager, dateManager: dateManager });

        return this.#controller;
    }

    #controller;
    #view;
}