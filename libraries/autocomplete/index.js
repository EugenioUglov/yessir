(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class autocompleteManager {
        static async create({ projectAssetLoader, onSelect }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            const modelPromise = projectAssetLoader.loadJavaScript("model.js");
            const controllerPromise = projectAssetLoader.loadJavaScript("controller.js");

            await Promise.all([modelPromise, controllerPromise]);
            const view = new AutocompleteView();

            const controller = new AutocompleteController({ model, onSelect });
            
            return controller;
        }
    }

    window.AutocompleteManager = autocompleteManager;
})();