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

    getUsername() {
        return this.#view.getUsernameInputValue();
    }

    getPassword() {
        return this.#view.getPasswordInputValue();
    }

    bindClickBtnSubmit({ handler }) {
        this.#view.bindClickBtnSubmit({ handler: handler })
    };

    bindClickBtnClose({ handler }) {
        this.#view.bindClickBtnClose({ handler: handler })
    }
}