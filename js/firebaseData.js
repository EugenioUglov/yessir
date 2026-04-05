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
            onGet(val ? val.actionBlocksKey : null);
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