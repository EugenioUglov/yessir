class ModalBoxController {
    constructor({ view }) {
        this.#view = view;
    }

    #view;

    show(setting = {bodyText: '', headerText: '', footerText: '', isPossibleClose: true}) {
        this.#view.show(setting);
    }

    hide() {
        this.#view.hide();
    }
}