(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class NoteBootstrapper {
        static async create({ projectAssetLoader, noteSpeakerService }) {
            projectAssetLoader.setBasePath({ path: FEATURE_BASE_PATH });

            const viewPromise = projectAssetLoader.loadJavaScript("view.js");
            const controllerPromise = projectAssetLoader.loadJavaScript("controller.js");

            await Promise.all([viewPromise, controllerPromise]);
            const view = new NoteView();
            const controller = new NoteController({ view, noteSpeakerService });
            
            return controller;
        }
    }
    

    window.NoteBootstrapper = NoteBootstrapper;
})();