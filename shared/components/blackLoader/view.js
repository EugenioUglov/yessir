class BlackLoaderView {
    startLoading() {
        // Включаем лоадер и блокировку
        document.body.classList.add('is-loading');
    }

    stopLoading() {
        document.body.classList.remove('is-loading');
    }
}