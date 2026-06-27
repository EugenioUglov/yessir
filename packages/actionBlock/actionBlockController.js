class ActionBlockController {
  constructor(
    actionBlockService,
    loaderController,
    dialogWindow,
    searchController,
    hashHandler,
    noteController,
    dbManager,
    fileManager,
    textManager,
    dropdownManager,
    dataStorageService,
    mapDataStructure,
    logsController,
    keyCodeByKeyName,
    scrollController,
    searchService,
    dateManager,
    modalLoadingController
  ) {
    this.actionBlockService = actionBlockService;
    this.loaderController = loaderController;
    this.dialogWindow = dialogWindow;
    this.searchService = searchService;
    this.hashHandler = hashHandler;
    this.noteController = noteController;

    this.#bindViewEvenets();
  }

  #dateManager;
  #indexLastShowedActionBlock = 0;
  #scrollPositionOnExecuteBlock = 0;
  #loadingHandler;
  #stopLoadingHandler;

  bindLoadingHandler(handler) {
    this.#loadingHandler = handler;
  }

  bindStopLoadingHandler(handler) {
    this.#stopLoadingHandler = handler;
  }


  bindClickBtnShowSettingsToCreateAdvancedActionBlock(handler) {
    this.actionBlockService.view.bindClickBtnShowSettingsToCreateAdvancedActionBlock(
      handler
    );
  }

  bindClickBtnShowSettingsToCreateNote(handler) {
    this.actionBlockService.view.bindClickBtnShowSettingsToCreateNote(
      handler
    );
  }

  bindClickBtnShowSettingsToCreateLink(handler) {
    this.actionBlockService.view.bindClickBtnShowSettingsToCreateLink(
      handler
    );
  };

  #onClickBtnCreateActionBlock = (
    title,
    tagsPlusTitle,
    action,
    content,
    imageURL
  ) => {
    this.view.startLoading();
    this.#loadingHandler();
    this.actionBlockService.createActionBlock(
      title,
      tagsPlusTitle,
      action,
      content,
      imageURL,
      (isActionBlockCreated) => {
        this.view.stopLoading();
        this.#stopLoadingHandler();

        if (isActionBlockCreated === false) {
          return false;
        }

        this.hashHandler.openMainPage();
      }
    );
  };

  #onClickBtnCreateActionBlockWithAutomation = (
    title,
    tagsPlusTitle,
    action,
    content,
    imageURL
  ) => {
    this.actionBlockService.view.startLoading();
    this.#loadingHandler();
    this.actionBlockService.createActionBlockWithOptimizedAutomationAsync(
      title,
      tagsPlusTitle,
      action,
      content,
      imageURL,
      (isActionBlockCreated) => {
        this.actionBlockService.view.stopLoading();
        this.#stopLoadingHandler();

        if (isActionBlockCreated === false) {
          return false;
        }
      }
    );
  };

  #bindViewEvenets() {
    this.actionBlockService.view.bindClickBtnFixedPlus(
      this.actionBlockService.switchStateMenuTypeActionBlocksToCreate
    );
    this.actionBlockService.view.bindClickBtnCreateActionBlock(
      this.#onClickBtnCreateActionBlock
    );
    this.actionBlockService.view.bindClickBtnCreateActionBlockWithAutomation(
      this.#onClickBtnCreateActionBlockWithAutomation
    );
    this.actionBlockService.view.bindClickBtnOpenActionBlockSettings(
      this.actionBlockService.openActionBlockSettings
    );
    this.actionBlockService.view.bindClickBtnSaveEditedActionBlock(
      this.actionBlockService.updateActionBlock
    );
    this.actionBlockService.view.bindClickBtnSaveQuicklyEditedActionBlock(
      this.actionBlockService.updateQuicklyEditedActionBlock
    );
    this.actionBlockService.view.bindClickBtnDeleteActionBlock(
      this.actionBlockService.deleteActionBlock
    );
    this.actionBlockService.view.bindClickBtnRewriteActionBlocks(
      this.actionBlockService.rewriteActionBlocks
    );
    this.actionBlockService.view.bindClickBtnCreateDefaultActionBlocks(
      this.actionBlockService.updateDefaultActionBlocks
    );

    this.actionBlockService.view.bindClickBtnShowSettingsToCreateFolder(
      this.actionBlockService.showSettingsToCreateFolder
    );

    this.actionBlockService.view.bindClickBtnCancelSettings(
      this.closeActionBlockSettings
    );
  }

  closeActionBlockSettings = () => {
    yesSir.voiceRecognitionService.stopRecognizing();
    this.hashHandler.openPreviousPage();
  };
}
