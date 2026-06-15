/*
 !!! Change constants
 // Константа живет отдельно и создается ОДИН раз
export const PAGE_NAME_ENUM = Object.freeze({
  main: "main",
  request: "request",
  actionBlock: "action-block",
  publicActionBlocks: "public-action-blocks",
  createActionBlock: "create-action-block",
  createNote: "create-note",
  createLink: "create-link",
  editActionBlock: "edit-action-block",
  speechRecognition: "speech-assistant", // Если значение принципиально другое, это ок, но пусть будет читаемым
  contentActionBlock: "content-action-block",
  login: "login",
  saveToDatabase: "save-to-database", // Исправили camelCase в ключе
  getFromDatabase: "get-from-database",
});
*/
class HashService {
  #hashPrevious;

  constructor(textManager, noteSpeakerService, searchService, scrollService) {
    this.textManager = textManager;
    this.noteSpeakerService = noteSpeakerService;
    this.searchService = searchService;
    this.scrollService = scrollService;
    this.#view = new PageElementView();

    this.#hashPrevious;
  }

  #actionBlockService;
  #isHashChangeListenerActiveStateEnabled = false;
  #currentPageName;
  #view;

  init() {
    this.setHashChangeListenerActiveState(true);
    this.handleHash();
  }

  // getPageNameEnum() {
  PAGE_NAME_ENUM = Object.freeze({
    main: "main",
    request: "request",
    actionBlock: "actionBlock",
    publicActionBlocks: "publicActionBlocks",
    createActionBlock: "createactionblock",
    createNote: "createnote",
    createLink: "createlink",
    editActionBlock: "editactionblock",
    speechRecognition: "speechassistant",
    contentActionBlock: "contentactionblock",
    login: "login",
    savetodatabase: "savetodatabase",
    getfromdatabase: "getfromdatabase",
  });

  //   return PAGE_NAME_ENUM;
  // }

  // PAGE_OPTION_NAME_ENUM {
    PAGE_OPTION_NAME_ENUM = {
      executebytitle: "executebytitle",
      listen: "listen",
      fileManager: "filemanager",
    };

  //   return PAGE_OPTION_NAME_ENUM;
  // }

  getCurrentPageName() {
    return this.#currentPageName;
  }

  getNormalizedCurrentHash() {
    return window.location.hash.toLowerCase();
  }

  setHashMain() {
    this.#hashPrevious = this.getNormalizedCurrentHash();
    this.#setCurrentPageName(this.PAGE_NAME_ENUM.name);
    window.location.hash = this.PAGE_NAME_ENUM.name;
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

  setHashSpeechAssistant() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    this.#setCurrentPageName(this.PAGE_NAME_ENUM.speechRecognition);
    window.location.hash = this.PAGE_NAME_ENUM.speechRecognition;
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

  setActionBlockService(actionBlockServiceToSet) {
    this.#actionBlockService = actionBlockServiceToSet;
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

  openPublicActionBlocksPage() {
    window.location.hash = this.PAGE_NAME_ENUM.publicActionBlocks;
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

  handleHash() {
    const that = this;
    
    const hashParamsInLowerCase = this.#getHashParamsInLowerCase();

    hideCommandInput();
    yesSir.domElementManager.hideShowedElements();
    yesSir.noteService.close();
    yesSir.domElementManager.hideElement(".speech_recognition_container");
    yesSir.domElementManager.hideElement("#elements_for_file_manager");
    yesSir.domElementManager.showElement(".content");
    yesSir.domElementManager.showElement(".fixed_elements");

    const hash_converted_to_object =
      yesSir.hashHelper.getConvertedHashToObject();
    // console.log('hash_converted_to_object', hash_converted_to_object);
    // console.log('hash_converted_to_object.hasOwnProperty("request")', hash_converted_to_object.hasOwnProperty(this.PAGE_NAME_ENUM.request));
    if (this.noteSpeakerService.isSpeaking) this.noteSpeakerService.stopSpeak();

    this.hideShowedElements();
    if (this.getHashChangeListenerActiveState() === false) return;
    // console.log('handleHash', this.getNormalizedCurrentHash());
    // console.log('edit page', this.PAGE_NAME_ENUM.editActionBlock);

    // this.#actionBlockService.view.clear();

    if (
      this.getNormalizedCurrentHash() === "#" + this.PAGE_NAME_ENUM.main ||
      this.getNormalizedCurrentHash() === "" ||
      this.getNormalizedCurrentHash() === "#undefined"
    ) {
      this.setPageName(this.PAGE_NAME_ENUM.main);
      this.searchService.clearInputField();

      if (that.#actionBlockService.model.getActionBlocks().size > 0) {
        that.#actionBlockService.view.onOpenMainPageWithActionBlocks();
        that.#actionBlockService.showActionBlocks();
      } else {
        that.#actionBlockService.view.onOpenMainPageWithoutActionBlocks();
      }

      that.#actionBlockService.view.onShowMainPage();
      this.scrollService.setPositionTop();
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
          yesSir.actionBlockService.saveActionBlocksFromFile(content_of_file);

          // Give possibility to load the same file again.
          $(".btn_upload_actionBlocks").value = "";

          window.location.hash = "main";
        }
      });

      $(".btn_download_actionBlocks")[0].addEventListener("click", () => {
        yesSir.actionBlockService.downloadFileWithActionBlocks();
      });

      $("#elements_for_file_manager").show();

      this.scrollService.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        "#" + this.PAGE_NAME_ENUM.speechRecognition
      )
    ) {
      console.log("speechRecognition");
      // $('.content').hide();
      $(".fixed_elements").hide();
      $(".speech_recognition_container").show();

      this.scrollService.setPositionTop();
    } else if (
      hashParamsInLowerCase.has(this.PAGE_NAME_ENUM.actionBlock.toLowerCase())
    ) {
        const idFromUrl = hashParamsInLowerCase.get(this.PAGE_NAME_ENUM.actionBlock.toLowerCase());

        that.#actionBlockService.executeActionBlockById(idFromUrl);
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
      that.#actionBlockService.showActionBlocksByRequest(
        request,
        isExecuteActionBlockByTitle
      );
      // this.searchService.setTextToInputField(request);

      this.scrollService.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.createActionBlock
      )
    ) {
      this.#actionBlockService.showSettingsToCreateAdvancedActionBlock();

      this.scrollService.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.createNote
      )
    ) {
      this.#actionBlockService.showSettingsToCreateNote();
      this.scrollService.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.createLink
      )
    ) {
      this.#actionBlockService.showSettingsToCreateLink();
      this.scrollService.setPositionTop();
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
      this.#actionBlockService.openActionBlockSettings(title);
      this.scrollService.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.savetodatabase
      )
    ) {
      yesSir.actionBlockService.saveToDatabase();
      this.scrollService.setPositionTop();
    } else if (
      this.getNormalizedCurrentHash().includes(
        this.PAGE_NAME_ENUM.getfromdatabase
      )
    ) {
      this.#actionBlockService.getFromDatabase();
      this.scrollService.setPositionTop();
    } else if (this.getNormalizedCurrentHash() === "#mainprevious") {
      $("#content_executed_from_actionBlock").css("display", "none");
      $("#btn_close").css("display", "none");
      $(".btn_open_settings_actionBlock").css("display", "none");
      $(".btn_open_command_palette").css("display", "none");
      $("#btn_back").css("display", "none");

      // $('#actionBlocks_page').css('display', 'block');
      this.#actionBlockService.showActionBlocksContainer();
      const scrollPositionOnExecuteActionBlock =
        yesSir.actionBlockService.getScrollPositionOnExecuteBlock();
      const indexLastShowedActionBlock =
        this.#actionBlockService.getIndexLastShowedActionBlock();

      if (indexLastShowedActionBlock === 0) {
        this.openPreviousPage();
      } else {
        yesSir.scrollService.setPosition(
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

  #getHashParams() {
    // Get hash and remove '#'.
    const hashString = window.location.hash.slice(1); 

    // Create object of parameters.
    const hashParams = new URLSearchParams(hashString);

    return hashParams;
  }

  #getHashParamsInLowerCase() {
    const hashParams = this.#getHashParams();

    // Create a new empty URLSearchParams object
    const lowerCaseHashParams = new URLSearchParams();

    hashParams.forEach((value, key) => {
      lowerCaseHashParams.append(key.toLowerCase(), value);
    });

    return lowerCaseHashParams;
  }
}
