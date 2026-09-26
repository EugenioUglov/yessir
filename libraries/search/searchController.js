class SearchController {
    constructor(view, textManager, keyCodeByKeyName) {
        this.textManager = textManager;
        this.keyCodeByKeyName = keyCodeByKeyName;

        this.view = view;

        this.#setEventListeners();
        this.#bindViewEvenets();
    }

    clickBtnClearHandler;
    inputFieldEnterHandler;
    changeInputFieldHandler;
    keyUpRequestFieldHandler;
    keypressInputFieldPlusTagsHandler;
    keypressInputFieldMinusTagsHandler;
    clickBtnSearchByTagsHandler;

    
    #onEnter = () => {
        this.view.setTextColorInInputField('black');

        if (this.inputFieldEnterHandler) this.inputFieldEnterHandler();
    }

    clearInputField() {
        this.view.clear();
    }

    setTextToInputField(text) {
        this.view.setTextToInputField(text)
    }

    getTextFromMainInputField() {
        this.view.getTextFromMainInputField();
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
            that.keyUpRequestFieldHandler(request, clickedKeyCode);
        };

        const onChangeInputRequestField = (request) => {
            that.changeInputFieldHandler(request);
        };

        function onClickBtnSearchByTags(userPlusTags, userMinusTags) {
            that.clickBtnSearchByTagsHandler(userPlusTags, userMinusTags);
        }

        this.view.bindClickBtnClearRequestField(this.#onClickBtnClear);
        this.view.bindClickBtnEnterRequest(this.#onEnter);
        this.view.bindKeyUpRequestField(onKeyUpRequestField);
        this.view.bindChangeInputRequestField(onChangeInputRequestField);
        this.view.bindKeypressInputFieldPlusTags(this.keypressInputFieldPlusTagsHandler);
        this.view.bindKeypressInputFieldMinusTags(this.keypressInputFieldMinusTagsHandler);
        this.view.bindClickBtnSearchByTags((userPlusTags, userMinusTags) => onClickBtnSearchByTags(userPlusTags, userMinusTags));
    }

    #onClickBtnClear = () => {
        this.view.clear();
        this.clickBtnClearHandler();
    }
}