class ActionBlockWrapper {
    constructor({actionBlockController, loginPanelController, modalBoxController, mapDataStructure, logsController}) {
        this.#actionBlockController = actionBlockController;
        this.#loginPanelController = loginPanelController;
        this.#modalBoxController = modalBoxController;
        this.#mapDataStructure = mapDataStructure;
        this.#logsController = logsController;

        this.#actionBlockController.bindOnActionBlockShowedHandler(() => {
            this.#updateLogMessage();
        });
    }

    #actionBlockController;
    #loginPanelController;
    #modalBoxController;
    #mapDataStructure;
    #logsController;

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

    
    #updateLogMessage() {
        let log = "Found " + actionBlocksToShow.length + " results";

        if (navigator.onLine === false) {
            log += " | Offline";
        }

        that.#logsController.showLog(log);
    }
}