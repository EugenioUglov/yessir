class ModalBoxController {
    constructor({ view }) {
        this.#view = view;
    }

    #view;

    show(setting = {body_text: '', header_text: '', footer_text: '', is_possible_close: true}) {
        this.#view.show(setting);
    }

    hide() {
        this.#view.hide();
    }
}