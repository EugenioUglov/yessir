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

    bindClickBtnEnterRequest(handler) {
        const that = this;
        
        this.#domContainer.querySelector('#btnSearch').addEventListener('click', () => { 
            that.setTextColorInInputField('black'); 
            handler();
        });
    }
    
    bindClickBtnClearRequestField(handler) {
        const container = this.#domContainer;

        container.querySelector('#btnClear').addEventListener('click', () => {
            handler();
            container.querySelector("#searchInputField").focus();
        });
    }

    bindKeyUpRequestField(handler) {
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


    #setEventListeners() {
        const container = this.#domContainer;
        const inputField = container.querySelector('#searchInputField');
        const autocomplete = container.querySelector('#searchWrapper');
        const rbSearchByRequest = container.querySelector("#rb_search_by_request");

        inputField.addEventListener('input', function(e) {
            inputField.style.color = 'gray';
        });

        if (rbSearchByRequest) {
            rbSearchByRequest.addEventListener("click", function() {
                autocomplete.style.display = 'block';
            });
        }
        
        inputField.onfocus = () => {
            autocomplete.style.boxShadow = "0px 0px 5px 1px #4285f4"; 
            autocomplete.style.webkitBoxShadow = "0px 0px 5px 2px #4285f4";
            autocomplete.style.mozBoxShadow = "0px 0px 5px 2px #4285f4";
        };
        
        inputField.addEventListener('focusout', function() {
            autocomplete.style.boxShadow = null;
            autocomplete.style.webkitBoxShadow = null;
            autocomplete.style.mozBoxShadow = null;
        });

        container.querySelector("#btnSearch").addEventListener('click', function() {
            inputField.focus();
        });
        

        // IF mouse over input field THEN set show tooltip with text taking from input field.
        inputField.addEventListener('mouseenter', function(event) {
            this.setAttribute('title', inputField.value);
        });
    }

    focus() {
        const input = this.#domContainer.querySelector('#searchInputField');
        input.focus();            
        input.select();
        input.selectionStart = input.value.length;
    }
}