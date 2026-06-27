class SearchControllerEventBinder {
    constructor({ searchController, hashHandler, actionBlockService }) {
         
        searchController.clickBtnClearHandler = function() {
            hashHandler.openMainPage();
        };

        searchController.inputFieldEnterHandler = () => {
            const request = searchController.getTextFromMainInputField();

            // this.searchController.setHashRequest({
            //     requestValue: user_request, 
            //     isExecuteActionBlockByTitle: true
            // });
            let isExecuteActionBlockByTitle = true;

            hashHandler.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
            });
        };

        searchController.changeInputFieldHandler = function(request) {
            hashHandler.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: false
            });
        };

        searchController.keyUpRequestFieldHandler = function(request, clickedKeyCode) {
            const isExecuteActionBlockByTitle = clickedKeyCode === yesSir.keyCodeByKeyName.enter ? true : false;

            hashHandler.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
            });
        };

        searchController.keypressInputFieldPlusTagsHandler = (event) => {
            const request = searchController.getTextFromMainInputField();

            actionBlockService.showActionBlocksByRequest(
                {
                    request: request, 
                    isExecuteActionBlockByTitle: false
                }
            );
        };

        searchController.keypressInputFieldMinusTagsHandler = (event) => {
            const request = searchController.getTextFromMainInputField();

            actionBlockService.showActionBlocksByRequest(
                {
                    request: request, 
                    isExecuteActionBlockByTitle: false
                }
            );
        };

        searchController.clickBtnSearchByTagsHandler = (userPlusTags, userMinusTags) => {
            actionBlockService.showActionBlocksByTags(userPlusTags, userMinusTags);
        }   
    }
}