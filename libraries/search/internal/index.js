(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class SearchBootstrapper {
        constructor({ projectAssetLoader, textManager, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoader, textManager, targetId, data });
        }
        
        async init({ projectAssetLoader, textManager, targetId, data }) {
            projectAssetLoader.setBasePath({path: FEATURE_BASE_PATH});

            const cssPromise = projectAssetLoader.loadStyle('style.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtmlToDomElementById({ targetId, pathHtml: 'index.mustache', data });

            const sarchControllerPromise = projectAssetLoader.loadJavaScript("searchController.js");
            const sarchViewPromise = projectAssetLoader.loadJavaScript("searchView.js");

            await Promise.all([cssPromise, htmlPromise, sarchControllerPromise, sarchViewPromise]);

            const domContainer = document.getElementById(targetId);

            const view = new SearchView({ domContainer });
            const controller = new SearchController(view, textManager);

            return controller;
        }
    }

    window.SearchBootstrapper = SearchBootstrapper;
})();