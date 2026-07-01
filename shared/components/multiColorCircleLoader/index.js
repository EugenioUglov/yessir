(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class LoaderManager {
        constructor({ projectAssetLoader, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoader,targetId, data });;
        }

        /**
         * 
         * @param {string, object} - targetid - id of the main html code. 
         * @returns 
         */
        async init({ projectAssetLoader, targetId, data }) {
            // const projectAssetLoader = new projectAssetLoader(FEATURE_BASE_PATH);
            projectAssetLoader.setBasePath({path: FEATURE_BASE_PATH});

            // const mustachePromise = await projectAssetLoader.loadJavaScript('https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.1/mustache.min.js');

            const cssPromise = projectAssetLoader.loadStyle('multiColorCircleLoader.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtmlToDomElementById({ targetId, pathHtml: 'index.mustache', data });

            const loaderViewPromise = projectAssetLoader.loadJavaScript("loaderView.js");
            const loaderControllerPromise = projectAssetLoader.loadJavaScript("loaderController.js");

            await Promise.all([cssPromise, htmlPromise, loaderViewPromise, loaderControllerPromise]);

            const view = new LoaderView();
            const controller = new LoaderController(view);
            
            return controller;
        }
    }

    window.LoaderManager = LoaderManager;
})();