(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class SearchManager {
        constructor({ projectAssetLoader, textManager, keyCodeByKeyName, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoader, textManager, keyCodeByKeyName, targetId, data });
        }
        
        async init({ projectAssetLoader, textManager, keyCodeByKeyName, targetId, data }) {
            // const projectAssetLoader = new projectAssetLoader(FEATURE_BASE_PATH);
            projectAssetLoader.setBasePath({path: FEATURE_BASE_PATH});

            const cssPromise = projectAssetLoader.loadStyle('style.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.mustache', data);

            const sarchControllerPromise = projectAssetLoader.loadJavaScript("searchController.js");
            const sarchViewPromise = projectAssetLoader.loadJavaScript("searchView.js");

            await Promise.all([cssPromise, htmlPromise, sarchControllerPromise, sarchViewPromise]);

            const view = new SearchView();
            const controller = new SearchController(view, textManager, keyCodeByKeyName);

            return controller;
        }
    }

    window.SearchManager = SearchManager;
})();