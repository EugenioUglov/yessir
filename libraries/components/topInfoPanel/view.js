class TopInfoPanelView {
    constructor ({ domContainer }) {
        this.#domContainer = domContainer;
    }

    #domContainer;

    hide() {
        this.#domContainer.querySelector('#status-bar').classList.replace('status-bar-visible', 'status-bar-hidden');
    }

    show() {
        this.#domContainer.querySelector('#status-bar').classList.replace('status-bar-hidden', 'status-bar-visible');
    }
}