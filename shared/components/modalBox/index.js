(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class ModalBoxInitializer {
        constructor({ projectAssetLoaderClass, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoaderClass, targetId, data });;
        }

        /**
         * 
         * @param {string, object} - targetid - id of the main html code. 
         * @returns 
         */
        async init({ projectAssetLoaderClass, targetId, data }) {
            const projectAssetLoader = new projectAssetLoaderClass(FEATURE_BASE_PATH);

            const cssPromise = projectAssetLoader.loadStyle('modalBox.css');
            
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.html', data);

            await Promise.all([cssPromise, htmlPromise]);
            
            const modalBoxViewPromise = projectAssetLoader.loadJavaScript("modalBoxView.js");
            const modalBoxControllerPromise = projectAssetLoader.loadJavaScript("modalBoxController.js");

            await Promise.all([modalBoxViewPromise, modalBoxControllerPromise]);
            
            const view = new ModalBoxView({ containerId: targetId });
            const controller = new ModalBoxController({ view: view });
            
            return controller;
        }
    }

    window.ModalBoxInitializer = ModalBoxInitializer;
})();