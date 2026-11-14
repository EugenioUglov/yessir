(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class FixedSearchBootstrapper {
        constructor({ projectAssetLoader, textManager, targetId }) {
            // Return promise.
            return this.init({ projectAssetLoader, textManager, targetId });
        }
        
        async init({ projectAssetLoader, textManager, targetId }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            const cssPromise = projectAssetLoader.loadStyle({ path: 'style.css' });
            const htmlPromise = projectAssetLoader.loadMustacheHtmlToDomElementById({ targetId, pathHtml: 'index.mustache' });

            const sarchControllerPromise = projectAssetLoader.loadJavaScript({ path: "fixedSearchController.js" });
            const sarchViewPromise = projectAssetLoader.loadJavaScript({ path: "fixedSearchView.js" });

            await Promise.all([cssPromise, htmlPromise, sarchControllerPromise, sarchViewPromise]);

            const domContainer = document.getElementById(targetId);

            const view = new FixedSearchView({ domContainer });
            const controller = new FixedSearchController({ view, textManager });

            return controller;
        }
    }

    window.FixedSearchBootstrapper = FixedSearchBootstrapper;
})();