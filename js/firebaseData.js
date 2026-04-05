class FirebaseData {
    // Храним ссылку на активный узел, чтобы иметь возможность сделать .off()
    #currentRef = null;
    // Храним последние данные, чтобы не перерисовывать UI при собственных сохранениях
    #lastSerializedData = "";

    /**
     * ЗАГРУЗКА И ПОДПИСКА
     */
    getActionBlocksMapStringAsync({inputUsername, inputPassword, onGetActionBlocks, onError}) {
        const that = this;
        
        this.#isCorrectPasswordAsync({
            username: inputUsername,
            password: inputPassword, 
            onResult: isCorrect => {
                if (isCorrect) {
                    this.#setupRealtimeListener(inputUsername, onGetActionBlocks, onError);
                } else {
                    onError('Invalid username or password');
                }
            },
            onError: error => onError(error)
        });
    }

    #setupRealtimeListener(username, onGetActionBlocks, onError) {
        const that = this;
        const dbRef = firebase.database().ref();

        this.#getKeyActionBlocksOfUserAsync({
            username: username,
            onGet: actionBlocksKey => {
                if (actionBlocksKey === null || actionBlocksKey === undefined) {
                    onError("Action blocks key not found");
                    return;
                }

                // КРИТИЧЕСКИЙ МОМЕНТ: Убиваем абсолютно все слушатели на старом пути
                if (this.#currentRef) {
                    console.log("--- Отключаем старый слушатель ---");
                    this.#currentRef.off(); 
                }

                // Запоминаем новый путь
                this.#currentRef = dbRef.child('actionBlocks').child(actionBlocksKey);

                console.log("--- Устанавливаем ОДИН свежий слушатель ---");
                this.#currentRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    const serialized = JSON.stringify(data);

                    // Если данные не изменились (пришло "эхо" нашего сохранения) — игнорируем
                    if (serialized === this.#lastSerializedData) {
                        return;
                    }

                    console.log("Данные из облака обновились!");
                    this.#lastSerializedData = serialized;
                    onGetActionBlocks(data);
                }, (err) => {
                    if (onError) onError(err);
                });
            }
        });
    }

    /**
     * СОХРАНЕНИЕ
     */
    saveActionBlocksAsync({inputUsername, inputPassword, actionBlocksMapString, onSuccess, onError}) {
        const that = this;

        this.#isCorrectPasswordAsync({
            username: inputUsername,
            password: inputPassword, 
            onResult: isCorrect => {
                if (isCorrect) {
                    // 1. Сразу помечаем данные как "уже виденные", чтобы .on() их проигнорировал
                    this.#lastSerializedData = JSON.stringify(actionBlocksMapString);

                    this.#getKeyActionBlocksOfUserAsync({
                        username: inputUsername,
                        onGet: actionBlocksKey => {
                            if (actionBlocksKey === null || actionBlocksKey === undefined) return;

                            const updates = {};
                            updates[actionBlocksKey] = actionBlocksMapString;
                            
                            firebase.database().ref('actionBlocks').update(updates)
                                .then(() => {
                                    if (onSuccess) onSuccess();
                                })
                                .catch(err => onError(err));
                        }
                    });
                } else {
                    onError('Invalid password');
                }
            },
            onError: error => onError(error)
        });
    }

    /**
     * ПРИВАТНЫЕ МЕТОДЫ (ВСПОМОГАТЕЛЬНЫЕ)
     */
    #getKeyActionBlocksOfUserAsync({username, onGet}) {
        firebase.database().ref('userActionBlocksRelation').child(username)
            .once("value")
            .then(snapshot => {
                const val = snapshot.val();
                let key = null;
                if (val !== null) {
                    if (Array.isArray(val)) {
                        const found = val.find(item => item && item.hasOwnProperty('actionBlocksKey'));
                        key = found ? found.actionBlocksKey : null;
                    } else {
                        key = val.actionBlocksKey;
                    }
                }
                onGet(key);
            })
            .catch(() => onGet(null));
    }

    #isCorrectPasswordAsync({username, password, onResult, onError}) {
        const hashPassword = new HashPassword();
        firebase.database().ref('user').child(username).once("value")
            .then(snapshot => {
                const userData = snapshot.val();
                if (!userData) {
                    onError('Invalid username');
                    return;
                }
                onResult(hashPassword.getHashedPassword(password) === userData.password);
            })
            .catch(e => onError(e));
    }
}