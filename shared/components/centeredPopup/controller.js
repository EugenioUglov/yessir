class CenteredPopupController {
    constructor({ view }) {
        this.#view = view;
    }
    
    #view;

    show({ title, content }) {
        this.#view.show({ title, content });
    }
}