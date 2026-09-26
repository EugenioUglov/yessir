class BottomInfoPanelModel {
    #messages = [];

    addMessage({ message, duration }) {
        this.#messages.push({ message, duration });
    }

    getMessageObjectInQueue() {
        return this.#messages.shift();
    }
}