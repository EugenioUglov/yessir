(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class BottomInfoPanelManager {
        constructor({ projectAssetLoaderClass, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoaderClass, targetId, data });
        }

        /**
         * 
         * @param {class, string, object} - targetid - id of the main html code. 
         * @returns 
         */
        async init({ projectAssetLoaderClass, targetId, data }) {
            const projectAssetLoader = new projectAssetLoaderClass(FEATURE_BASE_PATH);

            const mustachePromise = projectAssetLoader.loadJavaScript('https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.1/mustache.min.js');
            const cssPromise = projectAssetLoader.loadStyle('style.css');
            
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.mustache', data);

            await Promise.all([mustachePromise, cssPromise, htmlPromise]);

            const infoPanelControllerPromise = projectAssetLoader.loadJavaScript("infoPanelController.js");
            
            // const scrollControllerPromise = projectAssetLoader.loadJavaScript("scrollController.js");
            // const scrollModelPromise = projectAssetLoader.loadJavaScript("scrollModel.js");
            // const scrollViewPromise = projectAssetLoader.loadJavaScript("scrollView.js");

            await Promise.all([infoPanelControllerPromise]);
            
            const controller = new BottomInfoPanelController();

            const domContainer = document.getElementById(targetId);

            domContainer.querySelector(".close-btn");
            domContainer.addEventListener('click', () => {
                controller.hidePanel();
            });
            
            return controller;
        }
    }

    window.BottomInfoPanelManager = BottomInfoPanelManager;
})();