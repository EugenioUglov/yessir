class InputFieldWithSuggestions {
    inputFieldWithSuggestionsElement = document.getElementById('inputFieldWithSuggestions');

    // !!! test
    options = [
        'option1',
        'option2',
        'option3',
        'option4',
        'option1',
        'option2',
        'option3',
        'option4',
    ];
    

    constructor() {
        this.inputFieldWithSuggestionsElement.addEventListener('click', (e) => {
            this.displayOptions(this.options);
        });

        this.inputFieldWithSuggestionsElement.addEventListener('blur', (e) => {
        //    this.removeElements();
        });


        this.inputFieldWithSuggestionsElement.addEventListener('keyup', (e) => {
            this.displayOptions(this.options);
        });
    }

    displayOptions(options) {
        this.removeElements();

        for (let option of options) {
            let listItem = document.createElement('li');
            listItem.classList.add('list-item');
            listItem.style.cursor = 'pointer';
            // listItem.setAttribute('onclick', 'displayOption("' + option + '")');
            // let word = '<b>' + option.substr(0, this.inputFieldWithSuggestionsElement.value.length) + '</b>';
            // word += option.substr(this.inputFieldWithSuggestionsElement.value.length);
            listItem.innerHTML = option;
            document.querySelector('.list').appendChild(listItem);
        }

        const listItems = document.querySelectorAll('.list-item');
        
        for (const listItem of listItems) {
            listItem.addEventListener('click', () => {
                this.inputFieldWithSuggestionsElement.value = listItem.innerHTML;
                this.removeElements();
            });
        }
    }

    displayOption(value) {
        this.inputFieldWithSuggestionsElement.value = value;
        this.removeElements();
    }

    removeElements() {
        let items = document.querySelectorAll('.list-item');

        items.forEach((item) => {
            item.remove();
        });
    }
}

new InputFieldWithSuggestions();