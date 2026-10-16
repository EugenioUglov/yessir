class ActionBlockWrapper {
    constructor({actionBlockController, loginPanelController, modalBoxController, mapDataStructure, logsController, dialogWindow, dateManager}) {
        this.#actionBlockController = actionBlockController;
        this.#loginPanelController = loginPanelController;
        this.#modalBoxController = modalBoxController;
        this.#mapDataStructure = mapDataStructure;
        this.#logsController = logsController;
        this.#dialogWindow = dialogWindow;
        this.#dateManager = dateManager;

        this.#actionBlockController.bindOnActionBlockShowedHandler((actionBlocks) => {
            this.#updateLogMessage(actionBlocks);
        });
    }

    #actionBlockController;
    #loginPanelController;
    #modalBoxController;
    #mapDataStructure;
    #logsController;
    #dialogWindow;
    #dateManager;

    saveActionBlocksToDatabase(actionBlocksMapString) {
      const that = this;
        
      if (actionBlocksMapString === undefined) {
          actionBlocksMapString = yesSir.mapDataStructure.getStringified(this.#actionBlockController.getActionBlocks());
      }

      this.#loginPanelController.show();

      // $(".btn-submit").click(function(e) {
      this.#loginPanelController.bindClickBtnSubmit({ 
        handler: () => {
          this.#modalBoxController.show({
              headerText:'Loading', 
              bodyText:'Data is being verified..'
          });

          const inputUsername = this.#loginPanelController.getUsername();
          const inputPassword = this.#loginPanelController.getPassword();
      
          that.#actionBlockController.saveActionBlocksToDatabaseAsync({
              inputUsername: inputUsername, 
              inputPassword: inputPassword,
              database: new FirebaseData(),
              actionBlocksMapString: actionBlocksMapString,
              onSuccess: () => {
                  this.#loginPanelController.hide();
      
                  this.#modalBoxController.show({
                      headerText:'Success', 
                      bodyText:'Data saved successfully to firebase database.'
                  });
          
                  setTimeout(() => {
                      this.#modalBoxController.hide();
                  }, "3000");
      
                  yesSir.hashHandlers.openMain();
              },
              onError: error => {
                  alert("Error! Data could not be saved. " + error);
                  this.#modalBoxController.hide();
              }
          });
        }
      });

      this.#loginPanelController.bindClickBtnClose({ 
        handler: () => {
          window.location.hash = HASH_NAME_ENUM.main;
        }
      });
    }

    getFromDatabase() {
        const that = this;

        this.#loginPanelController.show();

        this.#loginPanelController.bindClickBtnSubmit({
            handler: () => {
                this.#modalBoxController.show({headerText:'Loading', bodyText:'Data is being verified..'});

                const inputUsername = this.#loginPanelController.getUsername();
                const inputPassword = this.#loginPanelController.getPassword();

                this.#actionBlockController.getFromDatabase({
                    inputUsername: inputUsername,
                    inputPassword: inputPassword,
                    database: new FirebaseData(),
                    onGetActionBlocks: receivedActionBlocksMapString => {
                        if (receivedActionBlocksMapString) {
                            const actionBlocks = this.#mapDataStructure.getParsed(receivedActionBlocksMapString);

                            localStorage['username'] = inputUsername;

                            this.#actionBlockController.setActionBlocks(actionBlocks);

                            this.#modalBoxController.show({
                                headerText:'Success', 
                                bodyText:'Receiving data from firebase database has been completed.'
                            });
                    
                            setTimeout(() => {
                                this.#modalBoxController.hide();
                            }, "3000");
                            
                    
                            this.#loginPanelController.hide();
                        }
                
                        yesSir.hashHandlers.openMain();
                    },
                    onError: error => {
                        this.#modalBoxController.hide();
                        alert(error); 
                    }
                });
            }
        });

        this.#loginPanelController.bindClickBtnClose({ handler: () => {
            that.#loginPanelController.hide();

            window.location.hash = HASH_NAME_ENUM.main;
        }});
    }
    
    showActionBlocks(
        actionBlocksToShow,
        countActionBlocksToShowAtTime = 50
    ) {
        const that = this;

        this.#actionBlockController.showActionBlocks(
            actionBlocksToShow,
            countActionBlocksToShowAtTime
        );

        this.#updateLogMessage();

    }

    downloadFileWithActionBlocks = (actionBlocks) => {
        if (!actionBlocks) actionBlocks = this.#actionBlockController.getActionBlocks();
        const content = this.#mapDataStructure.getStringified(actionBlocks);
        const dateNow = this.#dateManager.getDateNow();
        const timeNow = this.#dateManager.getTimeNow();

        const dateText = dateNow + "-" + timeNow;

        // Set variable for name of the saving file with date and time.
        const fileName = "Action-Blocks " + dateText;
        const extension = ".json";

        download(content, fileName, extension);

        // Function to download data to a file
        function download(data, filename, type) {
            var file = new Blob([data], {type: type});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        }
    
        // !!!
        // this.fileManager.downloadFile(content, file_name, extension);
    };

    deleteAllActionBlocks() {
        const that = this;
        const textConfirmWindow =
            "Are you sure you want to delete ALL Action-Blocks?";

        function onClickOkConfirm() {
            this.#actionBlockController.deleteAllActionBlocks();
            yesSir.hashHandlers.setHashMain();
            window.location.reload();
            
            return;
        }

        function onClickCancelConfirm() {
            return;
        }

        this.#dialogWindow.confirmAlert(
            textConfirmWindow,
            onClickOkConfirm,
            onClickCancelConfirm
        );
    }
    
    #updateLogMessage(actionBlocksToShow) {
        let log = "Found " + actionBlocksToShow.length + " results";

        if (navigator.onLine === false) {
            log += " | Offline";
        }

        this.#logsController.showLog(log);
    }
}