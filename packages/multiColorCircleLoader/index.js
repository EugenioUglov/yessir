(function() {
    const FEATURE_BASE_PATH = document.currentScript ? document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) : '';

    class LoaderInitializer {
        constructor({ targetId, data }) {
            // Мы возвращаем промис прямо из конструктора
            return this.init({ targetId, data });;
        }

        /**
         * 
         * @param {string, object} - targetid - id of the main html code. 
         * @returns 
         */
        async init({ targetId, data }) {
            
            const projectAssetLoader = new ProjectAssetLoader(FEATURE_BASE_PATH);

            const cssPromise = projectAssetLoader.loadStyle('multiColorCircleLoader.css');
            const htmlPromise = projectAssetLoader.loadMustacheHtml(targetId, 'index.html', data);
            const loaderViewPromise = projectAssetLoader.loadJavaScript("loaderView.js");
            const loaderControllerPromise = projectAssetLoader.loadJavaScript("loaderController.js");

            await Promise.all([cssPromise, htmlPromise, loaderViewPromise, loaderControllerPromise]);

            const view = new LoaderView();
            const controller = new LoaderController(view);
            
            return controller;
        }
    }

    window.LoaderInitializer = LoaderInitializer;
})();