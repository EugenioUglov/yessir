/**
 * This class gives possibility to load js, css and html dinamically into main page.
 */
class ProjectAssetLoader {
    /**
     * @param {string} [currentScriptUrl] - Необязательный URL. Если передан, пути будут считаться относительно него.
     */
    constructor(currentScriptUrl) {
        this.#basePath = this.#calculateBasePath(currentScriptUrl);
    }

    #basePath = "";
    #cache = new Map();

    setBasePath({ path }) {
        this.#basePath = path;
    }

    getNormalizedPath(path) {
        if (!path.includes('/')) {
            return this.#basePath + path;
        }

        return path;
    }

    loadJavaScript(path) {
        if (this.#cache.has(path)) {
            return this.#cache.get(path);
        }

        const promise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = this.getNormalizedPath(path);
            script.onload = () => {
                console.log("📦 AssetLoader: Loaded JS ->", script.src);
                resolve();
            };
            script.onerror = () => {
                this.#cache.delete(path);
                reject(new Error(`Failed to load script: ${path}`))
            };
            document.body.appendChild(script);
        });

        this.#cache.set(path, promise);

        return promise;
    }

    loadStyle(path) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this.getNormalizedPath(path); 

            // Разрешаем Promise, когда браузер полностью загрузил CSS
            link.onload = () => {
                console.log("📦 AssetLoader: Loaded CSS ->", link.href);
                resolve();
            };

            link.onerror = () => reject(new Error(`Failed to load CSS: ${path}`));

            document.head.appendChild(link);
        });
    }

    async loadMustacheHtml(targetId, pathHtml, data) {
        const normalizedPath = this.getNormalizedPath(pathHtml);
        const response = await fetch(normalizedPath);

        if (!response.ok) {
            throw new Error(`AssetLoader: Failed to load HTML -> ${response.statusText}`);
        }
        
        const templateText = await response.text();
        const renderedHtml = Mustache.render(templateText, data);
        
        const targetElement = document.getElementById(targetId);

        if (!targetElement) {
            console.error(`Debug: Searching for #${targetId}`);
            console.error("Current DOM snapshot:", document.body.innerHTML); // See what's actually there
            throw new Error(`AssetLoader: Failed to load HTML -> Element with id ${targetId} doesn't exist.`);
        }

        if (targetElement) {
            targetElement.innerHTML = renderedHtml;
        } else {
            throw new Error(`AssetLoader: Failed to load HTML -> Element with id ${targetId} doesn't exist.`);
        }

        console.log("📦 AssetLoader: Loaded HTML ->", normalizedPath);

        return renderedHtml;
    }
    
    #calculateBasePath(url) {
        if (url) {
            return url.substring(0, url.lastIndexOf('/') + 1);
        }
        return '';
    }
}
