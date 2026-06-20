class ActionBlockController {
  constructor(
    actionBlockService,
    loaderController,
    dialogWindow,
    searchService,
    hashService,
    noteService
  ) {
    this.actionBlockService = actionBlockService;
    this.loaderController = loaderController;
    this.dialogWindow = dialogWindow;
    this.searchService = searchService;
    this.hashService = hashService;
    this.noteService = noteService;

    this.#bindViewEvenets();
  }

  #onClickBtnShowSettingsToCreateAdvancedActionBlock;
  #onClickBtnShowSettingsToCreateNote;
  #onClickBtnShowSettingsToCreateLink;

  bindClickBtnShowSettingsToCreateAdvancedActionBlock(handler) {
    this.#onClickBtnShowSettingsToCreateAdvancedActionBlock = handler;
  }

  bindClickBtnShowSettingsToCreateNote(handler) {
    this.#onClickBtnShowSettingsToCreateNote = handler;
  }

  bindClickBtnShowSettingsToCreateLink(handler) {
    this.#onClickBtnShowSettingsToCreateLink = handler;
  };

  #onClickBtnCreateActionBlock = (
    title,
    tagsPlusTitle,
    action,
    content,
    imageURL
  ) => {
    this.view.startLoading();
    this.actionBlockService.createActionBlock(
      title,
      tagsPlusTitle,
      action,
      content,
      imageURL,
      (isActionBlockCreated) => {
        this.view.stopLoading();

        if (isActionBlockCreated === false) {
          return false;
        }

        this.hashService.openMainPage();
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
    this.view.startLoading();
    this.actionBlockService.createActionBlockWithOptimizedAutomationAsync(
      title,
      tagsPlusTitle,
      action,
      content,
      imageURL,
      (isActionBlockCreated) => {
        this.view.stopLoading();

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
    this.actionBlockService.view.bindClickBtnShowSettingsToCreateNote(
      this.#onClickBtnShowSettingsToCreateNote
    );
    this.actionBlockService.view.bindClickBtnShowSettingsToCreateLink(
      this.#onClickBtnShowSettingsToCreateLink
    );
    this.actionBlockService.view.bindClickBtnShowSettingsToCreateFolder(
      this.actionBlockService.showSettingsToCreateFolder
    );
    this.actionBlockService.view.bindClickBtnShowSettingsToCreateAdvancedActionBlock(
      this.#onClickBtnShowSettingsToCreateAdvancedActionBlock
    );
    this.actionBlockService.view.bindClickBtnCancelSettings(
      this.closeActionBlockSettings
    );
  }

  closeActionBlockSettings = () => {
    yesSir.voiceRecognitionService.stopRecognizing();
    this.hashService.openPreviousPage();
  };
}
