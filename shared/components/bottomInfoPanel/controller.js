class BottomInfoPanelController {
    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
        
        this.#view.bindPanelClosed({
            handler: () => {
                this.#showMessagesQueue();
            }
        });
    }

    #model;
    #view;
    #isPanelShowing = false;

    showPanel(message, duration = 3000) {
        this.#model.addMessage({ message: message, duration: duration });

        if (this.#isPanelShowing) return false;

        this.#showMessagesQueue();
    }

    hidePanel() {
        this.#view.hidePanel();
    }

    #showMessagesQueue() {
        const messageObject = this.#model.getMessageObjectInQueue();

        if ( ! messageObject) {
            this.#isPanelShowing = false;

            return false;
        }

        this.#isPanelShowing = true;

        this.#view.showPanel({ 
            message: messageObject.message,
            duration: messageObject.duration
        });
    }
}