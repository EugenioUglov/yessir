(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class ScrollManager {
        constructor({ projectAssetLoader, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoader, targetId, data });
        }

        /**
         * 
         * @param {class, string, object} - targetid - id of the main html code. 
         * @returns 
         */
        async init({ projectAssetLoader, targetId, data }) {
            // const projectAssetLoader = new projectAssetLoader(FEATURE_BASE_PATH);
            projectAssetLoader.setBasePath({path: FEATURE_BASE_PATH});

            const cssPromise = projectAssetLoader.loadStyle('style.css');
            
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.mustache', data);

            await Promise.all([cssPromise, htmlPromise]);
            
            const scrollControllerPromise = projectAssetLoader.loadJavaScript("scrollController.js");
            const scrollModelPromise = projectAssetLoader.loadJavaScript("scrollModel.js");
            const scrollViewPromise = projectAssetLoader.loadJavaScript("scrollView.js");

            await Promise.all([scrollModelPromise, scrollViewPromise, scrollControllerPromise]);
            
            const view = new ScrollView();
            const model = new ScrollModel();
            const controller = new ScrollController({ model: model, view: view });
            
            return controller;
        }
    }

    window.ScrollManager = ScrollManager;
})();