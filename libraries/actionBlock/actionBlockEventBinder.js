class ActionBlockEventBinder {
    constructor({ actionBlockController, buttonActivityView, loaderController }) {
        actionBlockController.bindOnStartActionBlockOperationHandler(() => {
            buttonActivityView.disableAllButtons();
            loaderController.startLoading();
        });

        actionBlockController.bindOnEndActionBlockOperationHandler(() => {
            buttonActivityView.enableAllButtons();
            loaderController.stopLoading();
        });
    }
}