class YesSir {
  constructor() {
    const inputDeviceManager = new InputDeviceManager();
    this.googleSpeechRecognition = new GoogleSpeechRecognition();
    this.googleTextToSpeech = new GoogleTextToSpeech();
    this.textManager = new TextManager();
    this.fileManager = new FileManager(this.textManager);
    this.dateManager = new DateManager();
    this.voiceRecognitionManager = new VoiceRecognitionManager();
    this.speakerManager = new SpeakerManager();
    this.dropdownManager = new DropdownManager();
    this.mapDataStructure = new MapDataStructure();
    this.dbManager = new DBManager();
    this.arrayManager = new ArrayManager();
    this.hashManager = new HashManager();
    this.blockManager = new BlockManager();
    this.domElementManager = new DOMElementManager();

    this.keyCodeByKeyName = inputDeviceManager.getKeyCodeByKeyName();
    this.dialogWindow = new DialogWindow();
    this.observable = new Observable();

    this.modalBoxService = new ModalBoxService();
    this.modalLoadingService = new ModalLoadingService(this.modalBoxService);
    this.noteSpeakerService = new NoteSpeakerService(this.speakerManager);
    this.dataStorageService = new DataStorageService(this.dialogWindow);
    this.searchService = new SearchSevice();
    this.scrollService = new ScrollService();
    this.logsService = new LogsService(this.fileManager, this.dateManager);
    this.autocompleteService = new AutocompleteService(this.textManager);
    this.hashService = new HashService(
      this.textManager,
      this.noteSpeakerService,
      this.searchService,
      this.scrollService
    );
    this.voiceRecognitionService = new VoiceRecognitionService(
      this.voiceRecognitionManager,
      this.hashService
    );
    this.loadingService = new LoadingService();
    this.noteService = new NoteService(
      this.noteSpeakerService,
      this.hashService
    );
    this.actionBlockService = new ActionBlockService(
      this.dbManager,
      this.fileManager,
      this.textManager,
      this.dropdownManager,
      this.dataStorageService,
      this.mapDataStructure,
      this.logsService,
      this.dialogWindow,
      this.keyCodeByKeyName,
      this.scrollService,
      this.searchService,
      this.loadingService,
      this.hashService,
      this.noteService,
      this.dateManager,
      this.modalLoadingService
    );
  }
}

let yesSir;

(function () {
  yesSir = new YesSir();
  yesSir.loadingService.startLoading();

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
    const scrollService = yesSir.scrollService;
    const searchService = yesSir.searchService;
    const logsService = yesSir.logsService;
    const loadingService = yesSir.loadingService;
    const noteService = yesSir.noteService;
    const dataStorageService = yesSir.dataStorageService;
    const hashService = yesSir.hashService;
    const actionBlockService = yesSir.actionBlockService;

    // Initialize Controller.
    const logsController = new LogsController();
    const noteSpeakerController = new NoteSpeakerController(
      yesSir.noteSpeakerService,
      noteService
    );
    
    const actionBlockController = new ActionBlockController(
      actionBlockService,
      loadingService,
      dialogWindow,
      searchService,
      hashService,
      noteService
    );

    const voiceRecognitionController = new VoiceRecognitionController(
      voiceRecognitionService,
      observable,
      hashService
    );

    const scrollController = new ScrollController(
      scrollService,
      actionBlockService
    );

    const searchController = new SearchController(
      searchService,
      actionBlockService,
      hashService,
      textManager,
      keyCodeByKeyName
    );

    const noteController = new NoteController(
      actionBlockService,
      noteService,
      hashService
    );
    
    const dataStorageController = new DataStorageController(
      actionBlockService,
      dataStorageService,
      hashService
    );
    
    const hashController = new HashController(hashService);

    actionBlockService.showActionBlocksFromStorage();
    yesSir.loadingService.stopLoading();

    // resizeContentDialogInfo();
    // window.addEventListener('resize', onWindowResize);
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
