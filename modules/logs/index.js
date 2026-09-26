(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class LogsBootstrapper {
        static async create({ projectAssetLoader, fileManager, dateManager, container }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            const viewPromise = projectAssetLoader.loadJavaScript("view.js");
            const modelPromise = projectAssetLoader.loadJavaScript("model.js");
            
            const controllerPromise = projectAssetLoader.loadJavaScript("controller.js");

            await Promise.all([viewPromise, modelPromise, controllerPromise]);
            const view = new LogsView({ container });
            const model = new LogsModel(dateManager);

            const controller = new LogsController({ model, view, fileManager, dateManager });
            
            return controller;
        }
    }
    

    window.LogsBootstrapper = LogsBootstrapper;
})();