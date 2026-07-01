class BlackLoaderController {
    constructor({ view }) {
        this.#view = view;
    }

    #view

    startLoading() {
        this.#view.startLoading();
    }

    stopLoading() {
        this.#view.stopLoading();
    }
}