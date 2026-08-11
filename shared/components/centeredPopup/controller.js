class CenteredPopupController {
    constructor({ view }) {
        this.#view = view;
    }
    
    #view;

    show({ title, content, buttons }) {
        this.#view.show({ title, content, buttons });
    }
}