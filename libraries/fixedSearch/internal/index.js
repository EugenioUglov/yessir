(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class FixedSearchBootstrapper {
        constructor({ projectAssetLoader, textManager, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoader, textManager, targetId, data });
        }
        
        async init({ projectAssetLoader, textManager, targetId, data }) {
            projectAssetLoader.setBasePath({path: FEATURE_BASE_PATH});

            const cssPromise = projectAssetLoader.loadStyle('style.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtmlToDomElementById({ targetId, pathHtml: 'index.mustache', data });

            const sarchControllerPromise = projectAssetLoader.loadJavaScript("fixedSearchController.js");
            const sarchViewPromise = projectAssetLoader.loadJavaScript("fixedSearchView.js");

            await Promise.all([cssPromise, htmlPromise, sarchControllerPromise, sarchViewPromise]);

            const domContainer = document.getElementById(targetId);

            const view = new FixedSearchView({ domContainer });
            const controller = new FixedSearchController({ view, textManager });

            return controller;
        }
    }

    window.FixedSearchBootstrapper = FixedSearchBootstrapper;
})();