(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class ActionBlockBootstrapper {
        static async create({ projectAssetLoader, onSelect }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            const modelPromise = projectAssetLoader.loadJavaScript({ path: "actionBlockModel.js" });
            const controllerPromise = projectAssetLoader.loadJavaScript({ path: "actionBlockController.js" });
            const viewPromise = projectAssetLoader.loadJavaScript({ path: "actionBlockView.js" });

            await Promise.all([modelPromise, viewPromise, controllerPromise]);

            const controller = new ActionBlockController({ model: modelPromise, onSelect });
            
            return controller;
        }
    }

    window.ActionBlockBootstrapper = actionBlockBootstrapper;
})();