class YesSir {
  constructor({ onEnd }) {
    (async () => {
      $("#advancedSearcherByTags").load("packages/advancedSearchearByTags/index.html");


      const projectAssetLoader = new ProjectAssetLoader({});
      
      const inputDeviceManager = new InputDeviceManager();
      
      this.topInfoPanelController = await TopInfoPanelManager.create({ projectAssetLoader: projectAssetLoader, targetId: 'topInfoBar' });

      this.loginPanelController = await LoginManager.create({ projectAssetLoader: projectAssetLoader, targetId: 'loginContainer' });

      this.centeredAlertManager = await CenteredAlertManager.create({ projectAssetLoader: projectAssetLoader, targetId: 'alertCenterContainer' });

      
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

      this.searchController = await new SearchManager(
        { 
          projectAssetLoader: projectAssetLoader, 
          textManager: this.textManager, 
          keyCodeByKeyName: this.keyCodeByKeyName, 
          targetId: 'request_container' 
        }
      );

      this.modalBoxController = await ModalBoxManager.create({ 
        projectAssetLoader: projectAssetLoader, 
        targetId: 'modalBoxContainer', 
        data: {} 
      });
      this.modalLoadingController = new ModalLoadingController(this.modalBoxController);
      this.noteSpeakerService = new NoteSpeakerService(this.speakerManager);
      this.dataStorageService = new DataStorageService(this.dialogWindow);
      this.scrollController = await new ScrollManager({ projectAssetLoader: projectAssetLoader, targetId: 'scrollContainer' });
      this.logsController = new LogsManager(this.fileManager, this.dateManager);
      this.autocompleteService = new AutocompleteService(this.textManager);
      this.hashHandler = new HashHandler(
        this.textManager,
        this.searchController,
        this.scrollController
      );
      this.voiceRecognitionService = new VoiceRecognitionService(
        this.voiceRecognitionManager,
        this.hashHandler
      );
      this.loaderController = await LoaderManager.create(
        { 
          projectAssetLoader: projectAssetLoader,
          targetId: 'multiColorCircleLoaderContainer', 
          data: {} 
        }
      );
      this.noteController = await new NoteInitializer(
        this.hashHandler,
        this.noteSpeakerService
      );

      this.bottomInfoPanel = await BottomInfoPanelManager.create(
        {
          projectAssetLoader: projectAssetLoader, 
          targetId: 'bottomInfoPanelContainer'
        }
      );

      this.actionBlockController = new ActionBlockController(
        this.loaderController,
        this.dialogWindow,
        this.searchController,
        this.hashHandler,
        this.noteController,
        this.dbManager,
        this.fileManager,
        this.textManager,
        this.dropdownManager,
        this.dataStorageService,
        this.mapDataStructure,
        this.logsController,
        this.keyCodeByKeyName,
        this.scrollController,
        this.dateManager,
        this.modalLoadingController,
        this.bottomInfoPanel,
        this.loginPanelController,
        this.topInfoPanelController,
        this.modalBoxController,
        this.centeredAlert
      );

      if (onEnd) onEnd();
    })();
  }
}

let yesSir;

(function () {
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
    // const noteController = yesSir.noteController;
    const dataStorageService = yesSir.dataStorageService;
    const hashHandler = yesSir.hashHandler;
    const scrollController = yesSir.scrollController;
    const actionBlockController = yesSir.actionBlockController;



    yesSir.noteController.actionBlockController = actionBlockController;

    yesSir.noteController.setCommandInputFieldWithCommandObjects();

    yesSir.noteController.openNoteHandler = function() {
      const BTN_SPEAKER = yesSir.noteSpeakerService.showBtnSpeaker();

      hashHandler.showElement(BTN_SPEAKER);

      if (window.location.hash.includes("&listen")) {
        yesSir.noteSpeakerService.speak();
      }
    }

    // const searchController = new SearchManager(
    //   { 
    //     projectAssetLoaderClass: ProjectAssetLoaderClass, 
    //     textManager: textManager, 
    //     keyCodeByKeyName: keyCodeByKeyName, 
    //     targetId: 'request_container' 
    //   }
    // );

    const noteSpeakerController = new NoteSpeakerController(
      yesSir.noteSpeakerService,
      yesSir.noteController
    );
    

    const voiceRecognitionController = new VoiceRecognitionController(
      voiceRecognitionService,
      observable,
      hashHandler
    );


    const dataStorageController = new DataStorageController(
      actionBlockController,
      dataStorageService,
      hashHandler
    );

    actionBlockController.showActionBlocksFromStorage();
    yesSir.loaderController.stopLoading();


    scrollController.bindScrollEndPage({
      onScrollEndPage: function onScrollEndPage() {
        if (actionBlockController.view.isActionBlocksPageActive()) {
            actionBlockController.addOnPageNextActionBlocks();
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

    yesSir.noteController.closeHandler = function() {
      $('.inputFieldWithSuggestions').hide();
      voiceRecognitionService.stopRecognizing();
      this.noteSpeakerService.removeFromPage();

      if (window.location.hash.toUpperCase().includes('#editActionBlock'.toUpperCase())) {
        actionBlockController.setDefaultValuesForSettingsElementsActionBlock();
      } else if (window.location.hash.toUpperCase().includes('#createnote'.toUpperCase())) {
        yesSir.noteController.clearAllInputElements();
      }
    };

    const searchControllerEventBinder = new SearchControllerEventBinder({
      searchController: yesSir.searchController, 
      hashHandler: hashHandler, 
      actionBlockController: actionBlockController
    });



    hashHandler.handleHashHandler = () => {
      yesSir.domElementManager.hideShowedElements();
      yesSir.domElementManager.hideElement("#elements_for_file_manager");
      yesSir.domElementManager.showElement(".content");
      yesSir.domElementManager.showElement(".fixed_elements");

      if (yesSir.noteSpeakerService.isSpeaking) yesSir.noteSpeakerService.stopSpeak();
    };
  }

  function onPageLoaded() {
    yesSir = new YesSir({ onEnd: () => { onYesSirLoaded(); }});
  }  
})();
