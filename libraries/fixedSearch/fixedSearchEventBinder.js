class FixedSearchEventBinder {
    constructor({ searchController }) {
        searchController.bindClickBtnClear (() => {
            yesSir.hashHandlers.setHashMain();
        });

        searchController.bindInput((request) => {
            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: false
            });
        });

        searchController.bindKeyUp((request, clickedKeyCode) => {
            const isExecuteActionBlockByTitle = clickedKeyCode === yesSir.keyCodeByKeyName.enter ? true : false;

            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
            });
        });
    }
}