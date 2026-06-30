(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    /**
     * It builds the module. 
     * Returns controller in async.
     */
    class LoginManager {
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

            const cssPromise = projectAssetLoader.loadStyle('style.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.mustache');
            const viewPromise = projectAssetLoader.loadJavaScript("view.js");
            const controllerPromise = projectAssetLoader.loadJavaScript("controller.js");

            await Promise.all([cssPromise, htmlPromise, viewPromise, controllerPromise]);

            const domContainer = document.getElementById(targetId);
            const view = new LoginView({ domContainer: domContainer });
            const controller = new LoginController({ view: view });

            return controller;
        }
    }

    window.LoginManager = LoginManager;
})();