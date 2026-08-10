class SearchControllerEventBinder {
    constructor({ searchController, hashObserver, actionBlockController }) {
         
        searchController.clickBtnClearHandler = function() {
            yesSir.hashHandlers.openMain();
        };

        searchController.inputFieldEnterHandler = () => {
            const request = searchController.getTextFromMainInputField();

            // this.searchController.setHashRequest({
            //     requestValue: user_request, 
            //     isExecuteActionBlockByTitle: true
            // });
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

        searchController.keyUpRequestFieldHandler = function(request, clickedKeyCode) {
            const isExecuteActionBlockByTitle = clickedKeyCode === yesSir.keyCodeByKeyName.enter ? true : false;

            hashObserver.setPreviousHash(window.location.hash);

            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
            });
        };

        searchController.keypressInputFieldPlusTagsHandler = (event) => {
            const request = searchController.getTextFromMainInputField();

            actionBlockController.showActionBlocksByRequest(
                {
                    request: request, 
                    isExecuteActionBlockByTitle: false
                }
            );
        };

        searchController.keypressInputFieldMinusTagsHandler = (event) => {
            const request = searchController.getTextFromMainInputField();

            actionBlockController.showActionBlocksByRequest(
                {
                    request: request, 
                    isExecuteActionBlockByTitle: false
                }
            );
        };

        searchController.clickBtnSearchByTagsHandler = (userPlusTags, userMinusTags) => {
            actionBlockController.showActionBlocksByTags(userPlusTags, userMinusTags);
        }   
    }
}