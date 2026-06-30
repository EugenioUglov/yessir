(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    /**
     * It builds the module. 
     * Returns controller in async.
     */
    class BottomInfoPanelManager {
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
            // const projectAssetLoader = new projectAssetLoader(FEATURE_BASE_PATH);
            projectAssetLoader.setBasePath({path: FEATURE_BASE_PATH});

            const mustachePromise = projectAssetLoader.loadJavaScript('https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.1/mustache.min.js');

            const cssPromise = projectAssetLoader.loadStyle('style.css');

            await Promise.all([mustachePromise, cssPromise]);

            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.mustache');
            
            await Promise.all([htmlPromise]);

            const modelPromise = projectAssetLoader.loadJavaScript("model.js")

            const viewPromise = projectAssetLoader.loadJavaScript("view.js");

            const controllerPromise = projectAssetLoader.loadJavaScript("controller.js");

            await Promise.all([modelPromise, viewPromise, controllerPromise]);
            
            const domContainer = document.getElementById(targetId);

            const model = new BottomInfoPanelModel();

            const view = new BottomInfoPanelView({
                domContainer: domContainer 
            });

            const controller = new BottomInfoPanelController({ 
                model: model, 
                view: view
            });

            return controller;
        }
    }

    window.BottomInfoPanelManager = BottomInfoPanelManager;
})();