import { scripts } from './scriptPaths.js';

(function() {
    // Функция для последовательной загрузки (важно для зависимостей!)
    function loadScripts(index) {
        if (index < scripts.length) {
            const script = document.createElement('script');
            script.src = scripts[index];
            script.async = false; // Сохраняем порядок выполнения
            script.onload = () => loadScripts(index + 1);
            document.body.appendChild(script);
        } else {
            // Инициализация пакетов после загрузки всех скриптов
            // console.log("All scripts loaded. Initializing packages...");
        }
    }

    loadScripts(0);
})();