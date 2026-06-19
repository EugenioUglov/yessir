class HashHelper {
    #hashPrevious = '';

    /**
     * Сохраняет предыдущий хэш.
     * @param {string} [newHash] - Если не передан, берет текущий из адреса.
     * @returns {boolean} - Изменился ли хэш по сравнению с прошлым сохраненным.
     */
    setValueForPreviousHash(newHash) {
        // Если ничего не передали, берем текущий хэш из строки браузера
        const targetHash = newHash !== undefined ? newHash : window.location.hash;

        // Если он совпадает с тем, что уже лежит в памяти — ничего не делаем
        if (targetHash === this.#hashPrevious) {
            return false;
        }

        this.#hashPrevious = targetHash;
        return true;
    }

    /**
     * Возвращает пользователя на сохраненный хэш.
     */
    setPreviousHash() {
        if (this.#hashPrevious) {
            window.location.hash = this.#hashPrevious;
        }
    }

    /**
     * Возвращает очищенный хэш в нижнем регистре (без знака #)
     */
    getNormalizedCurrentHash() {
        // Убираем '#' в начале, если он есть, для более удобного роутинга
        return window.location.hash.replace(/^#/, '').toLowerCase();
    }

    /**
     * Парсит хэш-параметры в удобный объект.
     * Безопасно обрабатывает пустые строки и спецсимволы.
     */
    getConvertedHashToObject() {
        const hash = window.location.hash.replace(/^#/, '');
        if (!hash) return {};

        // Используем встроенный и надежный URLSearchParams вместо хрупкого split()
        const params = new URLSearchParams(hash);
        return Object.fromEntries(params.entries());
    }
}