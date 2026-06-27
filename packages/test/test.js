class Test {
    constructor(basePath) {
        this.basePath = basePath;
        console.log(`${this.basePath}/index2.html`);
        this.init();
    }

    async init() {
        try {
            // Construct the path relative to the folder you passed in
            const template = await ModuleLoader.loadTemplate(`${this.basePath}/index2.html`);
            console.log("Template loaded:", template);
        } catch (err) {
            console.error("Load error:", err);
        }
    }
}