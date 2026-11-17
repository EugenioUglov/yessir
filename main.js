class YesSir {
  constructor({ onEnd }) {
    (async () => {
      console.time("Execution Time");

      // const loader = new ProjectAssetLoader({ enableDebug: true });
      // loader.loadJavaScript({ path: '/test.js' });

      const projectAssetLoader = new ProjectAssetLoader({enableDebug: true});


      const inputDeviceManager = new InputDeviceManager();

      this.commandInputField = new CommandInputField();

      this.loginPanelController = await LoginBootstrapper.create({ projectAssetLoader, targetId: 'loginContainer' });

      this.centeredAlertController = await CenteredAlertBootstrapper.create({ projectAssetLoader, targetId: 'alertCenterContainer' });

      this.googleSpeechRecognition = new GoogleSpeechRecognition();
      this.googleTextToSpeech = new GoogleTextToSpeech();
      this.textManager = new TextManager();
      this.fileManager = new FileManager(this.textManager);
      this.dateManager = new DateManager();
      this.speakerManager = new TextToSpeechSynthesizer();
      this.dropdownManager = new DropdownManager();
      this.mapDataStructure = new MapDataStructure();
      this.arrayManager = new ArrayManager();
      this.domElementsVisibility = new DomElementsVisibility();

      this.keyCodeByKeyName = inputDeviceManager.getKeyCodeByKeyName();
      this.dialogWindow = new DialogWindow();
      this.observable = new Observable();


      const fixedSearchAssetLoader = new ProjectAssetLoader({});

      await fixedSearchAssetLoader.loadJavaScript({ path: "/libraries/fixedSearch/index.js" });

      this.search = await new FixedSearch({ projectAssetLoader, targetId: 'searchContainer' });


      this.modalBoxController = await ModalBoxBootstrapper.create({
        projectAssetLoader,
        targetId: 'modalBoxContainer',
        data: {}
      });

      this.modalLoadingController = new ModalLoadingController(this.modalBoxController);

      this.noteSpeakerService = new NoteSpeakerService(this.speakerManager);

      this.dataStorageService = new DataStorageService(this.dialogWindow);

      this.scrollController = await new ScrollBootstrapper({ projectAssetLoader, targetId: 'scrollContainer' });

      this.logsController = await LogsBootstrapper.create({ projectAssetLoader, fileManager: this.fileManager, dateManager: this.dateManager });


      this.voiceRecognitionService = new VoiceRecognitionService();

      this.loaderController = await MultiColorCircleLoaderBootstrapper.create(
        {
          projectAssetLoader,
          targetId: 'multiColorCircleLoaderContainer',
          data: {}
        }
      );

      this.noteController = await NoteBootstrapper.create(
        {
          projectAssetLoader,
          noteSpeakerService: this.noteSpeakerService
        }
      );

      this.bottomInfoPanel = await BottomInfoPanelBootstrapper.create(
        {
          projectAssetLoader,
          targetId: 'bottomInfoPanelContainer'
        }
      );

      this.actionBlockController = new ActionBlockController(
        this.dialogWindow,
        this.search,
        this.noteController,
        this.fileManager,
        this.textManager,
        this.dropdownManager,
        this.dataStorageService,
        this.mapDataStructure,
        this.scrollController,
        this.dateManager,
        this.modalLoadingController,
        this.bottomInfoPanel,
        this.loginPanelController,
        this.modalBoxController
      );


      
      this.actionBlockWrapper = new ActionBlockWrapper({ actionBlockController: this.actionBlockController, loginPanelController: this.loginPanelController, modalBoxController: this.modalBoxController, mapDataStructure: this.mapDataStructure, logsController: this.logsController, dialogWindow: this.dialogWindow, dateManager: this.dateManager, modalLoadingController: this.modalLoadingController });

      this.hashHandlers = new HashHandlers(
        HASH_NAME_ENUM,
        this.search,
        this.actionBlockController,
        this.scrollController,
        this.textManager,
        this.actionBlockWrapper
      );


      this.routesConfig = new RoutesConfig(HASH_NAME_ENUM, this.hashHandlers);


      this.hashObserver = new HashObserver(
        {
          routesMap: this.routesConfig.getRoutesMap(),
          defaultPage: HASH_NAME_ENUM.main
        }
      );

      this.hashObserver.onStartHandleHash = () => {
        yesSir.commandInputField.hideCommandInput();
        this.search.hide();
      };

      this.hashObserver.onEndHandleHash = () => {
        new EditActionBlockDataHolder(HASH_NAME_ENUM, this.hashObserver);
      }
      
      if (onEnd) onEnd();

      console.timeEnd("Execution Time");
    })();
  }
}

let yesSir;

(function () {
  window.addEventListener("load", function () {
    onPageLoaded();
  });

  async function onYesSirLoaded() {
    const buttonActivityView = new ButtonActivityView();
    yesSir.loaderController.startLoading();

    // Initialize Libraries.
    const observable = yesSir.observable;
    dropdownManager = yesSir.dropdownManager;
    mapDataStructure = yesSir.mapDataStructure;
    arrayManager = yesSir.arrayManager;

    // Initialize Services.
    const voiceRecognitionService = yesSir.voiceRecognitionService;
    const loaderController = yesSir.loaderController;
    const hashObserver = yesSir.hashObserver;
    const scrollController = yesSir.scrollController;
    const actionBlockController = yesSir.actionBlockController;
    const textManager = yesSir.textManager;


    yesSir.noteController.actionBlockController = actionBlockController;

    yesSir.noteController.setCommandInputFieldWithCommandObjects();

    yesSir.noteController.openNoteHandler = function () {
      const btnSpeaker = yesSir.noteSpeakerService.showBtnSpeaker();

      yesSir.domElementsVisibility.showElement(btnSpeaker);

      if (window.location.hash.includes("&listen")) {
        yesSir.noteSpeakerService.speak();
      }
    }
    
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

    // new ActionBlockEventBinder({ actionBlockController, buttonActivityView, loaderController });


    
    actionBlockController.bindOnStartActionBlockOperationHandler(() => {
      buttonActivityView.disableAllButtons();
      loaderController.startLoading();
    });

    actionBlockController.bindOnEndActionBlockOperationHandler(() => {
      buttonActivityView.enableAllButtons();
      loaderController.stopLoading();
    });


    actionBlockController.showActionBlocksFromStorage();
    yesSir.loaderController.stopLoading();


    scrollController.bindScrollEndPage({
      onScrollEndPage: function onScrollEndPage() {
        if (actionBlockController.isActionBlocksPageActive()) {
          actionBlockController.addOnPageNextActionBlocks();
        }
      }
    });

    // actionBlockController.bindClickBtnShowSettingsToCreateAdvancedActionBlock(() => { yesSir.hashHandlers.setHashCreateActionBlock(); });
    actionBlockController.bindClickBtnShowSettingsToCreateAdvancedActionBlock(() => {
      yesSir.hashHandlers.openPageCreateActionBlock();
    });

    actionBlockController.bindClickBtnShowSettingsToCreateNote(() => { yesSir.hashHandlers.openPageSettingsToCreateNote(); actionBlockController.setDefaultValuesForSettingsElementsActionBlock(); });

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

    hashObserver.onHandleHashObserver = () => {
      yesSir.domElementsVisibility.hideShowedElements();
      yesSir.domElementsVisibility.hideElement("#elements_for_file_manager");
      yesSir.domElementsVisibility.showElement(".content");
      yesSir.domElementsVisibility.showElement(".fixed_elements");

      if (yesSir.noteSpeakerService.isSpeaking) yesSir.noteSpeakerService.stopSpeak();
    };
  }

  function onPageLoaded() {
    yesSir = new YesSir({ onEnd: () => { onYesSirLoaded(); } });
  }
})();
