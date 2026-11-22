(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class FixedSearchFeatureBootstrapper {
        static async create({ targetId }) {
           await import("https://cdn.jsdelivr.net/npm/project-asset-loader/dist/project-asset-loader.umd.js");

            const projectAssetLoader = new ProjectAssetLoader({});

            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            await projectAssetLoader.loadJavaScript({ path: "https://cdn.jsdelivr.net/npm/fixed-search@1.0.0/dist/fixed-search.umd.js" });

            await projectAssetLoader.loadJavaScript({ path: "fixedSearchEventBinder.js" });

            const controller = await new FixedSearchBootstrapper({
                targetId
            });

            new FixedSearchEventBinder({
                controller
            });

            return controller;
        }
    }

    window.FixedSearchFeatureBootstrapper = FixedSearchFeatureBootstrapper;
})();