class ModuleLoader {
    /**
     * Загружает HTML-шаблон по пути
     * @param {string} url - Full or relative path to the file
     * @returns {Promise<string>}
     */
    static async loadTemplate(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${url} (Status: ${response.status})`);
        }
        return response.text();
    }

    static loadScript(url) {
        return new Promise((resolve, reject) => {
            // Проверяем, может этот скрипт уже загружен?
            if (document.querySelector(`script[src="${url}"]`)) {
                return resolve();
            }

            const script = document.createElement('script');
            script.src = url;
            
            // Когда скрипт скачался и выполнился, резолвим промис
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Не удалось загрузить скрипт: ${url}`));

            document.head.appendChild(script);
        });
    }

    static loadStyle(url) {
        return new Promise((resolve, reject) => {
            // Проверяем, может этот CSS уже подключен?
            if (document.querySelector(`link[href="${url}"]`)) {
                return resolve();
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;

            // Когда стили полностью загрузились и применились
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Не удалось загрузить стили: ${url}`));

            document.head.appendChild(link);
        });
    }
}