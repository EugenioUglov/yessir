class DataStorageController {
    constructor(actionBlockController, hashObserver, dialogWindow) {
        this.actionBlockController = actionBlockController;
        this.hashObserver = hashObserver;
        this.view = new DataStorageView(dialogWindow);

        this.#setListeners();
    }

    #userStorage = localStorage['storage'];

    showDataStorageSettings() {
        this.view.showDataStorageSettings();
    }

    hideDatabaseDialog() {
        this.view.hideDatabaseDialog();
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

    #onRbStorageDatabaseChecked() {
        this.setUserStorage(this.getStorageNameEnum().database);
    }

    #onRbLocalStorageChoosed() {
        $('#autorization_log').text('');
        this.setUserStorage(this.getStorageNameEnum().localStorage);
        $('#authorization_form').hide();
    }


    #setListeners() {
        const that = this;

        // On click btn authorization.
        $('#btn_authorization')[0].addEventListener('click', function() {
            // console.log('btn_authorization click');
            const authorizationData = {
                nickname: $('#input_field_nickname').val(),
                password: $('#input_field_password').val()
            };

            localStorage['authorization'] = JSON.stringify(authorizationData);

            $('#autorization_log').text('');
            // $('#btn_authorization')[0].disabled = true;
            $('#authorization_form').hide();
            that.setUserStorage(that.getStorageNameEnum().database);
            window.scrollTo(0, 0);
            that.actionBlockController.showActionBlocksFromStorage();
        });

        // Selected radiobutton LocalStorage.
        $('#rb_storage_localStorage')[0].addEventListener('change', () => {
            that.#onRbLocalStorageChoosed();
        });
        
        // Selected radiobutton DB.
        $('#rb_storage_database_conainer')[0].addEventListener('change', function() {
            $('#authorization_form').show();
            //that.#onRbStorageDatabaseChecked();
        });

        this.view.bindClickBtnGetActionBlocksFromDatabase(onClickBtnRewriteOnDialogDatabaseManger);

        function onClickBtnRewriteOnDialogDatabaseManger() {
            $(".black_background").hide();
            that.actionBlockController.rewriteActionBlocks();
            yesSir.hashHandlers.openMain();
        }

        this.view.bindClickBtnUploadActionBlocksToDatabase(onClickBtnUploadActionBlocksToDatabase);
        
        function onClickBtnUploadActionBlocksToDatabase() {
            that.actionBlockController.save();
            yesSir.hashHandlers.openMain();
        }

        this.view.bindClickBtnCancelGetActionBlocksFromDatabase(onClickBtnCancelDialogDatabase);

        function onClickBtnCancelDialogDatabase() {
            $('#rb_storage_localStorage')[0].checked = true;
            that.#onRbLocalStorageChoosed();
            that.actionBlockController.showActionBlocksFromStorage();
            yesSir.hashHandlers.openMain();
        }
    }
}
