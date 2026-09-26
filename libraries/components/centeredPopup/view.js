class CenteredPopupView {
    constructor({ domContainer }) {
        this.#domContainer = domContainer;
    }

    #domContainer;

    /**
     * @typedef {Object} ButtonConfig
     * @property {string} text - Text on a button
     * @property {function(MouseEvent): void} action - Function called when the button is clicked
     */

    /**
     * Display popup with title, content and buttons.
     * @param {Object} params
     * @param {string} params.title - Title
     * @param {string} params.content - Main text
     * @param {ButtonConfig[]} [params.buttons=[]] - Array of control buttons
     */
    show({ title, content, buttons = [] }) {
        const container = this.#domContainer.querySelector("#dialog_upload_actionBloks_from_file");
        const titleElement = this.#domContainer.querySelector(".title");
        const contentElement = this.#domContainer.querySelector(".content");
        const buttonsContainer = this.#domContainer.querySelector('.buttons-container');

        titleElement.innerText = "";

        if (title) titleElement.innerText = title;

        if (content) contentElement.innerText = content;

        // Clear existing buttons
        buttonsContainer.innerHTML = "";

        // Add new buttons
        buttons.forEach((buttonConfig) => {
            const button = document.createElement("button");
            button.innerText = buttonConfig.text;
            button.addEventListener("click", buttonConfig.action);
            buttonsContainer.appendChild(button);
        });

        if (typeof container.showModal === "function") {
            container.showModal();
        } else {
            alert("WARNING! The <dialog> API is not supported by this browser");
        }
    }
}