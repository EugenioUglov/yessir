class SearchView {
    constructor({ domContainer }) {
        this.#domContainer = domContainer;

        // Set text gray in input field.
        this.#domContainer.querySelector('#searchInputField').style.color = 'gray';
        
        this.#setEventListeners();
    }

    #domContainer;

    getText() {
        const userPhrase = this.#domContainer.querySelector('#searchInputField').value;
        return userPhrase;
    }

    setText(text) {
        this.#domContainer.querySelector('#searchInputField').value = text;
    }

    getRequest() {
        return this.#domContainer.querySelector('#searchInputField').value;
    }

    setTextColorInInputField(newColor) {
        this.#domContainer.querySelector('#searchInputField').style.color = newColor;
    }

    clear() {
        this.#domContainer.querySelector('#searchInputField').value = '';
    }

    focus() {
        const input = this.#domContainer.querySelector('#searchInputField');
        input.focus();            
        input.select();
        input.selectionStart = input.value.length;
    }

    bindEnter(handler) {
        const container = this.#domContainer;
        const inputField = container.querySelector('#searchInputField');

        container.querySelector('#btnSearch').addEventListener('click', () => { 
            this.#handleEnter(handler);
        });

        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { // e.code === 'Enter' / e.keyCode === 13
                this.#handleEnter(handler);
            }
        });
    }
    
    bindClickBtnClear(handler) {
        const container = this.#domContainer;

        container.querySelector('#btnClear').addEventListener('click', () => {
            this.#handleBtnClearClick(handler)
        });
    }

    bindKeyUp(handler) {
        const container = this.#domContainer;

        container.querySelector('#searchInputField').addEventListener('keyup', function(e) {
            const request = container.querySelector('#searchInputField').value;
            handler(request, e.keyCode);
        });
    }

    bindInput(handler) {
        const container = this.#domContainer;

        container.querySelector('#searchInputField').addEventListener('input', function(e) {
            const request = container.querySelector('#searchInputField').value;
            handler(request, e.keyCode);
        });
    }

    #handleEnter(handler) {
        this.setTextColorInInputField('black'); 
        handler();
    }
    
    #handleBtnClearClick(handler) {
        const container = this.#domContainer;

        this.clear();
        handler();
        container.querySelector("#searchInputField").focus();
    }

    #setEventListeners() {
        const container = this.#domContainer;
        const inputField = container.querySelector('#searchInputField');
        const searchWrapper = container.querySelector('#searchWrapper');

        inputField.addEventListener('input', function(e) {
            inputField.style.color = 'gray';
        });
        
        inputField.onfocus = () => {
            searchWrapper.style.boxShadow = "0px 0px 5px 1px #4285f4"; 
            searchWrapper.style.webkitBoxShadow = "0px 0px 5px 2px #4285f4";
            searchWrapper.style.mozBoxShadow = "0px 0px 5px 2px #4285f4";
        };
        
        inputField.addEventListener('focusout', function() {
            searchWrapper.style.boxShadow = null;
            searchWrapper.style.webkitBoxShadow = null;
            searchWrapper.style.mozBoxShadow = null;
        });

        container.querySelector("#btnSearch").addEventListener('click', function() {
            inputField.focus();
        });
        

        // IF mouse over input field THEN set show tooltip with text taking from input field.
        inputField.addEventListener('mouseenter', function(event) {
            this.setAttribute('title', inputField.value);
        });
    }
}