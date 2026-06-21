class YesSir {
  constructor() {
    const inputDeviceManager = new InputDeviceManager();
    this.googleSpeechRecognition = new GoogleSpeechRecognition();
    this.googleTextToSpeech = new GoogleTextToSpeech();
    this.textManager = new TextManager();
    this.fileManager = new FileManager(this.textManager);
    this.dateManager = new DateManager();
    this.voiceRecognitionManager = new VoiceRecognitionManager();
    this.speakerManager = new TextToSpeechSynthesizer();
    this.dropdownManager = new DropdownManager();
    this.mapDataStructure = new MapDataStructure();
    this.dbManager = new DBManager();
    this.arrayManager = new ArrayManager();
    this.hashHelper = new HashHelper();
    this.domElementManager = new DOMElementManager();

    this.keyCodeByKeyName = inputDeviceManager.getKeyCodeByKeyName();
    this.dialogWindow = new DialogWindow();
    this.observable = new Observable();

    this.modalBoxController = new ModalBoxInitializer();
    this.modalLoadingController = new ModalLoadingController(this.modalBoxController);
    this.noteSpeakerService = new NoteSpeakerService(this.speakerManager);
    this.dataStorageService = new DataStorageService(this.dialogWindow);
    this.searchService = new SearchSevice();
    this.scrollController = new ScrollInitializer();
    this.logsController = new LogsInitializer(this.fileManager, this.dateManager);
    this.autocompleteService = new AutocompleteService(this.textManager);
    this.hashService = new HashService(
      this.textManager,
      this.noteSpeakerService,
      this.searchService,
      this.scrollController
    );
    this.voiceRecognitionService = new VoiceRecognitionService(
      this.voiceRecognitionManager,
      this.hashService
    );

    this.loaderController = new LoaderInitializer();

    this.noteController = new NoteInitializer(
      this.hashService,
      this.noteSpeakerService
    );


    this.actionBlockService = new ActionBlockService(
      this.dbManager,
      this.fileManager,
      this.textManager,
      this.dropdownManager,
      this.dataStorageService,
      this.mapDataStructure,
      this.logsController,
      this.dialogWindow,
      this.keyCodeByKeyName,
      this.scrollController,
      this.searchService,
      this.loaderController,
      this.hashService,
      this.noteController,
      this.dateManager,
      this.modalLoadingController
    );

    this.noteController.actionBlockService = this.actionBlockService;
    this.noteController.setCommandInputFieldWithCommandObjects();
    this.noteController.openNoteHandler = function() {
      const BTN_SPEAKER = this.noteSpeakerService.showBtnSpeaker();

      this.hashService.showElement(BTN_SPEAKER);

      if (window.location.hash.includes("&listen")) {
        this.noteSpeakerService.speak();
      }
    }
  }
}

let yesSir;

(function () {
  yesSir = new YesSir();
  yesSir.loaderController.startLoading();

  window.addEventListener("load", function () {
    onPageLoaded();
  });

  function onPageLoaded() {
    // Initialize Libraries.
    const observable = yesSir.observable;
    const dateManager = yesSir.dateManager;

    const keyCodeByKeyName = yesSir.keyCodeByKeyName;
    const textManager = yesSir.textManager;
    const dialogWindow = yesSir.dialogWindow;
    const fileManager = yesSir.fileManager;
    dropdownManager = yesSir.dropdownManager;
    mapDataStructure = yesSir.mapDataStructure;
    dbManager = yesSir.dbManager;
    arrayManager = yesSir.arrayManager;

    // Initialize Services.
    const voiceRecognitionService = yesSir.voiceRecognitionService;
    const autocompleteService = yesSir.autocompleteService;
    const searchService = yesSir.searchService;
    const loaderController = yesSir.loaderController;
    const noteController = yesSir.noteController;
    const dataStorageService = yesSir.dataStorageService;
    const hashService = yesSir.hashService;
    const actionBlockService = yesSir.actionBlockService;

    const noteSpeakerController = new NoteSpeakerController(
      yesSir.noteSpeakerService,
      noteController
    );
    
    const actionBlockController = new ActionBlockController(
      actionBlockService,
      loaderController,
      dialogWindow,
      searchService,
      hashService,
      noteController
    );

    const voiceRecognitionController = new VoiceRecognitionController(
      voiceRecognitionService,
      observable,
      hashService
    );

    const scrollController = new ScrollInitializer();

    const searchController = new SearchController(
      searchService,
      actionBlockService,
      hashService,
      textManager,
      keyCodeByKeyName
    );

    const dataStorageController = new DataStorageController(
      actionBlockService,
      dataStorageService,
      hashService
    );
    
    const hashController = new HashController(hashService);

    actionBlockService.showActionBlocksFromStorage();
    yesSir.loaderController.stopLoading();

    // resizeContentDialogInfo();
    // window.addEventListener('resize', onWindowResize);

    scrollController.bindScrollEndPage({
      onScrollEndPage: function onScrollEndPage() {
        if (actionBlockService.view.isActionBlocksPageActive()) {
            actionBlockService.addOnPageNextActionBlocks();
        }
      }
    });

    actionBlockController.bindClickBtnShowSettingsToCreateAdvancedActionBlock(() => { hashService.setHashCreateActionBlock(); });
    actionBlockController.bindClickBtnShowSettingsToCreateNote(() => { hashService.openPageSettingsToCreateNote(); });
    actionBlockController.bindClickBtnShowSettingsToCreateLink(() => { this.hashService.openPageSettingsToCreateLink(); });
    noteController.closeHandler = function() {
      $('.inputFieldWithSuggestions').hide();
      voiceRecognitionService.stopRecognizing();
      this.noteSpeakerService.removeFromPage();

      if (window.location.hash.toUpperCase().includes('#editActionBlock'.toUpperCase())) {
        this.actionBlockService.setDefaultValuesForSettingsElementsActionBlock();
      } else if (window.location.hash.toUpperCase().includes('#createnote'.toUpperCase())) {
        this.noteController.clearAllInputElements();
      }
    };
  }

  function onWindowResize() {
    resizeContentDialogInfo();
  }

  // Resize content in dialog info.
  function resizeContentDialogInfo() {
    let width_dialog_info = $(".content").css("width");

    $(".dialog_content").css({
      width: "250px",
    });
  }
})();
