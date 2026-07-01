(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    /**
     * It builds the module. 
     * Returns controller in async.
     */
    class TopInfoPanelManager {
        constructor({ projectAssetLoader, targetId }) {
            // Return promise.
            return this.init({ projectAssetLoader, targetId });
        }

        /**
         * 
         * @param {class, string, object} - targetid - id of the main html code. 
         * @returns 
         */
        async init({ projectAssetLoader, targetId }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            const cssPromise = projectAssetLoader.loadStyle('style.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtmlToDomElementById({ targetId, pathHtml: 'index.mustache' });
            const viewPromise = projectAssetLoader.loadJavaScript("view.js");
            const controllerPromise = projectAssetLoader.loadJavaScript("controller.js");

            await Promise.all([cssPromise, htmlPromise, viewPromise, controllerPromise]);
            
            const domContainer = document.getElementById(targetId);

            const view = new TopInfoPanelView({
                domContainer: domContainer 
            });

            const controller = new TopInfoPanelController({
                view: view
            });

            return controller;
        }
    }

    window.TopInfoPanelManager = TopInfoPanelManager;
})();