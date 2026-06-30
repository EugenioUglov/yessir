const commandInputId = 'commandInput';

const someStyle = `
<style>
    .command-input-container {
        z-index: 10000;
    }
    .form-wrapper {
        resize: vertical;
        // outline: 1px solid gainsboro;
        outline: none;
        border: none;
        width: 90%;
        resize: none;
        border-radius: 10px;
        padding: 5px
    }
    .fixed-top-centered-horizontally {
        position: fixed;
        max-width: 500px;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%; /* Adjust width as needed */
        z-index: 1000;
    }
    .textarea-list-wrapper {
        width: 100%;
        height: 50px;
        // background-color: #f5f5f596;
            position: relative;
        display: inline-block;
        outline: 1px solid gainsboro;
        width: 100%;
        resize: none;
        border-radius: 10px;
        padding: 5px;
        background-color: white;
    }

    // .toggle-icon {
    //     position: fixed;
    //     top: 20px;
    //     right: 20px;
    //     cursor: pointer;
    //     /* Size of icon. */
    //     font-size: 15px;
    // }

    .toggle-icon {
      position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: calc(90%); /* positions icon 10px after textarea's right edge */
        cursor: pointer;
        font-size: 15px;
    }



    #commandsList {
        display: none;
        max-height: 190px; /* Set the height you want */
        overflow-y: auto;  /* Enable vertical scrolling when content overflows */
        list-style-type: none;
        padding: 0;
        // margin: 20px 0px auto; /* Center the list horizontally */
        // border: 1px solid #ccc; /* Outline for the list */
        width: 100.25%; /* Ensure the list fits the width of the textarea */
        border-radius: 5px;
        // box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        background-color: #fefefe;
    }
    .command-item {
        // margin-top: 4px;
        // margin-bottom: 4px;
        padding: 10px;
        border-bottom: 1px solid #ccc; /* Outline for each list item */
        cursor: pointer; /* Make list items clickable */
        background-color: transparent;
        // -webkit-box-shadow: inset 0 2em 3em -1em green;
    }
    .command-item:hover {
        background-color: #f0f0f0; /* Highlight on hover */
    }
    .command-item:last-child {
        // border-bottom: none; /* Remove bottom border for the last item */
    }

    #commandInput {
        font-family: serif;
        /* Helps take text from textarea in one line. */
        white-space: pre-wrap;
        // box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    .inner-shadow-top {
        -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px 30px 36px -28px inset;
        -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px 30px 36px -28px inset;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 30px 36px -28px inset;
    }
    .inner-shadow-bottom {
        -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px -30px 36px -28px inset;
        -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px -30px 36px -28px inset;
        box-shadow: rgba(0, 0, 0, 0.35) 0px -30px 36px -28px inset;
    }

    .inner-shadow-top-bottom {
        -webkit-box-shadow: inset 0px 20px 8px -10px rgba(0, 0, 0, 0.15), inset 0px -20px 8px -10px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: inset 0px 20px 8px -10px rgba(0, 0, 0, 0.15), inset 0px -20px 8px -10px rgba(0, 0, 0, 0.15);
        box-shadow: inset 0px 20px 8px -10px rgba(0, 0, 0, 0.15), inset 0px -20px 8px -10px rgba(0, 0, 0, 0.15);
    }


    .inner-light-shadow-top {
        -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px 20px 36px -28px inset;
        -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px 20px 36px -28px inset;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 20px 36px -28px inset;
    }
    .inner-light-shadow-bottom {
        -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px -20px 36px -28px inset;
        -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px -20px 36px -28px inset;
        box-shadow: rgba(0, 0, 0, 0.35) 0px -20px 36px -28px inset;
    }

    .inner-light-shadow-top-bottom {
        -webkit-box-shadow: inset 0px 15px 8px -10px rgba(0, 0, 0, 0.15), inset 0px -15px 8px -10px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: inset 0px 15px 8px -10px rgba(0, 0, 0, 0.15), inset 0px -15px 8px -10px rgba(0, 0, 0, 0.15);
        box-shadow: inset 0px 15px 8px -10px rgba(0, 0, 0, 0.15), inset 0px -15px 8px -10px rgba(0, 0, 0, 0.15);
    }

    

    #noCommandsFoundText {
        display: none;
        width: max-content;
        margin: 20px 0px auto;
        padding: 5px;
        outline: black solid 1px;
        background-color: #f5f5f5;
        color: darkgray;
    }
</style>
`;

const commandInputFieldHTML = `
    <div class="command-input-container">
        <div class="fixed-top-centered-horizontally">
            <div class="textarea-list-wrapper" style='position: relative; display: inline-block; /* or width: 90%; if you want container same width as textarea */'>
    <textarea id="${commandInputId}" class="form-wrapper" placeholder="Type command..."></textarea>     <!-- Down arrow icon -->
            <span id="toggleIcon" class="toggle-icon">&#9660;</span> 
                <ul id="commandsList"></ul>
                <p id="noCommandsFoundText">No commands found</p>
            </div>
        </div>
    </div>
`;

// const btnOpenCommandInputFieldHTML = `
//     <div class="btn_open_command_palette" title="Command palette" style="
//     display: none; 
//     position: fixed;
//     left: 50%;
//     width: 500px;
//     height: 45px;
//     border: none;
//     background-color: transparent;
//     position: fixed;
//     width: 500px;
//     top: 1px;
//     left: 50%;
//     margin-left: -250px;
//         transform: translateX(-50%);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     /* height: 200px; */
//     /* margin-top: -100px; */">
//         <button style="width: 30px; height: 30px; margin-top: 15px; border: none; outline: none; border-radius: 50%; background-color: white; box-shadow: 0px 0px 10px 1px;"><img class="" src="./icons/command-palette.png" style="width: 20px; height: 20px; vertical-align: middle; font-size: 1.5rem; filter: hue-rotate(120deg) brightness(15%) contrast(0%);"></button>
//     </div>`;


const btnOpenCommandInputFieldHTML = 
`<div class="btn_open_command_palette" style="
    height: 45px;
    border: none;
    background-color: transparent;
    position: fixed;
    // width: 500px;
    // left: 50%;
    // transform: translateX(-50%);
    // display: flex;
    // justify-content: center;
    // align-items: center;
    bottom: 25px;
    right: 25px;
">
    <button style="
        width: 30px;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 50%;
        background-color: white;
        box-shadow: 0px 0px 10px 1px;
            display: flex;
            justify-content: center;
            align-items: center;
    ">
        <img src="./icons/command-palette.png" style="
            width: 20px; 
            height: 20px; 
            vertical-align: middle; 
            font-size: 1.5rem; 
            filter: hue-rotate(120deg) brightness(15%) contrast(0%);
        ">
    </button>
</div>`;


document.head.insertAdjacentHTML('beforeend', someStyle);

document.body.innerHTML = btnOpenCommandInputFieldHTML + commandInputFieldHTML + document.body.innerHTML;
const commandInput = document.getElementById(commandInputId);
const commandInputContainer = document.getElementsByClassName("command-input-container")[0];

hideCommandInput();

$('.btn_open_command_palette').click(()=> {
    showCommandInput();
    $('.btn_open_command_palette').hide();
});


  /**
 * Adding command input field with commands
 * Parameters: command objects array: [{key, title, action, tags, description, icon}, {...}].
 */ 
function setCommandInputFiled(commandObjects) {
    const commandObject = {};

    const list = document.getElementById('commandsList');
    const toggleIcon = document.getElementById('toggleIcon');
    const noCommandsFoundText = document.getElementById('noCommandsFoundText');
    const commandContainerClassName = 'command-element';

    let isCommandsListDisplayed = false;

    
    commandInput.classList.add(commandContainerClassName);
    list.classList.add(commandContainerClassName);
    toggleIcon.classList.add(commandContainerClassName);

    list.style.display = 'none';

    let isCommandsListHasVerticalScrollbar = false;
    
    handleInnerShadowsOfElemOnScroll(list);
    handleInnerShadowsOfElemOnScroll(commandInput, true);

    commandObjects.forEach(commandObject => {
        addCommandObject(commandObject);
    });
    


    commandInput.addEventListener('click', () => {
        setCommandsListDependsOfUserInput();
        displayCommandsList();
    });

    function displayCommandsList({onListDisplayParam = () => {onListDisplay();}} = {}) {
        // Show commands list.
        list.style.display = 'block';
        // Up arrow icon.
        toggleIcon.innerHTML = '&#9650;';

        isCommandsListDisplayed = true;

        onListDisplayParam();
    }


    commandInput.addEventListener('input', () => {
        const commandInputWords = getWordsOfText(getNormalizedTextOfTextarea(commandInput.value));

        // If no words in input field then show all commands in list.
        if (commandInputWords.length === 0) {
            setAllCommandsInList();
            onListDisplay();

            return;
        }

        const uniqueCommandInputWords = [...new Set(commandInputWords)];
        
        setCommands();

        function setCommands() {
            list.innerHTML = '';
            const commandsFoundByTags = [];

            /*
                Taking all command objects.
                Taking all words from command input field.
                Then cheking if current command object includes in tags a word from command input field. If so then showing this command in list.
            */            
            for (const [key, value] of Object.entries(commandObject)) {
                const currentCommandObject = value;

                const lowerCaseCommandTags = currentCommandObject.tags?.map(e => e.toLowerCase());

                uniqueCommandInputWords.forEach((currentCommandInputWord, index) => {
                    if (lowerCaseCommandTags?.includes(currentCommandInputWord.toLowerCase())) {
                        commandsFoundByTags.push(currentCommandObject);
                    }
                });
            }

            const sortedCommandsByTitleFrequency = sortByObjectPropertyFrequency(commandsFoundByTags, 'title');

            const uniqueCommandsToShowInList = getUniqueArray(sortedCommandsByTitleFrequency);

            uniqueCommandsToShowInList.forEach((commandObject) => { 
                addCommandItemToList(commandObject);
            });
        }

        onListDisplay();
    });

    // Toggle arrow icon to display or hide list with commands.
    toggleIcon.addEventListener('click', () => {
        if (isCommandsListDisplayed === false) {
            setCommandsListDependsOfUserInput();
            displayCommandsList();
        } else {
            hideCommandsList();
        }
    });

    document.addEventListener('click', (event) => {
        var targetElement = event.target || event.srcElement;

        // Check if clicked element hasn't class indicating is class of command container then hide commands list.
        if (targetElement.classList.contains(commandContainerClassName) === false) {
            hideCommandsList();
        }
    });



    function setCommandsListDependsOfUserInput() {
        const commandInputWords = getWordsOfText(getNormalizedTextOfTextarea(commandInput.value));

        if (commandInputWords.length === 0) {
            setAllCommandsInList();
        }
    }

    function onListDisplay() {
        const countListItems = getCountOfItemsInList(list);
        
        handleInnerShadowsOfElemWithScroll(list);

        if (countListItems === 0) {
            noCommandsFoundText.style.display = 'block';
        }
        else {
            noCommandsFoundText.style.display = 'none';
        }
    }

    function hideCommandsList() {
        isCommandsListDisplayed = false;

        // Hide commands list.
        list.style.display = 'none';
        // Down arrow icon.
        toggleIcon.innerHTML = '&#9660;'; 

        noCommandsFoundText.style.display = 'none';
    }

    function setAllCommandsInList() {
        list.innerHTML = '';

        
        // commandObjects.forEach(currentCommandObject => {
        //     addCommandItemToList(currentCommandObject);
        // });

        Object.keys(commandObject).forEach(key => {
            addCommandItemToList(commandObject[key]);
        });
    }


    function addCommandItemToList(commandObject) {
        const li = document.createElement('li');

        // Text.
        li.textContent = commandObject.title;

        // Classes.
        li.classList.add("command-item");
        li.classList.add(commandContainerClassName);
        //

        // !!!
        // Click handler.
        if (commandObject.action != undefined) {
            li.addEventListener('click', () => {
                commandInput.value = '';
                hideCommandsList();
                commandObject.action();
            });
        }
        //

        // Icon.
        if (commandObject.icon === undefined) commandObject.icon = '';

        li.innerHTML = `<img src="${commandObject.icon}" onerror="this.style.visibility='hidden'" style="width: 20px; height: 20px; margin-right: 2px; vertical-align: middle; font-size: 1.5rem; " />` + `<span style="display: inline-block; vertical-align: middle; margin-left: 0.3rem;     font-size: smaller; color: black;">` + li.innerHTML + `</span>`;
        //

        list.appendChild(li);
    }

    function addCommandObject({key, title, action, tags, description, icon}) {
        if (key === undefined) {
            console.log('%c Key for an object in function addCommandObject(...) must be assigned ', 'background: #fcc8c5; padding: 10px');
            return false;
        }

        // commandObjects.push(key = {title: title, action: action, tags: tags, description: description});
        commandObject[key] = {title: title, action: action, tags: tags, description: description, icon: icon};
    }
    
    function handleInnerShadowsOfElemOnScroll(elem, isLightShadows = false) {
        // On scroll.
        elem.addEventListener("scroll", (event) => {
            handleInnerShadowsOfElemWithScroll(elem, isLightShadows);
        });
    }

    function handleInnerShadowsOfElemWithScroll(elem, isLightShadows = false) {
        isCommandsListHasVerticalScrollbar = elem.scrollHeight > elem.clientHeight;

        if (isCommandsListHasVerticalScrollbar === false) {
            if (isLightShadows) {
                elem.classList.remove('inner-light-shadow-top-bottom');
                elem.classList.remove('inner-light-shadow-top');
                elem.classList.remove('inner-light-shadow-bottom');
            } else {
                elem.classList.remove('inner-shadow-top-bottom');
                elem.classList.remove('inner-shadow-top');
                elem.classList.remove('inner-shadow-bottom');
            }
            
            return false;
        }

        // Display top and bottom shadows.
        if (isLightShadows) {
            elem.classList.add('inner-light-shadow-top-bottom');
        } else {
            elem.classList.add('inner-shadow-top-bottom');
        }

        if (elem.scrollTop <= 0) {
            // We are on the top. Hide top shadow.

            if (isLightShadows) {
                elem.classList.remove('inner-light-shadow-top-bottom');
                elem.classList.remove('inner-light-shadow-top');
                elem.classList.add('inner-light-shadow-bottom');
            } else {
                elem.classList.remove('inner-shadow-top-bottom');
                elem.classList.remove('inner-shadow-top');
                elem.classList.add('inner-shadow-bottom');
            }
        }

        if (elem.scrollTop >= (elem.scrollHeight - elem.offsetHeight)) {
            // We are on the bottom. Hide bottom shadow.

            if (isLightShadows) {
                elem.classList.remove('inner-light-shadow-top-bottom');
                elem.classList.remove('inner-light-shadow-bottom');
                elem.classList.add('inner-light-shadow-top');
            } else {
                elem.classList.remove('inner-shadow-top-bottom');
                elem.classList.remove('inner-shadow-bottom');
                elem.classList.add('inner-shadow-top');
            }
        }

        return true;
    }



    function getWordsOfText(str) {
        let arr = str.split(' ');

        // Remove empty and whitespace strings.
        return arr.filter(function(entry) { return entry.trim() != ''; });
    }

    function getNormalizedTextOfTextarea(str) {
        const commandInputTextInOneLines = str.replace('\n', ' ');

        function getTextWithRemovedMultipleSpaces(str) {
            return str.replace(/\s+/g, ' ');
        }

        return getTextWithRemovedMultipleSpaces(commandInputTextInOneLines).trim();
    }

    function getUniqueArray(arr) {
        const uniqueStrings = [];
        
        return arr.filter(o => {
            const s = JSON.stringify(o);
            if (!uniqueStrings.includes(s)) {
                uniqueStrings.push(s);
                return true;
            }
            return false;
        });
    }

    
    function sortByObjectPropertyFrequency(arr, property) {
        // Step 1: Count occurrences of each property value
        let countMap = {};
        arr.forEach(obj => {
            let key = obj[property];
            if (countMap[key]) {
                countMap[key]++;
            } else {
                countMap[key] = 1;
            }
        });

        // Step 2: Sort the array based on the frequency of the property values
        arr.sort((a, b) => {
            let countA = countMap[a[property]];
            let countB = countMap[b[property]];
            
            // Sort by frequency (most frequent first), if frequencies are equal, maintain order
            return countB - countA;
        });

        return arr;
    }
    
    function getCountOfItemsInList(ulElement) {
        // Get all child elements of the <ul>
        const children = ulElement.children;

        // Filter out only <li> elements
        const liElements = Array.from(children).filter(child => child.tagName === 'LI');

        // Calculate the number of <li> elements
        const numberOfLi = liElements.length;

        return numberOfLi;
    }
}

function showCommandInput() {
    commandInputContainer.style.display = 'block';
}

function hideCommandInput() {
    commandInputContainer.style.display = 'none';
}