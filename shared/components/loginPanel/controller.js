class LoginController {
    constructor({ view: view }) {
        this.#view = view;
    }
    
    #view;

    show() {
        this.#view.show();
    }

    hide() {
        this.#view.hide();
    }

    bindClickBtnSubmit({ handler }) {
        this.#view.bindClickBtnSubmit({ handler: handler })
    };

    bindClickBtnClose({ handler }) {
        this.#view.bindClickBtnClose({ handler: handler })
    }
}