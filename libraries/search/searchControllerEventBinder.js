class SearchControllerEventBinder {
    constructor({ searchController, hashObserver, actionBlockController }) {
         
        searchController.clickBtnClearHandler = function() {
            yesSir.hashHandlers.openMain();
        };

        searchController.inputFieldEnterHandler = () => {
            const request = searchController.getText();

            let isExecuteActionBlockByTitle = true;

            hashObserver.setPreviousHash(window.location.hash);

            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
            });
        };

        searchController.changeInputFieldHandler = function(request) {
            hashObserver.setPreviousHash(window.location.hash);

            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: false
            });
        };

        searchController.keyUpHandler = function(request, clickedKeyCode) {
            const isExecuteActionBlockByTitle = clickedKeyCode === yesSir.keyCodeByKeyName.enter ? true : false;

            hashObserver.setPreviousHash(window.location.hash);

            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
            });
        };
    }
}