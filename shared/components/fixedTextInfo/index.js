(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class FixedTextInfoManager {
        constructor({ projectAssetLoader, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoader, targetId,  data });;
        }

        /**
         * 
         * @param {string, object} - targetid - id of the main html code. 
         * @returns 
         */
        async init({ projectAssetLoader, targetId, data }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            const cssPromise = projectAssetLoader.loadStyle('style.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtmlToDomElementById({ targetId, pathHtml: 'index.mustache', data });
            const viewPromise = projectAssetLoader.loadJavaScript("view.js");
            const controllerPromise = projectAssetLoader.loadJavaScript("controller.js");

            await Promise.all([cssPromise, htmlPromise, viewPromise, controllerPromise]);

            const domElement = document.getElementById(targetId);

            const view = new FixedTextInfoView({ domElement });
            const controller = new FixedTextInfoController({ view });
            
            return controller;
        }
    }

    window.FixedTextInfoManager = FixedTextInfoManager;
})();