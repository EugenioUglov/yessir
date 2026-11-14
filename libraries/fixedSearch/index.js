(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class FixedSearch {
        constructor({ projectAssetLoader, textManager, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoader, textManager, targetId, data });
        }
        
        async init({ projectAssetLoader, textManager, targetId, data }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            await projectAssetLoader.loadJavaScript({ path: "fixedSearchWrapper.js" });
            await projectAssetLoader.loadJavaScript({ path: "internal/index.js" });
            await projectAssetLoader.loadJavaScript({ path: "fixedSearchEventBinder.js" });

            const fixedSearchWrapper = await new FixedSearchWrapper(              
                {
                    projectAssetLoader,
                    textManager,
                    targetId
                }
            );

            new FixedSearchEventBinder({
                searchController: fixedSearchWrapper
            });

            return fixedSearchWrapper;
        }
    }

    window.FixedSearch = FixedSearch;
})();