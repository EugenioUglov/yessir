class ModalLoadingController {
    #modalBoxController;

    constructor(modalBoxController) {
        this.#modalBoxController = modalBoxController;
    }

    show() {
        this.#modalBoxController.show({
            header_text: "Loading..",
            is_possible_close: false
        });
    }

    hide() {
        this.#modalBoxController.hide();
    }
}