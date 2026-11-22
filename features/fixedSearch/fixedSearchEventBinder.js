class FixedSearchEventBinder {
    constructor({ controller }) {
        controller.bindClickBtnClear (() => {
            yesSir.hashHandlers.setHashMain();
        });

        controller.bindInput((request) => {
            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: false
            });
        });

        controller.bindKeyUp((request, clickedKeyCode) => {
            const isExecuteActionBlockByTitle = clickedKeyCode === yesSir.keyCodeByKeyName.enter ? true : false;

            yesSir.hashHandlers.setHashRequest({
                requestValue: request, 
                isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
            });
        });
    }
}