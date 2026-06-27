(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class LoaderInitializer {
        constructor({ projectAssetLoaderClass, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoaderClass,targetId, data });;
        }

        /**
         * 
         * @param {string, object} - targetid - id of the main html code. 
         * @returns 
         */
        async init({ projectAssetLoaderClass, targetId, data }) {
            const projectAssetLoader = new projectAssetLoaderClass(FEATURE_BASE_PATH);

            const cssPromise = projectAssetLoader.loadStyle('multiColorCircleLoader.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.html', data);

            await Promise.all([cssPromise, htmlPromise]);

            const loaderViewPromise = projectAssetLoader.loadJavaScript("loaderView.js");
            const loaderControllerPromise = projectAssetLoader.loadJavaScript("loaderController.js");

            await Promise.all([loaderViewPromise, loaderControllerPromise]);


            const view = new LoaderView();
            const controller = new LoaderController(view);
            
            return controller;
        }
    }

    window.LoaderInitializer = LoaderInitializer;
})();