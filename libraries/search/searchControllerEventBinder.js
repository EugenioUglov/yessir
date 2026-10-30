class SearchControllerEventBinder {
    constructor({ searchController, hashObserver, actionBlockController }) {
         
        searchController.bindClickBtnClear (() => {
            yesSir.hashHandlers.openMain();
        });

        searchController.bindInput((request) => {
            hashObserver.setPreviousHash(window.location.hash);

            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: false
            });
        });

        searchController.bindKeyUp((request, clickedKeyCode) => {
            const isExecuteActionBlockByTitle = clickedKeyCode === yesSir.keyCodeByKeyName.enter ? true : false;

            hashObserver.setPreviousHash(window.location.hash);

            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
            });
        });
    }
}