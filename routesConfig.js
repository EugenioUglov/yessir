class RoutesConfig {
    constructor(HASH_NAME_ENUM, hashHandlers) {
        this.#hashHandlers = hashHandlers;
        this.#HASH_NAME_ENUM = HASH_NAME_ENUM;
    }

    #hashHandlers;
    #HASH_NAME_ENUM;

    // Карта маршрутов: хеш -> функция-обработчик (действие)
    getRoutesMap = () => Object.freeze({
        [this.#HASH_NAME_ENUM.main]: this.#hashHandlers.openMain,
        [this.#HASH_NAME_ENUM.actionBlock]: this.#hashHandlers.executeActionBlock,
        [this.#HASH_NAME_ENUM.request]: this.#hashHandlers.openByRequest,
        [this.#HASH_NAME_ENUM.createActionBlock]: this.#hashHandlers.createActionBlock,
        [this.#HASH_NAME_ENUM.createNote]: this.#hashHandlers.createNote,
        [this.#HASH_NAME_ENUM.createLink]: this.#hashHandlers.createLink,
        [this.#HASH_NAME_ENUM.editActionBlock]: this.#hashHandlers.editActionBlock,
        [this.#HASH_NAME_ENUM.saveToDatabase]: this.#hashHandlers.saveToDatabase,
        [this.#HASH_NAME_ENUM.getFromDatabase]: this.#hashHandlers.getFromDatabase,
        [this.#HASH_NAME_ENUM.mainPrevious]: this.#hashHandlers.openMainPrevious,
    });
}