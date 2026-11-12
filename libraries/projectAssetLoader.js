/**
 * This class gives possibility to load js, css and html dinamically
 */
class ProjectAssetLoader {
    /**
     * @param {string} [currentScriptUrl] - Optional URL. If exists set direction to indicated folder.
     */
    constructor({ currentScriptUrl }) {
        const scriptUrl = currentScriptUrl || (document.currentScript ? document.currentScript.src : '');
        this.#basePath = this.#calculateBasePath(scriptUrl);
    }

    #basePath = "";
    #cache = new Map();

    setBasePath({ path }) {
        this.#basePath = path;
    }

    loadJavaScript(path) {
        const normalizedPath = this.#getNormalizedPath(path);
        
        if (this.#cache.has(normalizedPath)) {
            return this.#cache.get(normalizedPath);
        }

        const promise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = normalizedPath;
            script.onload = () => {
                // console.log("📦 AssetLoader: Loaded JS ->", script.src);
                resolve();
            };
            script.onerror = () => {
                this.#cache.delete(normalizedPath);
                reject(new Error(`Failed to load script: ${normalizedPath}`))
            };
            document.body.appendChild(script);
        });

        this.#cache.set(normalizedPath, promise);

        return promise;
    }

    loadStyle(path) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this.#getNormalizedPath(path); 

            // Resolve the Promise when the browser has fully loaded the CSS
            link.onload = () => {
                // console.log("📦 AssetLoader: Loaded CSS ->", link.href);
                resolve();
            };

            link.onerror = () => reject(new Error(`Failed to load CSS: ${path}`));

            document.head.appendChild(link);
        });
    }

    async loadMustacheHtmlToDomElementById({ targetId, pathHtml, data }) {
        await this.loadJavaScript('https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.1/mustache.min.js');

        const normalizedPath = this.#getNormalizedPath(pathHtml);
        const response = await fetch(normalizedPath);


        if (!response.ok) {
            throw new Error(`AssetLoader: Failed to load HTML -> ${response.statusText} , Path: ${normalizedPath}`);
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

        // console.log("📦 AssetLoader: Loaded HTML ->", normalizedPath);

        return renderedHtml;
    }
    
    #calculateBasePath(url) {
        if (url) {
            return url.substring(0, url.lastIndexOf('/') + 1);
        }
        return '';
    }
    
    #getNormalizedPath(path) {
        // If path is already absolute, leave it
        if (/^https?:\/\//i.test(path)) {
            return path;
        }
        
        // Combine base path with the requested file path
        // FEATURE_BASE_PATH should point to the correct folder
        return (typeof this.#basePath !== 'undefined' ? this.#basePath : '') + path.replace(/^\/+/, '');
    }
}
