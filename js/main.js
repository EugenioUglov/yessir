class YesSir {
  constructor({ onEnd }) {
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
    this.hashHandler = new HashHandler(
      this.textManager,
      this.searchService,
      this.scrollController
    );
    this.voiceRecognitionService = new VoiceRecognitionService(
      this.voiceRecognitionManager,
      this.hashHandler
    );

    (async () => {
      this.loaderController = await new LoaderInitializer(
        { 
          targetId: 'multiColorCircleLoaderContainer', 
          data: {} 
        }
      );

      this.noteController = new NoteInitializer(
        this.hashHandler,
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
        this.hashHandler,
        this.noteController,
        this.dateManager,
        this.modalLoadingController
      );

      this.noteController.actionBlockService = this.actionBlockService;
      this.noteController.setCommandInputFieldWithCommandObjects();
      this.noteController.openNoteHandler = function() {
        const BTN_SPEAKER = this.noteSpeakerService.showBtnSpeaker();

        this.hashHandler.showElement(BTN_SPEAKER);

        if (window.location.hash.includes("&listen")) {
          this.noteSpeakerService.speak();
        }
      }
      
      if (onEnd) onEnd();
    })();
  }
}

let yesSir;

(function () {
  // new LoaderInitializer('.multiColorCircleLoader');



    window.addEventListener("load", function () {
      onPageLoaded();
    });

    function onYesSirLoaded() {
      yesSir.loaderController.startLoading();

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
      const loaderController = yesSir.loaderController;
      const noteController = yesSir.noteController;
      const dataStorageService = yesSir.dataStorageService;
      const hashHandler = yesSir.hashHandler;
      const actionBlockService = yesSir.actionBlockService;


      const scrollController = new ScrollInitializer();

      const searchController = new SearchInitializer(
        textManager,
        keyCodeByKeyName
      );

      const noteSpeakerController = new NoteSpeakerController(
        yesSir.noteSpeakerService,
        noteController
      );
      
      const actionBlockController = new ActionBlockController(
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
        yesSir.logsController,
        keyCodeByKeyName,
        scrollController,
        yesSir.searchService,
        dateManager,
        yesSir.modalLoadingController
      );

      const voiceRecognitionController = new VoiceRecognitionController(
        voiceRecognitionService,
        observable,
        hashHandler
      );


      const dataStorageController = new DataStorageController(
        actionBlockService,
        dataStorageService,
        hashHandler
      );

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

      actionBlockController.bindClickBtnShowSettingsToCreateAdvancedActionBlock(() => { hashHandler.setHashCreateActionBlock(); });

      actionBlockController.bindClickBtnShowSettingsToCreateNote(() => { hashHandler.openPageSettingsToCreateNote(); });

      actionBlockController.bindClickBtnShowSettingsToCreateLink(() => { hashHandler.openPageSettingsToCreateLink(); });

      actionBlockController.bindLoadingHandler(() => {
        loaderController.startLoading();
      });

      actionBlockController.bindStopLoadingHandler(() => {
        loaderController.stopLoading();
      });

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

      const searchControllerEventBinder = new SearchControllerEventBinder({
        searchController: searchController, 
        hashHandler: hashHandler, 
        actionBlockService: actionBlockService
      });



      hashHandler.handleHashHandler = () => {
        yesSir.domElementManager.hideShowedElements();
        yesSir.domElementManager.hideElement(".speech_recognition_container");
        yesSir.domElementManager.hideElement("#elements_for_file_manager");
        yesSir.domElementManager.showElement(".content");
        yesSir.domElementManager.showElement(".fixed_elements");

        if (yesSir.noteSpeakerService.isSpeaking) yesSir.noteSpeakerService.stopSpeak();
      };
    }

    function onPageLoaded() {
      yesSir = new YesSir({ onEnd: () => { onYesSirLoaded(); }});
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
