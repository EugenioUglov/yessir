class EditActionBlockDataHolder {
    constructor(hashService) {
        // createActionBlock: 'createactionblock',
        // createNote: 'createnote',
        // createLink: 'createlink',
        if (hashService.getNormalizedCurrentHash().includes(hashService.getPageNameEnum().editActionBlock) ||
        hashService.getNormalizedCurrentHash().includes(hashService.getPageNameEnum().createActionBlock) ||
        hashService.getNormalizedCurrentHash().includes(hashService.getPageNameEnum().createNote) ||
        hashService.getNormalizedCurrentHash().includes(hashService.getPageNameEnum().createlink) ) {
            this.#restoreLastSavedInputValues();
            this.#setInputDataHandler();
        }
        else {
            localStorage.removeItem("lastSavedInputData");
        }
    }
    
    #saveInputValues() {
        const inputValues = [];
        const selectValues = [];
        const textareaValues = [];

        const lastSavedInputData = {};

        const inputs = document.getElementsByTagName('input');
        const selects = document.getElementsByTagName('select');
        const textareas = document.getElementsByTagName('textarea');
        

        for (let index = 0; index < inputs.length; ++index) {
            inputValues[index] = inputs[index].value;
        }

        for (let index = 0; index < selects.length; ++index) {
            selectValues[index] = selects[index].value;
        }

        for (let index = 0; index < textareas.length; ++index) {
            textareaValues[index] = textareas[index].value;
        }

        // console.log(inputValues, selectValues, textareaValues);

        lastSavedInputData['inputValues'] = inputValues;
        lastSavedInputData['selectValues'] = selectValues;
        lastSavedInputData['textareaValues'] = textareaValues;

        console.log(inputValues);

        localStorage.setItem('lastSavedInputData', JSON.stringify(lastSavedInputData));


        // !!!
        let debug = '';
        debug += 'SAVE';
        let i = 0;
        textareaValues.forEach(textareaValue => {
           debug += i + ': ' + textareaValue + '\n';
           i++;
        });

        $('#debugOutput').text(debug);
    }

    #restoreLastSavedInputValues() {
        if (localStorage['lastSavedInputData'] === undefined) {
            return false;
        }

        const lastSavedInputData = JSON.parse(localStorage['lastSavedInputData']);
        
        const inputs = document.getElementsByTagName('input');
        const selects = document.getElementsByTagName('select');
        const textareas = document.getElementsByTagName('textarea');
        

        for (let index = 0; index < inputs.length; ++index) {
            if (inputs[index].value === undefined) continue;

            inputs[index].value = lastSavedInputData['inputValues'][index];
        }

        for (let index = 0; index < selects.length; ++index) {
            if (selects[index].value === undefined) continue;

            selects[index].value = lastSavedInputData['selectValues'][index];
        }

        for (let index = 0; index < textareas.length; ++index) {
            if (textareas[index].value === undefined) continue;

            textareas[index].value = lastSavedInputData['textareaValues'][index];
        }


        // !!!
        let debug = '';
        debug += 'RESTORE\n';
        let i = 0;
        for (let index = 0; index < textareas.length; index++) {
            const element = textareas[index];
            debug += index + ': ' + element.value  + '\n';
        }
        

        $('#debugOutput').text(debug);
    }

    #setInputDataHandler() {
        const inputs = document.getElementsByTagName('input');
        const selects = document.getElementsByTagName('select');
        const textareas = document.getElementsByTagName('textarea');
    
        for (let index = 0; index < inputs.length; ++index) {
            inputs[index].addEventListener('input', ()=>{
                this.#saveInputValues();
            });
        }
    
        for (let index = 0; index < selects.length; ++index) {
            selects[index].addEventListener('input', ()=>{
                this.#saveInputValues();
            });
        }
    
        for (let index = 0; index < textareas.length; ++index) {
            textareas[index].addEventListener('input', ()=>{
                this.#saveInputValues();
            });
        }
    }
}