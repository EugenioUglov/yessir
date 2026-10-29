class SearchController {
    constructor(view, textManager) {
        this.textManager = textManager;

        this.view = view;

        this.#setEventListeners();
        this.#bindViewEvenets();
    }

    clickBtnClearHandler;
    inputFieldEnterHandler;
    changeInputFieldHandler;
    keyUpHandler;

    
    #onEnter = () => {
        this.view.setTextColorInInputField('black');

        if (this.inputFieldEnterHandler) this.inputFieldEnterHandler();
    }

    clear() {
        this.view.clear();
    }

    setText(text) {
        this.view.setText(text)
    }

    getText() {
        this.view.getText();
    }

    focusInputField() {
        this.view.focus();
    }

    #setEventListeners() {
        const that = this;

        $(document).keyup(function(event) {
            if (event.code == 'Slash') {
                that.view.focus();
            }
        });
    }

    #bindViewEvenets() {
        const that = this;

        const onKeyUpRequestField = (request, clickedKeyCode) => {
            that.keyUpHandler(request, clickedKeyCode);
        };

        const onChangeInputRequestField = (request) => {
            that.changeInputFieldHandler(request);
        };

        this.view.bindClickBtnClearRequestField(this.#onClickBtnClear);
        this.view.bindClickBtnEnterRequest(this.#onEnter);
        this.view.bindKeyUpRequestField(onKeyUpRequestField);
        this.view.bindInput(onChangeInputRequestField);

    }

    #onClickBtnClear = () => {
        this.view.clear();
        this.clickBtnClearHandler();
    }
}