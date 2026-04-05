class FirebaseData {
    // 1. Добавляем переменные для контроля состояния
    #currentActionBlocksRef = null;
    #isSaving = false;

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
                    // 2. ОТПИСЫВАЕМСЯ от старого пути, если он был
                    if (that.#currentActionBlocksRef) {
                        that.#currentActionBlocksRef.off();
                    }

                    that.#currentActionBlocksRef = dbRef.child('actionBlocks').child(actionBlocksKey);

                    // 3. Устанавливаем слушатель
                    that.#currentActionBlocksRef.on('value', (snapshot) => {
                        // 4. ГЛАВНОЕ: Если мы сами сейчас сохраняем, игнорируем это обновление
                        if (that.#isSaving) return;

                        const actionBlocksMapString = snapshot.val();
                        onGetActionBlocks(actionBlocksMapString);
                    });
                }
            });
        }
    }

    saveActionBlocksAsync({inputUsername, inputPassword, actionBlocksMapString, onSuccess, onError}) {
        const that = this;
        const dbRef = firebase.database().ref();

        this.#isCorrectPasswordAsync({
            username: inputUsername,
            password: inputPassword, 
            onResult: isCorrect => {
                if (isCorrect) {
                    saveActonBlocks();
                }
                else {
                    onError('Invalid username or password');
                }
            },
            onError: error => { onError(error); }
        });

        // Внутри функции сохранения:
        function saveActonBlocks() {
            that.#isSaving = true; // БЛОКИРУЕМ входящие обновления

            that.#getKeyActionBlocksOfUserAsync({
                username: inputUsername,
                onGet: actionBlocksKey => {
                    const newdata = {};
                    newdata[actionBlocksKey] = actionBlocksMapString;
                    const dbRef = firebase.database().ref();
                    
                    dbRef.child('actionBlocks').update(newdata)
                        .then(() => {
                            that.#isSaving = false; // РАЗБЛОКИРУЕМ
                            onSuccess();
                        })
                        .catch(error => {
                            that.#isSaving = false;
                            onError(error);
                        });
                }
            });
        }
    }


    #getKeyActionBlocksOfUserAsync({username, onGet}) {
        const dbRef = firebase.database().ref();

        const userActionBlocksRelationRef = dbRef.child('userActionBlocksRelation').child(username);
        
        userActionBlocksRelationRef.once("value").then(function(snapshot) {
            const intendedValue = snapshot.val();
            onGet(intendedValue.actionBlocksKey);
        });
    }

    #isCorrectPasswordAsync({username, password, onResult, onError}) {
        const dbRef = firebase.database().ref();
        const hashPassword = new HashPassword();

        getUserData({
            username: username, 
            onGet: userData => {
                if (userData === null) {
                    onError('Invalid username');
                    return false;
                }
    
                if (hashPassword.getHashedPassword(password) === userData.password) {
                    onResult(true);
                }
                else {
                    onResult(false);
                }
            },
            onError: onError
        });

        function getUserData({username, onGet, onError}) {
            if ( ! username) {
                onError('Invalid username');
                return false;
            }

            const userRef = dbRef.child('user').child(username);
            
            userRef.once("value").then(function(snapshot) {
                const intendedValue = snapshot.val();
                onGet(intendedValue);
            });
        }
    }
}