class LoginView {
    constructor({ domContainer }) {
        this.#domContainer = domContainer;
    }

    #domContainer;

    bindClickBtnSubmit({ handler }) {
        this.#domContainer.querySelector(".login-panel").addEventListener("submit", (e) => { 
            e.preventDefault();
            const login = this.#domContainer.querySelector('.input-username').value;
            const password = this.#domContainer.querySelector('.input-password').value;

            handler(login, password); 
        });
    }

    bindClickBtnClose({ handler }) {
        this.#domContainer.querySelector(".close-icon").onclick = () => {
            this.hide();
            handler();
        }
    }

    show() {
        this.#domContainer.querySelector('.login-panel').style.display = 'block';
    }

    hide() {
        this.#domContainer.querySelector('.login-panel').style.display = 'none';
    }
}