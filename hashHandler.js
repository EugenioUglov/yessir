class HashHandler {
  constructor({ textManager, searchService, scrollController, PAGE_NAME_ENUM, PAGE_OPTION_NAME_ENUM, routesMap, defaultPage }) {
    this.textManager = textManager;
    this.searchService = searchService;
    this.scrollController = scrollController;
    this.PAGE_NAME_ENUM = PAGE_NAME_ENUM;
    this.PAGE_OPTION_NAME_ENUM = PAGE_OPTION_NAME_ENUM;
    this.#routesMap = routesMap;
    this.#defaultPage = defaultPage;
    this.#view = new PageElementView();
    
    this.#setListeners();
  }

  onHandleHashHandler;

  #hashPrevious;
  #isHashChangeListenerActiveStateEnabled = false;
  #currentPageName;
  #view;
  #routesMap;
  #defaultPage;

  #setListeners() {
    const that = this;

    window.onhashchange = function() {
        that.handleHash();
    }
  }

  init() {
    this.setHashChangeListenerActiveState(true);

    // Обрабатываем текущий хеш при загрузке страницы
    if ( ! window.location.hash) {
        this.openPage(this.#defaultPage);
    } else {
        this.handleHash();
    }
  }
  
  // Open page by name and optional query parameters.
  openPage(pageName, queryParams = {}) {
    let hash = "#" + pageName;
    
    // Если переданы параметры, собираем их в строку (например: ?id=5&sort=asc)
    const queryString = new URLSearchParams(queryParams).toString();

    if (queryString) {
      hash += "?" + queryString;
    }

    window.location.hash = hash;
  }

  getCurrentPageName() {
    return this.#currentPageName;
  }

  getNormalizedCurrentHash() {
    return window.location.hash.toLowerCase();
  }

  setHashMain() {
    this.#hashPrevious = this.getNormalizedCurrentHash();
    this.#setCurrentPageName(this.PAGE_NAME_ENUM.main);
    window.location.hash = this.PAGE_NAME_ENUM.main;
  }

  setHashMainPrevious() {
    window.location.hash = "mainprevious";
  }

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

    this.#hashPrevious = this.getNormalizedCurrentHash();

    if (requestValue === undefined || requestValue === "") {
      this.openMainPage();
    }

    this.#setCurrentPageName(this.PAGE_NAME_ENUM.request);

    const newHash =
      this.PAGE_NAME_ENUM.request +
      "=" +
      requestValue +
      (isExecuteActionBlockByTitle
        ? "&" + this.PAGE_OPTION_NAME_ENUM.executebytitle
        : "") +
      (isListenText ? "&" + this.PAGE_OPTION_NAME_ENUM.listen : "");

    window.location.hash = newHash;
  };

  setPreviousHash(newHashPrevious) {
    this.#hashPrevious =
      newHashPrevious != undefined ? newHashPrevious : window.location.hash;
  }

  setHashCreateActionBlock() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    this.#setCurrentPageName(this.PAGE_NAME_ENUM.createActionBlock);
    window.location.hash = this.PAGE_NAME_ENUM.createActionBlock;
  }

  setHashCreateNote() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    this.#setCurrentPageName(this.PAGE_NAME_ENUM.createNote);
    window.location.hash = this.PAGE_NAME_ENUM.createNote;
  }

  setHashCreateLink() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    this.#setCurrentPageName(this.PAGE_NAME_ENUM.createLink);
    window.location.hash = this.PAGE_NAME_ENUM.createLink;
  }


  setHashGetFromDatabase() {
    // this.#hash_previous = this.getNormalizedCurrentHash();
    this.#hashPrevious = this.PAGE_NAME_ENUM.main;


    this.#setCurrentPageName(this.PAGE_NAME_ENUM.getfromdatabase);
    // window.location.hash = this.PAGE_NAME_ENUM.getfromdatabase;
    window.location.replace('#' + this.PAGE_NAME_ENUM.getfromdatabase);
  }

  setHashSaveToDatabase() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    this.#setCurrentPageName(this.PAGE_NAME_ENUM.savetodatabase);
    window.location.hash = this.PAGE_NAME_ENUM.savetodatabase;
  }

  setHashLogin() {
    // this.#hash_previous = this.getNormalizedCurrentHash();
    this.#hashPrevious = this.PAGE_NAME_ENUM.main;

    this.#setCurrentPageName(this.PAGE_NAME_ENUM.login);
    window.location.hash = this.PAGE_NAME_ENUM.login;
  }

  // setHashEditActionBlock(title) {
  //     this.#hash_previous = this.getNormalizedCurrentHash();
  //     console.log("hash_previous = " + this.#hash_previous);
  //     this.#setCurrenPageName(this.PAGE_NAME_ENUM.editActionBlock);
  //     window.location.hash = this.PAGE_NAME_ENUM.editActionBlock + '=' + title;
  // }

  showElement(element) {
    this.#view.showElement(element);
  }

  hideShowedElements() {
    this.#view.hideShowedElements();
  }


  setPageName(newPageName) {
    this.#currentPageName = newPageName;
  }

  openMainPage() {
    if (window.location.hash === "#" + this.PAGE_NAME_ENUM.main) {
      this.handleHash();
    } else {
      window.location.hash = this.PAGE_NAME_ENUM.main;
    }
  }

  openActionBlockPage(title) {
    this.#hashPrevious = window.location.hash;

    window.location.hash =
      this.PAGE_NAME_ENUM.request +
      "=" +
      title +
      "&" +
      this.PAGE_OPTION_NAME_ENUM.executebytitle +
      "=true";
  }

  openSettingsActionBlockPage(title) {
    this.#hashPrevious = window.location.hash;
    this.#setCurrentPageName(this.PAGE_NAME_ENUM.editActionBlock);
    window.location.hash = this.PAGE_NAME_ENUM.editActionBlock + "=" + title;
    this.setPageName(this.PAGE_NAME_ENUM.settingsActionBlock);
  }

  openPreviousPage() {
    if (
      this.#hashPrevious &&
      this.#hashPrevious.includes(this.PAGE_NAME_ENUM.editActionBlock) ===
        false
    ) {
      let hashToOpen = this.#hashPrevious;

      const isPreviousHashIncludesExecuteByTitle =
        this.#hashPrevious.includes(
          "&" + this.PAGE_OPTION_NAME_ENUM.executebytitle
        ) &&
        this.#hashPrevious.includes(
          "&" + this.PAGE_OPTION_NAME_ENUM.executebytitle + "=false"
        ) === false;

      if (isPreviousHashIncludesExecuteByTitle) {
        const indexStartWordExecuteByTitle = this.#hashPrevious.indexOf(
          "&" + this.PAGE_OPTION_NAME_ENUM.executebytitle
        );
        hashToOpen = this.#hashPrevious.substring(
          0,
          indexStartWordExecuteByTitle
        );
      }

      window.location.hash = hashToOpen;
    } else {
      this.openMainPage();
    }
  }

  openPageSettingsToCreateLink() {
    window.location.hash = this.PAGE_NAME_ENUM.createLink;
    this.#setCurrentPageName(this.PAGE_NAME_ENUM.createLink);
  }

  openPageSettingsToCreateNote() {
    window.location.hash = this.PAGE_NAME_ENUM.createNote;
    this.#setCurrentPageName(this.PAGE_NAME_ENUM.createNote);
  }

  openPreviousBrowserPage() {
    history.back();
  }

  setHashChangeListenerActiveState(isActiveNew) {
    this.#isHashChangeListenerActiveStateEnabled = isActiveNew;
  }

  getHashChangeListenerActiveState() {
    return this.#isHashChangeListenerActiveStateEnabled;
  }

  // !!!
  handleHashNew() {

    // Убираем '#'
    const rawHash = window.location.hash.replace('#', '');
    
    // Разделяем страницу и параметры по знаку '?'
    const [pageName, queryString] = rawHash.split('?');

    const action = this.#routesMap[pageName];

    if (typeof action === 'function') {
      this.setPageName(pageName);
      // Превращаем query-строку в удобный объект (например: { id: "5", sort: "asc" })
      const queryParams = Object.fromEntries(new URLSearchParams(queryString || ''));
      
      // Передаем параметры в действие!
      action(queryParams);
    } else {
      this.setPageName(this.#defaultPage);

      console.warn(`Нет обработчика для страницы: ${pageName}. Открываем страницу по умолчанию.`);

      this.openPage(this.#defaultPage);
    }
  }

  handleHash() {
    const that = this;
    
    const hashParamsInLowerCase = yesSir.hashHelper.getHashParamsInLowerCase();

    hideCommandInput();

    if (this.onHandleHashHandler) this.onHandleHashHandler();

    this.hideShowedElements();

    if (this.getHashChangeListenerActiveState() === false) return;

    if (
      this.getNormalizedCurrentHash() === "#" + this.PAGE_NAME_ENUM.main ||
      this.getNormalizedCurrentHash() === "" ||
      this.getNormalizedCurrentHash() === "#undefined"
    ) {
      this.setPageName(this.PAGE_NAME_ENUM.main);
      this.searchService.clearInputField();

      if (yesSir.actionBlockController.model.getActionBlocks().size > 0) {
        yesSir.actionBlockController.view.onOpenMainPageWithActionBlocks();
        yesSir.actionBlockController.showActionBlocks();
      } else {
        yesSir.actionBlockController.view.onOpenMainPageWithoutActionBlocks();
      }

      yesSir.actionBlockController.view.onShowMainPage();
      this.scrollController.setPositionTop();
    } else if (this.getNormalizedCurrentHash() === "#testfirebase") {
      // var actionBlocks_to_save = this.mapDataStructure.getStringified(actionBlocks_map_to_save);
      // var dbRef = firebase.database().ref();
      // var databaseTable = dbRef.child('actionBlocks');

      // const newdata = {
      //     0: actionBlocks_to_save
      // };

      // databaseTable.update(newdata);

      const that = this;
      const dbRef = firebase.database().ref();
      const actionBlocksDatabase = dbRef.child("actionBlocks");
      let actionBlocks = "";

      // get(child(dbRef, "yesSir/actionBlocks")).then((snapshot)=> {
      //     console.log(snapshot.val());
      // });

      actionBlocksDatabase.on("value", (snapshot) => {
        const databaseObject = snapshot.val();
        // console.log("get from firebase database completed:");
        // console.log(actionBlocks);

        console.log(databaseObject);
      });
    } else if (
      this.getNormalizedCurrentHash().includes(
        "#" + this.PAGE_NAME_ENUM.main
      ) &&
      window.location.hash.includes(this.PAGE_OPTION_NAME_ENUM.fileManager)
    ) {
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

      this.scrollController.setPositionTop();
    } else if (
      hashParamsInLowerCase.has(this.PAGE_NAME_ENUM.actionBlock.toLowerCase())
    ) {
        const idFromUrl = hashParamsInLowerCase.get(this.PAGE_NAME_ENUM.actionBlock.toLowerCase());

        yesSir.actionBlockController.executeActionBlockById(idFromUrl);
    } else if (
      hashParamsInLowerCase.has(this.PAGE_NAME_ENUM.request)
    ) {
      let request = "";
      const textToCut = window.location.hash;
      const fromCharacterRequest = "=";

      let isExecuteActionBlockByTitle = false;

      if (
        hashParamsInLowerCase.get(this.PAGE_OPTION_NAME_ENUM.executebytitle) == false
      ) {
        const toCharacterRequest =
          "&" + this.PAGE_OPTION_NAME_ENUM.executebytitle;

        request = that.textManager.getCuttedText(
          textToCut,
          fromCharacterRequest,
          toCharacterRequest
        );
        request = decodeURIComponent(request);
        this.searchService.setTextToInputField(request);
      } else if (
        window.location.hash.includes(
          this.PAGE_OPTION_NAME_ENUM.executebytitle + "=true"
        ) ||
        window.location.hash.includes(
          this.PAGE_OPTION_NAME_ENUM.executebytitle
        )
      ) {
        isExecuteActionBlockByTitle = true;
        const toCharacterRequest =
          "&" + this.PAGE_OPTION_NAME_ENUM.executebytitle;
        request = that.textManager.getCuttedText(
          textToCut,
          fromCharacterRequest,
          toCharacterRequest
        );
      } else {
        request = that.textManager.getCuttedText(
          textToCut,
          fromCharacterRequest
        );
        request = decodeURIComponent(request);
        this.searchService.setTextToInputField(request);
      }

      request = decodeURIComponent(request);
      yesSir.actionBlockController.showActionBlocksByRequest(
        request,
        isExecuteActionBlockByTitle
      );

      this.scrollController.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.createActionBlock
      )
    ) {
      yesSir.actionBlockController.showSettingsToCreateAdvancedActionBlock();

      this.scrollController.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.createNote
      )
    ) {
      yesSir.actionBlockController.showSettingsToCreateNote();
      this.scrollController.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.createLink
      )
    ) {
      yesSir.actionBlockController.showSettingsToCreateLink();
      this.scrollController.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.editActionBlock
      )
    ) {
      const textToCut = window.location.hash;
      const fromCharacterActionBlockSettings = "=";
      const toCharacterRequestActionBlockSettings = "";

      let title = this.textManager.getCuttedText(
        textToCut,
        fromCharacterActionBlockSettings,
        toCharacterRequestActionBlockSettings
      );

      title = decodeURIComponent(title);
      yesSir.actionBlockController.openActionBlockSettings(title);
      this.scrollController.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.savetodatabase
      )
    ) {
      yesSir.actionBlockController.saveToDatabase();
      this.scrollController.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.getfromdatabase
      )
    ) {
      yesSir.actionBlockController.getFromDatabase();
      this.scrollController.setPositionTop();
    } else if (this.getNormalizedCurrentHash() === "#mainprevious") {
      $("#content_executed_from_actionBlock").css("display", "none");
      $("#btn_close").css("display", "none");
      $(".btn_open_settings_actionBlock").css("display", "none");
      $(".btn_open_command_palette").css("display", "none");
      $("#btn_back").css("display", "none");

      // $('#actionBlocks_page').css('display', 'block');
      yesSir.actionBlockController.showActionBlocksContainer();
      const scrollPositionOnExecuteActionBlock =
        yesSir.actionBlockController.getScrollPositionOnExecuteBlock();
      const indexLastShowedActionBlock =
        yesSir.actionBlockController.getIndexLastShowedActionBlock();

      if (indexLastShowedActionBlock === 0) {
        this.openPreviousPage();
      } else {
        this.scrollController.setPosition(
          0,
          scrollPositionOnExecuteActionBlock
        );
      }
    } else {
      // window.location.hash === this.PAGE_NAME_ENUM.main;
    }

    new EditActionBlockDataHolder(this);
  }

  #setCurrentPageName(newPageName) {
    this.#currentPageName = newPageName;
  }
}
