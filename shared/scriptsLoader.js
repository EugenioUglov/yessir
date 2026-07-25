// shared/scriptsLoader.js
export function loadScriptsSequence(scripts, onComplete) {
    function loadNext(index) {
        if (index < scripts.length) {
            const script = document.createElement('script');
            script.src = scripts[index];
            script.async = false; // Сохраняем порядок выполнения
            script.onload = () => loadNext(index + 1);
            script.onerror = () => {
                console.error(`Ошибка загрузки скрипта: ${scripts[index]}`);
                loadNext(index + 1);
            };
            document.body.appendChild(script);
        } else {
            if (typeof onComplete === 'function') {
                onComplete();
            }
        }
    }

    loadNext(0);
}