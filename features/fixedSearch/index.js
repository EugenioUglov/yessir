(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class FixedSearch {
        constructor({ projectAssetLoader, targetId }) {
            // Return promise.
            return this.init({ projectAssetLoader, targetId });
        }
        
        async init({ projectAssetLoader, targetId }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });


            await projectAssetLoader.loadJavaScript({ path: "https://cdn.jsdelivr.net/npm/fixed-search@1.0.0/dist/fixed-search.umd.js" });

            await projectAssetLoader.loadJavaScript({ path: "fixedSearchEventBinder.js" });
            
            const searchController = await new FixedSearchBootstrapper({
                targetId: 'searchContainer'
            });

            new FixedSearchEventBinder({
                searchController
            });

            return searchController;
        }
    }

    window.FixedSearch = FixedSearch;
})();