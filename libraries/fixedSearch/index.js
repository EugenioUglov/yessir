(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class FixedSearch {
        constructor({ projectAssetLoader, textManager, targetId, data }) {
            // Return promise.
            return this.init({ projectAssetLoader, textManager, targetId, data });
        }
        
        async init({ projectAssetLoader, textManager, targetId, data }) {
            projectAssetLoader.setBasePath({path: FEATURE_BASE_PATH});

            await projectAssetLoader.loadJavaScript("fixedSearchWrapper.js");
            await projectAssetLoader.loadJavaScript("internal/index.js");
            await projectAssetLoader.loadJavaScript("fixedSearchEventBinder.js");

            const fixedSearchWrapper = new FixedSearchWrapper();

            const controller = await fixedSearchWrapper.init(
              {
                projectAssetLoader,
                textManager,
                targetId
              }
            );

            // const controller = await new FixedSearchBootstrapper(
            //     {
            //         projectAssetLoader,
            //         textManager,
            //         targetId
            //     }
            // );

            new FixedSearchEventBinder({
                searchController: controller
            });

            return controller;
        }
    }

    window.FixedSearch = FixedSearch;
})();