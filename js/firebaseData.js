class FirebaseData {
    #currentActionBlocksRef = null;
    #isSaving = false;

    /**
     * Загружает данные и вешает ПОСТОЯННЫЙ слушатель
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
                    if (!actionBlocksKey) {
                        onError("Action blocks key not found for this user");
                        return;
                    }

                    // Если уже есть активный слушатель — снимаем его
                    if (that.#currentActionBlocksRef) {
                        that.#currentActionBlocksRef.off();
                    }

                    that.#currentActionBlocksRef = dbRef.child('actionBlocks').child(actionBlocksKey);

                    // Устанавливаем постоянный слушатель
                    that.#currentActionBlocksRef.on('value', (snapshot) => {
                        // КРИТИЧНО: Если мы сами сейчас сохраняем, игнорируем "эхо" от сервера
                        if (that.#isSaving) return;

                        const actionBlocksMapString = snapshot.val();
                        onGetActionBlocks(actionBlocksMapString);
                    }, (error) => {
                        onError(error);
                    });
                }
            });
        }
    }

    /**
     * Сохраняет данные в базу
     */
    saveActionBlocksAsync({inputUsername, inputPassword, actionBlocksMapString, onSuccess, onError}) {
        const that = this;
        const dbRef = firebase.database().ref();

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
            that.#isSaving = true; // Включаем блокировку слушателя

            that.#getKeyActionBlocksOfUserAsync({
                username: inputUsername,
                onGet: actionBlocksKey => {
                    const updateData = {};
                    updateData[actionBlocksKey] = actionBlocksMapString;
                    
                    const actionBlocksRef = dbRef.child('actionBlocks');
    
                    actionBlocksRef.update(updateData)
                        .then(() => {
                            that.#isSaving = false; // Отключаем блокировку
                            onSuccess();
                        })
                        .catch(function(error) {
                            that.#isSaving = false; // Снимаем блокировку даже при ошибке
                            onError(error);
                        });
                }
            });
        }
    }

    #getKeyActionBlocksOfUserAsync({username, onGet}) {
        const dbRef = firebase.database().ref();
        const userRelRef = dbRef.child('userActionBlocksRelation').child(username);
        
        userRelRef.once("value").then(function(snapshot) {
            const val = snapshot.val();
            let key = null;

            // Проверяем, что данные вообще пришли
            if (val !== null) {
                // Если Firebase вернул массив (числовые ключи 0, 1, 2...)
                if (Array.isArray(val)) {
                    // Ищем первый элемент, у которого ЕСТЬ свойство actionBlocksKey (даже если оно равно 0)
                    const found = val.find(item => item && item.hasOwnProperty('actionBlocksKey'));
                    key = found ? found.actionBlocksKey : null;
                } 
                // Если это обычный объект { actionBlocksKey: 0, ... }
                else if (val.hasOwnProperty('actionBlocksKey')) {
                    key = val.actionBlocksKey;
                }
            }

            // КЛЮЧЕВОЙ МОМЕНТ: 
            // Мы НЕ пишем if (key), потому что if (0) даст false.
            // Мы проверяем на строгое отсутствие данных (null или undefined).
            if (key !== null && key !== undefined) {
                onGet(key);
            } else {
                // Если мы здесь, значит в ветке пользователя реально пусто
                console.error("Ключ не найден в объекте:", val);
                // Вызываем onError или передаем null
                onGet(null); 
            }
        }).catch(error => {
            console.error("Ошибка при чтении из Firebase:", error);
            onGet(null);
        });
    }

    #isCorrectPasswordAsync({username, password, onResult, onError}) {
        const dbRef = firebase.database().ref();
        const hashPassword = new HashPassword(); // Предполагается, что этот класс определен выше

        const getUserData = ({username, onGet, onError}) => {
            if (!username) {
                onError('Username is empty');
                return;
            }

            const userRef = dbRef.child('user').child(username);
            userRef.once("value").then(snapshot => {
                onGet(snapshot.val());
            }).catch(e => onError(e));
        };

        getUserData({
            username: username, 
            onGet: userData => {
                if (!userData) {
                    onError('User not found');
                    return;
                }
    
                if (hashPassword.getHashedPassword(password) === userData.password) {
                    onResult(true);
                } else {
                    onResult(false);
                }
            },
            onError: onError
        });
    }

    // Метод для ручной очистки слушателя (например, при логауте)
    destroy() {
        if (this.#currentActionBlocksRef) {
            this.#currentActionBlocksRef.off();
            this.#currentActionBlocksRef = null;
        }
    }
}