class HashHandlers {
    constructor(HASH_NAME_ENUM, searchController, actionBlockController, scrollController, textManager) {
        this.#HASH_NAME_ENUM = HASH_NAME_ENUM;
        this.#searchController = searchController;
        this.#actionBlockController = actionBlockController;
        this.#scrollController = scrollController;
        this.#textManager = textManager;
    }

    #searchController;
    #actionBlockController
    #scrollController;
    #textManager;
    #HASH_NAME_ENUM;


    setHashRequest = (
        parameter = {
            requestValue: "",
            isExecuteActionBlockByTitle: false,
            isListenText: false,
        }
    ) => {
        const DEFAULT_PARAMETER = {
            requestValue: "",
            isExecuteActionBlockByTitle: false,
            isListenText: false,
        };

        const requestValue =
            parameter.requestValue != undefined
                ? parameter.requestValue
                : DEFAULT_PARAMETER.requestValue;

        const isExecuteActionBlockByTitle =
            parameter.isExecuteActionBlockByTitle != undefined
                ? parameter.isExecuteActionBlockByTitle
                : DEFAULT_PARAMETER.isExecuteActionBlockByTitle;

        const isListenText =
            parameter.isListenText != undefined
                ? parameter.isListenText
                : DEFAULT_PARAMETER.isListenText;

        if (requestValue === undefined || requestValue === "") {
            this.openMain();
        }

        // this.#setCurrentPageName(this.#HASH_NAME_ENUM.request);

        const newHash =
            this.#HASH_NAME_ENUM.request +
            "=" +
            requestValue +
            (isExecuteActionBlockByTitle
                ? "&" + "executebytitle" : "") +
            (isListenText ? "&" + "listen" : "");

        window.location.hash = newHash;
    };

    openMain = (queryParams) => {
        if ('filemanager' in queryParams) {
            yesSir.domElementManager.hideShowedElements();

            $(".btn_upload_actionBlocks").on("change", (event) => {
                yesSir.fileManager.uploadFile(onFileLoaded);

                function onFileLoaded(content_of_file) {
                    yesSir.actionBlockController.saveActionBlocksFromFile(content_of_file);

                    // Give possibility to load the same file again.
                    $(".btn_upload_actionBlocks").value = "";

                    window.location.hash = "main";
                }
            });

            $(".btn_download_actionBlocks")[0].addEventListener("click", () => {
                yesSir.actionBlockController.downloadFileWithActionBlocks();
            });

            $("#elements_for_file_manager").show();

            this.#scrollController.setPositionTop();
        } else {
            this.#searchController.clearInputField();

            if (this.#actionBlockController.model.getActionBlocks().size > 0) {
                this.#actionBlockController.view.onOpenMainPageWithActionBlocks();
                this.#actionBlockController.showActionBlocks();
            } else {
                this.#actionBlockController.view.onOpenMainPageWithoutActionBlocks();
            }

            this.#actionBlockController.view.onShowMainPage();
            this.#scrollController.setPositionTop();
        }
    }

    executeActionBlock = (queryParams) => {
        const hashParamsInLowerCase = yesSir.hashHelper.getHashParamsInLowerCase();

        const idFromUrl = hashParamsInLowerCase.get('actionblock');

        yesSir.actionBlockController.executeActionBlockById(idFromUrl);
    }

    openByRequest = (queryParams) => {
        const hashParamsInLowerCase = yesSir.hashHelper.getHashParamsInLowerCase();

        let request = "";
        const textToCut = window.location.hash;
        const fromCharacterRequest = "=";

        let isExecuteActionBlockByTitle = false;

        // if (
        //     "executebytitle" in queryParams
        // ) {
        //     const toCharacterRequest =
        //     "&" + "executebytitle";

        //     request = this.#textManager.getCuttedText(
        //         textToCut,
        //         fromCharacterRequest,
        //         toCharacterRequest
        //     );
        //     request = decodeURIComponent(request);
        //     this.#searchController.setTextToInputField(request);
        // } else 
        if (
            window.location.hash.includes(
                "executebytitle" + "=true"
            ) ||
            window.location.hash.includes(
                "executebytitle"
            )
        ) {
            isExecuteActionBlockByTitle = true;
            const toCharacterRequest =
                "&" + "executebytitle";
            request = this.#textManager.getCuttedText(
                textToCut,
                fromCharacterRequest,
                toCharacterRequest
            );
        } else {
            request = this.#textManager.getCuttedText(
                textToCut,
                fromCharacterRequest
            );
            request = decodeURIComponent(request);
            this.#searchController.setTextToInputField(request);
        }

        request = decodeURIComponent(request);
        yesSir.actionBlockController.showActionBlocksByRequest(
            request,
            isExecuteActionBlockByTitle
        );

        this.#scrollController.setPositionTop();
    }

    createActionBlock = (queryParams) => {
        this.#actionBlockController.showSettingsToCreateAdvancedActionBlock();

        this.#scrollController.setPositionTop();
    }

    createNote = (queryParams) => {
        this.#actionBlockController.showSettingsToCreateNote();
        this.#scrollController.setPositionTop();
    }

    createLink = (queryParams) => {
        this.#actionBlockController.showSettingsToCreateLink();
        this.#scrollController.setPositionTop();
    }

    editActionBlock = (queryParams) => {
        const textToCut = window.location.hash;
        const fromCharacterActionBlockSettings = "=";
        const toCharacterRequestActionBlockSettings = "";

        let title = this.#textManager.getCuttedText(
            textToCut,
            fromCharacterActionBlockSettings,
            toCharacterRequestActionBlockSettings
        );

        title = decodeURIComponent(title);
        this.#actionBlockController.openActionBlockSettings(title);
        this.#scrollController.setPositionTop();
    }

    saveToDatabase = (queryParams) => {
        this.#actionBlockController.saveToDatabase();
        this.#scrollController.setPositionTop();
    }

    getFromDatabase = (queryParams) => {
        this.#actionBlockController.getFromDatabase();
        this.#scrollController.setPositionTop();
    }

    openMainPrevious = (queryParams) => {
        $("#content_executed_from_actionBlock").css("display", "none");
        $("#btn_close").css("display", "none");
        $(".btn_open_settings_actionBlock").css("display", "none");
        $(".btn_open_command_palette").css("display", "none");
        $("#btn_back").css("display", "none");

        // $('#actionBlocks_page').css('display', 'block');
        this.#actionBlockController.showActionBlocksContainer();

        const scrollPositionOnExecuteActionBlock =
            this.#actionBlockController.getScrollPositionOnExecuteBlock();

        const indexLastShowedActionBlock =
            this.#actionBlockController.getIndexLastShowedActionBlock();

        if (indexLastShowedActionBlock === 0) {
            yesSir.hashHandler.openPreviousPage();
        } else {
            this.#scrollController.setPosition(
                0,
                scrollPositionOnExecuteActionBlock
            );
        }
    }

    openPageSettingsToCreateLink() {
        window.location.hash = this.#HASH_NAME_ENUM.createLink;
    }

    openPageSettingsToCreateNote() {
        window.location.hash = this.#HASH_NAME_ENUM.createNote;
    }

    setHashMainPrevious() {
        window.location.hash = this.#HASH_NAME_ENUM.mainPrevious;
    }

    openPageCreateActionBlock() {
        window.location.hash = this.#HASH_NAME_ENUM.createActionBlock;
    }
}