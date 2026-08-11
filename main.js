class YesSir {
  constructor({ onEnd }) {
    (async () => {
      $("#advancedSearcherByTags").load("packages/advancedSearchearByTags/index.html");

      const projectAssetLoader = new ProjectAssetLoader({});

      const inputDeviceManager = new InputDeviceManager();

      this.loginPanelController = await LoginManager.create({ projectAssetLoader: projectAssetLoader, targetId: 'loginContainer' });

      
      this.centeredAlertController = await CenteredAlertManager.create({ projectAssetLoader: projectAssetLoader, targetId: 'alertCenterContainer' });


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
      this.domElementVisibility = new DomElementVisibility();

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


      this.voiceRecognitionService = new VoiceRecognitionService(
        this.voiceRecognitionManager
      );

      this.loaderController = await LoaderManager.create(
        {
          projectAssetLoader: projectAssetLoader,
          targetId: 'multiColorCircleLoaderContainer',
          data: {}
        }
      );

      this.noteController = await NoteInitializer.create(
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
        this.modalBoxController,
        this.centeredAlertController
      );

      this.hashHandlers = new HashHandlers(
        HASH_NAME_ENUM,
        this.searchController,
        this.actionBlockController,
        this.scrollController,
        this.textManager
      );

      this.routesConfig = new RoutesConfig(HASH_NAME_ENUM, this.hashHandlers);


      this.hashObserver = new HashObserver(
        {
          routesMap: this.routesConfig.getRoutesMap(),
          defaultPage: HASH_NAME_ENUM.main
        }
      );

      this.hashObserver.onStartHandleHash = () => {
        hideCommandInput();
      };

      this.hashObserver.onEndHandleHash = () => {
        new EditActionBlockDataHolder(HASH_NAME_ENUM, this.hashObserver);
      }

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
    const hashObserver = yesSir.hashObserver;
    const scrollController = yesSir.scrollController;
    const actionBlockController = yesSir.actionBlockController;



    yesSir.noteController.actionBlockController = actionBlockController;

    yesSir.noteController.setCommandInputFieldWithCommandObjects();

    yesSir.noteController.openNoteHandler = function () {
      const BTN_SPEAKER = yesSir.noteSpeakerService.showBtnSpeaker();

      yesSir.domElementVisibility.showElement(BTN_SPEAKER);

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
      hashObserver
    );


    const dataStorageController = new DataStorageController(
      actionBlockController,
      hashObserver,
      yesSir.dialogWindow
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

    // actionBlockController.bindClickBtnShowSettingsToCreateAdvancedActionBlock(() => { yesSir.hashHandlers.setHashCreateActionBlock(); });
    actionBlockController.bindClickBtnShowSettingsToCreateAdvancedActionBlock(() => {
      yesSir.hashHandlers.openPageCreateActionBlock();
    });

    actionBlockController.bindClickBtnShowSettingsToCreateNote(() => { yesSir.hashHandlers.openPageSettingsToCreateNote(); });

    actionBlockController.bindClickBtnShowSettingsToCreateLink(() => { yesSir.hashHandlers.openPageSettingsToCreateLink(); });

    actionBlockController.bindLoadingHandler(() => {
      loaderController.startLoading();
    });

    actionBlockController.bindStopLoadingHandler(() => {
      loaderController.stopLoading();
    });

    yesSir.noteController.closeHandler = function () {
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
      hashObserver: hashObserver,
      actionBlockController: actionBlockController
    });



    hashObserver.onHandleHashObserver = () => {
      yesSir.domElementVisibility.hideShowedElements();
      yesSir.domElementVisibility.hideElement("#elements_for_file_manager");
      yesSir.domElementVisibility.showElement(".content");
      yesSir.domElementVisibility.showElement(".fixed_elements");

      if (yesSir.noteSpeakerService.isSpeaking) yesSir.noteSpeakerService.stopSpeak();
    };
  }

  function onPageLoaded() {
    yesSir = new YesSir({ onEnd: () => { onYesSirLoaded(); } });
  }
})();
