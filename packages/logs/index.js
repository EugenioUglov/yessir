class LogsManager {
    constructor(fileManager, dateManager) {
        const model = new LogsModel(dateManager);
        this.#view = new LogsView();
        this.#controller = new LogsController({ model: model, view: this.#view, fileManager: fileManager, dateManager: dateManager });

        return this.#controller;
    }

    #controller;
    #view;
}