class PageHandlers {
    constructor(searchController, actionBlockController, scrollController) {
        this.#searchController = searchController;
        this.#actionBlockController = actionBlockController;
        this.#scrollController = scrollController;
    }

    #searchController;
    #actionBlockController
    #scrollController;

    openMain = () => {
        this.#searchController.clearInputField();

        if (this.#actionBlockController.model.getActionBlocks().size > 0) {
            this.#actionBlockController.view.onOpenMainPageWithActionBlocks();
            this.#actionBlockController.showActionBlocks();
        } else {
            this.#actionBlockController.view.onOpenMainPageWithoutActionBlocks();
        }

        this.#actionBlockController.view.onShowMainPage();
        this.#scrollController.setPositionTop();
    }
}