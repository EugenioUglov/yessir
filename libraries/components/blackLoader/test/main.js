const projectAssetLoader = new ProjectAssetLoader();
(async function () {
    const blackLoaderBootstrapper = await BlackLoaderBootstrapper.create({ projectAssetLoader , targetId: 'blackLoader' });

    document.body.addEventListener('click', (event) => {
        // Проверяем, кликнули ли мы по интерактивному элементу.
        const target = event.target.closest('button, a');
        
        if (target) {
            // Включаем лоадер и блокировку
            blackLoaderBootstrapper.startLoading();
            
            // ИМИТАЦИЯ ЗАПРОСА (для теста): убираем лоадер через 3 секунды.
            // В реальном коде вы вызовите этот метод в resolve вашего Promise или колбэке аякса.
            setTimeout(() => {
                blackLoaderBootstrapper.stopLoading();
            }, 3000);
        }
    });
})();