class TopInfoPanelController {
    constructor ({ view }) {
        this.#view = view;
    }

    #view;

    show() {
        this.#view.show();
    }

    hide() {
        this.#view.hide();
    }
}