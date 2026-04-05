class FirebaseData {
    #currentActionBlocksRef = null;
    #lastSerializedData = ""; 

    /**
     * ЗАГРУЗКА И ПОДПИСКА (REALTIME)
     */
    getActionBlocksMapStringAsync({inputUsername, inputPassword, onGetActionBlocks, onError}) {
        const that = this;
        const dbRef = firebase.database().ref();
    
        this.#isCorrectPasswordAsync({
            username: inputUsername,
            password: inputPassword, 
            onResult: isCorrect => {
                if (isCorrect) {
                    setupListener();
                } else {
                    onError('Invalid username or password');
                }
            },
            onError: error => { onError(error); }
        });

        function setupListener() {
            that.#getKeyActionBlocksOfUserAsync({
                username: inputUsername,
                onGet: actionBlocksKey => {
                    if (actionBlocksKey === null || actionBlocksKey === undefined) return;

                    const newRef = dbRef.child('actionBlocks').child(actionBlocksKey);

                    // 1. ПРОВЕРКА: Если мы уже слушаем ЭТУ ЖЕ ветку, не надо создавать новый слушатель
                    if (that.#currentActionBlocksRef && that.#currentActionBlocksRef.toString() === newRef.toString()) {
                        console.log("Слушатель уже активен для этого пути, дубликат не создаем.");
                        return;
                    }

                    // 2. ОЧИСТКА: Если мы переключаемся на другой путь, гасим старый слушатель абсолютно везде
                    if (that.#currentActionBlocksRef) {
                        console.log("Удаляем старый слушатель...");
                        that.#currentActionBlocksRef.off(); 
                    }

                    that.#currentActionBlocksRef = newRef;

                    // 3. УСТАНОВКА: Теперь создаем только ОДИН слушатель
                    console.log("Устанавливаем свежий слушатель для:", actionBlocksKey);
                    that.#currentActionBlocksRef.on('value', (snapshot) => {
                        const data = snapshot.val();
                        const serialized = JSON.stringify(data);

                        if (serialized === that.#lastSerializedData) return;

                        console.log("Данные из облака обновились!", data);
                        that.#lastSerializedData = serialized;
                        onGetActionBlocks(data);
                    });
                }
            });
        }
    }

    /**
     * СОХРАНЕНИЕ
     */
    saveActionBlocksAsync({inputUsername, inputPassword, actionBlocksMapString, onSuccess, onError}) {
        const that = this;
        const dbRef = firebase.database().ref();

        // 1. Проверяем пароль
        this.#isCorrectPasswordAsync({
            username: inputUsername,
            password: inputPassword, 
            onResult: isCorrect => {
                if (isCorrect) {
                    executeSave();
                } else {
                    onError('Invalid username or password');
                }
            },
            onError: error => { onError(error); }
        });

        function executeSave() {
            // ОБЯЗАТЕЛЬНО: Обновляем локальный кеш данных ПЕРЕД отправкой, 
            // чтобы наш собственный слушатель проигнорировал это обновление.
            that.#lastSerializedData = JSON.stringify(actionBlocksMapString);

            that.#getKeyActionBlocksOfUserAsync({
                username: inputUsername,
                onGet: actionBlocksKey => {
                    if (actionBlocksKey === null || actionBlocksKey === undefined) {
                        onError("Key not found");
                        return;
                    }

                    const updates = {};
                    updates[`/actionBlocks/${actionBlocksKey}`] = actionBlocksMapString;
                    
                    // Используем update на корневом уровне для скорости
                    dbRef.update(updates)
                        .then(() => {
                            console.log("Сохранение успешно");
                            onSuccess();
                        })
                        .catch(error => onError(error));
                }
            });
        }
    }

    /**
     * ПОЛУЧЕНИЕ КЛЮЧА (С защитой от "0" и массивов)
     */
    #getKeyActionBlocksOfUserAsync({username, onGet}) {
        const dbRef = firebase.database().ref();
        const userRelRef = dbRef.child('userActionBlocksRelation').child(username);
        
        userRelRef.once("value").then(snapshot => {
            const val = snapshot.val();
            let key = null;

            if (val !== null) {
                // Если Firebase вернул массив (числовые индексы)
                if (Array.isArray(val)) {
                    const found = val.find(item => item && item.hasOwnProperty('actionBlocksKey'));
                    key = found ? found.actionBlocksKey : null;
                } 
                // Если нормальный объект
                else if (val.hasOwnProperty('actionBlocksKey')) {
                    key = val.actionBlocksKey;
                }
            }
            onGet(key);
        }).catch(() => onGet(null));
    }

    /**
     * ПРОВЕРКА ПАРОЛЯ
     */
    #isCorrectPasswordAsync({username, password, onResult, onError}) {
        const dbRef = firebase.database().ref();
        const hashPassword = new HashPassword(); // Убедитесь, что этот класс подключен

        const getUserData = (un) => {
            if (!un) return Promise.reject('Empty username');
            return dbRef.child('user').child(un).once("value").then(s => s.val());
        };

        getUserData(username).then(userData => {
            if (!userData) {
                onError('Invalid username');
                return;
            }
            if (hashPassword.getHashedPassword(password) === userData.password) {
                onResult(true);
            } else {
                onResult(false);
            }
        }).catch(e => onError(e));
    }

    /**
     * ОЧИСТКА (вызывать при логауте)
     */
    destroy() {
        if (this.#currentActionBlocksRef) {
            this.#currentActionBlocksRef.off();
            this.#currentActionBlocksRef = null;
        }
    }
}