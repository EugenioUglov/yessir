class RoutesConfig {
    constructor(pageHandlers) {
        this.#pageHandlers = pageHandlers;
        console.log("RoutesConfig initialized with pageHandlers:", this.#pageHandlers);
    }

    #pageHandlers;

    // Перечисление имен страниц (ваш PAGE_NAME_ENUM)
    PAGE_NAME = Object.freeze({
        main: "main",
        notes: "notes",
        settings: "settings"
    });

    // Карта маршрутов: хеш -> функция-обработчик (действие)
    getRoutesMap = () => Object.freeze({
        [this.PAGE_NAME.main]: this.#pageHandlers.openMain,
        [this.PAGE_NAME.notes]: (param) => {
            // param будет объектом, например: { id: "123" }
            if (param.id) {
                console.log(`Открываем заметку с ID: ${param.id}`);
                // Загружаем заметку с бэкенда...
            } else {
                console.log("Список всех заметок");
            }
        }
    });

    // Дефолтная страница, если хеш не найден или пустой
    DEFAULT_PAGE = this.PAGE_NAME.main;
}