class DataStorageService {
    constructor(dialogWindow) {
        this.view = new DataStorageView(dialogWindow);
    }

    #userStorage = localStorage['storage'];

    showDataStorageSettings() {
        this.view.showDataStorageSettings();
    }

    getStorageNameEnum() {
        const STORAGE_NAME_ENUM = {
            localStorage : 'localStorage',
            database : 'database'
        };

        return STORAGE_NAME_ENUM;
    }

    getUserStorage() {
        if (this.#userStorage === undefined) {
            this.#userStorage = this.getStorageNameEnum().localStorage;
        }
        
        return this.#userStorage;
    }

    setUserStorage(storage) {
        this.#userStorage = storage;
        localStorage['storage'] = storage;

        if (storage === this.getStorageNameEnum().database) {
            $('#rb_storage_database')[0].checked = true;
            $('#authorization_form').show();
        }
    }
}