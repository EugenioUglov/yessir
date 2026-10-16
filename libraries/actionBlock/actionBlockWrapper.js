class ActionBlockWrapper {
    constructor({actionBlockController, loginPanelController, modalBoxController}) {
        this.#actionBlockController = actionBlockController;
        this.#loginPanelController = loginPanelController;
        this.#modalBoxController = modalBoxController;
    }

    #actionBlockController;
    #loginPanelController;
    #modalBoxController;

    saveActionBlocksToDatabase(actionBlocksMapString) {
      const that = this;
      const firebaseData = new FirebaseData();
        
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

          const inputUsername = $('.input-username').val();
          const inputPassword = $('.input-password').val();
      
          that.#actionBlockController.saveActionBlocksToDatabaseAsync({
              inputUsername: inputUsername, 
              inputPassword: inputPassword,
              database: firebaseData,
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

      yesSir.loginPanelController.bindClickBtnClose({ 
        handler: () => {
          window.location.hash = HASH_NAME_ENUM.main;
        }
      });
    }
}