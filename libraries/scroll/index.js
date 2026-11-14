(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class ScrollBootstrapper {
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
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            const cssPromise = projectAssetLoader.loadStyle({ path: 'style.css' });            
            const htmlPromise = projectAssetLoader.loadMustacheHtmlToDomElementById({ targetId, pathHtml: 'index.mustache', data });

            await Promise.all([cssPromise, htmlPromise]);
            
            const scrollControllerPromise = projectAssetLoader.loadJavaScript({ path: "scrollController.js" });
            const scrollModelPromise = projectAssetLoader.loadJavaScript({ path: "scrollModel.js" });
            const scrollViewPromise = projectAssetLoader.loadJavaScript({ path: "scrollView.js" });

            await Promise.all([scrollModelPromise, scrollViewPromise, scrollControllerPromise]);
            
            const view = new ScrollView();
            const model = new ScrollModel();
            const controller = new ScrollController({ model: model, view: view });
            
            return controller;
        }
    }

    window.ScrollBootstrapper = ScrollBootstrapper;
})();