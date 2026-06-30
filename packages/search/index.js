(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class SearchManager {
        constructor({ projectAssetLoaderClass, textManager, keyCodeByKeyName, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoaderClass, textManager, keyCodeByKeyName, targetId, data });
        }
        
        async init({ projectAssetLoaderClass, textManager, keyCodeByKeyName, targetId, data }) {
            const projectAssetLoader = new projectAssetLoaderClass(FEATURE_BASE_PATH);

            const cssPromise = projectAssetLoader.loadStyle('style.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.html', data);

            await Promise.all([cssPromise, htmlPromise]);

            const sarchControllerPromise = projectAssetLoader.loadJavaScript("searchController.js");
            const sarchViewPromise = projectAssetLoader.loadJavaScript("searchView.js");

            await Promise.all([sarchControllerPromise, sarchViewPromise]);

            const view = new SearchView();
            const controller = new SearchController(view, textManager, keyCodeByKeyName);

            return controller;
        }
    }

    window.SearchManager = SearchManager;
})();