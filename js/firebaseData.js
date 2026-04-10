class FirebaseData {
    getActionBlocksMapStringAsync({inputUsername, inputPassword, onGetActionBlocks, onError}) {
        const that = this;
        const dbRef = firebase.database().ref();
    
        this.#isCorrectPasswordAsync({
            username: inputUsername,
            password: inputPassword, 
            onResult: isCorrect => {
                if (isCorrect) {
                    getActionBlocksByUsernameAsync({
                        username: inputUsername, 
                        onGetActionBlocks: result => onGetActionBlocks(result)
                    });
                }
                else {
                    onError('Invalid username or password');
                }
            },
            onError: error => { onError(error); }
        });

        function getActionBlocksByUsernameAsync({username, onGetActionBlocks}) {
            that.#getKeyActionBlocksOfUserAsync({
                username: username,
                onGet: actionBlocksKey => {
                    const actionBlocksRef = dbRef.child('actionBlocks').child(actionBlocksKey);

                    actionBlocksRef.on('value', (snapshot) => {
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

        function saveActonBlocks() {
            that.#getKeyActionBlocksOfUserAsync({
                username: inputUsername,
                onGet: actionBlocksKey => {
                    const newdata = {};
            
                    newdata[actionBlocksKey] = actionBlocksMapString;
                    
                    const actionBlocksRef = dbRef.child('actionBlocks');
    
                    actionBlocksRef.update(newdata).then(() => {
                        onSuccess();
                    }).catch(function(error) {
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