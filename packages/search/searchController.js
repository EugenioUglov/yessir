class SearchController {
    constructor(searchService, actionBlockService, hashService, textManager, keyCodeByKeyName) {
        this.searchService = searchService;
        this.actionBlockService = actionBlockService;
        this.hashService = hashService;
        this.textManager = textManager;
        this.keyCodeByKeyName = keyCodeByKeyName;

        this.#setEventListeners();
        this.#bindViewEvenets();
    }

    onEnter = () => {
        this.searchService.view.setTextColorInInputField('black');
        const user_request = this.searchService.view.getTextFromMainInputField();
        
        // this.searchService.setHashRequest({
        //     requestValue: user_request, 
        //     isExecuteActionBlockByTitle: true
        // });

        let isExecuteActionBlockByTitle = true;

        this.#searchActionBlocks(user_request, isExecuteActionBlockByTitle);
    }

    onClickBtnClear = () => {
        this.searchService.view.clear();
        this.hashService.openMainPage();
    }


    #onKeypressInputFieldPlusTags = (event) => {
        window.scrollTo(0, 0);
        // this.actionBlockService.showActionBlocksByTags(
        //     this.searchService.view.getPlusTags(), 
        //     this.searchService.view.getMinusTags()
        // );

        this.actionBlockService.showActionBlocksByRequest(this.searchService.view.getRequest(), false);
    }

    #onKeypressInputFieldMinusTags = (event) => {
        window.scrollTo(0, 0);
        // this.actionBlockService.showActionBlocksByTags(this.searchService.view.getPlusTags(), 
        //     this.searchService.view.getMinusTags());

        this.actionBlockService.showActionBlocksByRequest(this.searchService.view.getRequest(), false);
    }

    #setEventListeners() {
        const that = this;

        $(document).keyup(function(event) {
            if (event.code == 'Slash') {
                that.searchService.view.focus();
            }
        });
    }

    #bindViewEvenets() {
        const that = this;

        const onKeyUpRequestField = (request, clicked_keyCode) => {
            let is_execute_actionBlock_by_title = false;

            if (clicked_keyCode === that.keyCodeByKeyName.enter) {
                is_execute_actionBlock_by_title = true;
            } else {
                is_execute_actionBlock_by_title = false;
            }

            this.#searchActionBlocks(request, is_execute_actionBlock_by_title);
        };

        const onChangeInputRequestField = (request, clicked_keyCode) => {
            let isExecuteActionBlockByTitle = false;

            if (clicked_keyCode === that.keyCodeByKeyName.enter) {
                isExecuteActionBlockByTitle = true;
            } else {
                isExecuteActionBlockByTitle = false;
            }

            const timeBeforeSearch = new Date().getTime();

            this.#searchActionBlocks(request, isExecuteActionBlockByTitle);

            const timeAfterSearch = new Date().getTime();

            const timeSpentForSearch = timeAfterSearch - timeBeforeSearch;

            // console.log('timeSpentForSearch: ', timeSpentForSearch/1000 + ' seconds');
        };

        function onClickBtnSearchByTags(user_plus_tags, user_minus_tags) {
            window.scrollTo(0, 0);
            that.actionBlockService.showActionBlocksByTags(user_plus_tags, user_minus_tags);
        }

        this.searchService.view.bindClickBtnClearRequestField(this.onClickBtnClear);
        this.searchService.view.bindClickBtnEnterRequest(this.onEnter);
        // this.searchService.view.bindKeyUpRequestField(onKeyUpRequestField);
        this.searchService.view.bindChangeInputRequestField(onChangeInputRequestField);
        this.searchService.view.bindKeypressInputFieldPlusTags(this.#onKeypressInputFieldPlusTags);
        this.searchService.view.bindKeypressInputFieldMinusTags(this.#onKeypressInputFieldMinusTags);
        this.searchService.view.bindClickBtnSearchByTags((user_plus_tags, user_minus_tags) => onClickBtnSearchByTags(user_plus_tags, user_minus_tags));
    }

    #searchActionBlocks(request, isExecuteActionBlockByTitle = false) {
        this.hashService.setHashRequest({
            requestValue: request, 
            isExecuteActionBlockByTitle: isExecuteActionBlockByTitle
        });
    }
}