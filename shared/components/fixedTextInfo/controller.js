class FixedTextInfoController {
    constructor({ view }) {
        this.#view = view;
    }

    #view;

    show({ text }) {
        this.#view.show({ text });
    }

    hide() {
        this.#view.hide();
    }
}