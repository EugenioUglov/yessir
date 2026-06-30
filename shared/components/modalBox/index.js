(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class ModalBoxManager {
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

            // const mustachePromise = await projectAssetLoader.loadJavaScript('https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.1/mustache.min.js');

            const cssPromise = projectAssetLoader.loadStyle('modalBox.css');
            
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.mustache', data);
            
            const modalBoxViewPromise = projectAssetLoader.loadJavaScript("modalBoxView.js");
            const modalBoxControllerPromise = projectAssetLoader.loadJavaScript("modalBoxController.js");

            await Promise.all([cssPromise, htmlPromise, modalBoxViewPromise, modalBoxControllerPromise]);
            
            const view = new ModalBoxView({ containerId: targetId });
            const controller = new ModalBoxController({ view: view });
            
            return controller;
        }
    }

    window.ModalBoxManager = ModalBoxManager;
})();