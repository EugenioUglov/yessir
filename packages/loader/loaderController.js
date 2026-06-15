class LoaderController {
    constructor() {
        this.view = new LoadingView();
    }

    startLoading() {
        this.view.startLoading();
    }

        
    stopLoading() {
        this.view.stopLoading();
    }
}