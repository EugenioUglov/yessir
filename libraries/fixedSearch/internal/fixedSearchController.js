class FixedSearchController {
    constructor({ view, textManager }) {
        this.textManager = textManager;

        this.view = view;

        this.#setEventListeners();
    }

    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    setText(text) {
        this.view.setText(text)
    }

    getText() {
        this.view.getText();
    }
    
    clear() {
        this.view.clear();
    }

    bindKeyUp(handler) {
        this.view.bindKeyUp(handler);
    }

    bindInput(handler) {
        this.view.bindInput(handler);
    }

    bindClickBtnClear(handler) {
        this.view.bindClickBtnClear(handler);
    }

    bindEnter(handler) {
        this.view.bindEnter(handler);
    }
    
    #setEventListeners() {
        document.addEventListener('keyup', (event) => {
            if (event.code === 'Slash') {
                this.view.focus();
            }
        });
    }
}