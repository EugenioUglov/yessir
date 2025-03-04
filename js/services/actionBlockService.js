class ActionBlockService {
  #dateManager;

  #index_last_showed_actionBlock = 0;
  #scroll_position_on_execute_block = 0;

  constructor(
    dbManager,
    fileManager,
    textManager,
    dropdownManager,
    dataStorageService,
    mapDataStructure,
    logsService,
    dialogWindow,
    keyCodeByKeyName,
    scrollService,
    searchService,
    loadingService,
    hashService,
    noteService,
    dateManager,
    modalLoadingService
  ) {
    this.fileManager = fileManager;
    this.textManager = textManager;
    this.dataStorageService = dataStorageService;
    this.logsService = logsService;
    this.dialogWindow = dialogWindow;
    this.keyCodeByKeyName = keyCodeByKeyName;
    this.mapDataStructure = mapDataStructure;
    this.scrollService = scrollService;
    this.searchService = searchService;
    this.loadingService = loadingService;
    this.hashService = hashService;
    this.noteService = noteService;
    this.modalLoadingService = modalLoadingService;

    this.#dateManager = dateManager;

    this.model = new ActionBlockModel(
      dbManager,
      textManager,
      dataStorageService,
      mapDataStructure,
      fileManager
    );
    this.view = new ActionBlockView(
      this.model.getActionNameEnum(),
      this.model.getContentTypeDescriptionByActionEnum(),
      this.model.action_description_by_action_name,
      fileManager,
      textManager,
      dropdownManager
    );

    this.init();
  }

  init() {
    this.hashService.setActionBlockService(this);
  }

  async createActionBlockWithAutomationAsync(
    title,
    tags,
    action,
    content,
    image_URL,
    onEnd
  ) {
    const that = this;
    this.loadingService.startLoading();
    const nounNumber = new NounNumber();
    if (this.model.isActionBlockExist(title)) {
      alert('Action-Block with current title already exists. Title: ' + title);

      onEnd(false);
      return false;
    }

    // Cancel buttton in center.
    const cancel_button = document.createElement("button");
    cancel_button.appendChild(document.createTextNode("Cancel"));

    let is_canceled = false;

    $(cancel_button).css({
      position: "fixed",
      "z-index": "2000",
      padding: "10px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      cursor: "pointer",
      "border-radius": "100px",
      height: "150px",
      width: "150px",
      "background-color": "#a7a7a71f",
      color: "wheat",
    });

    $(cancel_button).on("click", () => {
      is_canceled = true;
      hideLoadingElmenets();
      const isCreated = that.createActionBlock(title, tags, action, content, image_URL, onEnd);

      // if (onEnd != undefined) onEnd();
    });

    document.body.appendChild(cancel_button);
    //

    const autmation_in_progress_text =
      'Automation in progress. It can take a while.\n\nYou can click "Cancel" button to skip automation works.';

    let top_fixed_info_container_height = document.getElementsByClassName(
      "fixed-text-info-container"
    )[0].offsetHeight;

    showLoadingElmenets();

    const getSingularizedWordsPromise = new Promise((resolve, reject) => {
      const title_words = title.split(/[^a-z]+/i).filter(Boolean);

      nounNumber.getSingularizedWords(
        title_words,
        (singularized_words) => {
          resolve({
            status: "success",
            singularized_words: singularized_words,
          });
        },
        (error) => {
          resolve({ status: "error", message: error });
        }
      );
    });

    //  Get image rom unspash IF uer didn't set image.
    const getImagePromise = new Promise((resolve, reject) => {
      if (image_URL === undefined || image_URL === "") {
        const unspash_image_searcher = new UnsplashImageSearcher();
        unspash_image_searcher.getImageByKeyword(
          title,
          1,
          (image_from_unsplash) => {
            if (image_from_unsplash != undefined && image_from_unsplash != "") {
              image_URL = image_from_unsplash;
            }
            resolve(image_URL);
          }
        );
      } else {
        resolve(image_URL);
      }
    });

    getImagePromise
      .then((received_image_URL) => {
        console.log(received_image_URL);
        console.log(image_URL);
      })
      .catch((err) => console.log(err))
      .finally(() => {});

    getSingularizedWordsPromise
      .then((received_image_URL) => {
        console.log(received_image_URL);
        console.log(image_URL);
      })
      .catch((err) => console.log(err));

    return await Promise.all([getSingularizedWordsPromise, getImagePromise])
      .then((values) => {
        if (is_canceled) return false;

        hideLoadingElmenets();
        let singularized_words_obj = values[0];

        let image_URL = values[1];
        if (singularized_words_obj.status === "success") {
          const singularized_words = singularized_words_obj.singularized_words;
          singularized_words.forEach((singularized_word) => {
            if (singularized_word) tags += ", " + singularized_word;
          });
        }

        const isCreated = that.createActionBlock(title, tags, action, content, image_URL);

        if (onEnd != undefined) onEnd();
      })
      .catch((error) => {
        console.log(error);
      });

    function showLoadingElmenets() {
      $(".fixed-text-info-container").show();
      $(".gray-foreground").show();

      setTextForFixedTextInfo(autmation_in_progress_text);
    }

    function hideLoadingElmenets() {
      cancel_button.parentNode.removeChild(cancel_button);
      $(".fixed-text-info-container").hide();
      $(".fixed-text-info").text("");
      $(".gray-foreground").hide();
    }

    function setTextForFixedTextInfo(new_text) {
      let fixed_text_info = $(".fixed-text-info").text(new_text);

      fixed_text_info.html(fixed_text_info.html().replace(/\n/g, "<br/>"));

      $(".fixed-text-info").css(
        "margin-top",
        top_fixed_info_container_height / 2
      );
    }
  }

  createActionBlock = (title, tags, action, content, image_URL, onEnd) => {
    const actionBlock = {
      title: title,
      tags: tags,
      action: action,
      content: content,
      imageURL: image_URL,
    };

    const is_created = this.model.add(actionBlock);


    if (is_created === false) {
      console.log('onEnd', onEnd);
      if (onEnd != undefined) onEnd(false);
      return false;
    }

    if (window.location.href.includes("#main&speechrecognition")) {
      yesSir.loadingService.stopLoading();
      if (onEnd != undefined) onEnd(true);
      return true;
    }

    this.view.closeSettings();
    this.view.clearAllSettingsFields();
    this.hashService.openPreviousPage();
    this.loadingService.stopLoading();
    this.updatePage();
    this.#onActionBlocksStorageUpdated();
    if (onEnd != undefined) onEnd(true);

    return true;
  };

  getActionBlockByTitle(title) {
    return this.model.getActionBlockByTitle(title);
  }

  setDefaultValuesForSettingsElementsActionBlock() {
    this.view.setDefaultValuesForSettingsElementsActionBlock();
  }

  switchStateMenuTypeActionBlocksToCreate = () => {
    if (this.model.is_menu_create_type_actionBlock_open) {
      this.view.hideListOfTypeActionBlocksToCreate();
    } else {
      this.view.showListOfTypeActionBlocksToCreate();
    }

    this.view.rotateFixedBtnPlus();

    this.model.is_menu_create_type_actionBlock_open =
      !this.model.is_menu_create_type_actionBlock_open;
  };

  showSettingsToCreateNote = () => {
    this.showSettingsToCreateActionBlock(
      this.model.getActionNameEnum().showInfo
    );

    if (this.model.is_menu_create_type_actionBlock_open) {
      this.switchStateMenuTypeActionBlocksToCreate();
    }
  };

  showSettingsToCreateLink = () => {
    this.showSettingsToCreateActionBlock(
      this.model.getActionNameEnum().openURL
    );

    if (this.model.is_menu_create_type_actionBlock_open) {
      this.switchStateMenuTypeActionBlocksToCreate();
    }
  };

  showSettingsToCreateFolder = () => {
    this.showSettingsToCreateActionBlock(
      this.model.getActionNameEnum().openFolder
    );

    if (this.model.is_menu_create_type_actionBlock_open) {
      this.switchStateMenuTypeActionBlocksToCreate();
    }
  };

  showSettingsToCreateAdvancedActionBlock = () => {
    this.showSettingsToCreateActionBlock(
      this.model.getActionNameEnum().openURL
    );

    if (this.model.is_menu_create_type_actionBlock_open) {
      this.switchStateMenuTypeActionBlocksToCreate();
    }
  };

  setActionBlocks(new_actionBlocks) {
    this.model.setActionBlocks(new_actionBlocks);
  }

  getActionBlocks() {
    return this.model.getActionBlocks();
  }

  getActionBlocksByPhrase(phrase) {
    return this.model.getByPhrase(phrase);
  }

  showActionBlocks(
    actionBlocks_to_show,
    count_actionBlocks_to_show_at_time = 50
  ) {
    const that = this;

    const time_start_show_actionBlocks = new Date();
    yesSir.loadingService.startLoading();
    // this.loadingService.startLoading();
    this.view.hideActionBlocksContainer();

    this.#index_last_showed_actionBlock = 0;

    if (actionBlocks_to_show === undefined) {
      actionBlocks_to_show = [];
      const actionBlocks_to_show_map = this.model.getActionBlocks();

      for (const [key, value] of actionBlocks_to_show_map) {
        actionBlocks_to_show.push(value);
      }

      // Reverse array without rewriting variable.
      actionBlocks_to_show = Array.from(actionBlocks_to_show).reverse();
    }

    if (!actionBlocks_to_show || actionBlocks_to_show.size === 0) {
      this.view.onOpenMainPageWithoutActionBlocks();
    } else {
      this.view.onOpenMainPageWithActionBlocks();
    }

    this.view.onShowMainPage();

    that.model.actionBlocks_to_show = actionBlocks_to_show;

    this.view.clear();

    let i = 0;

    for (const [
      key,
      actionBlock,
    ] of that.model.actionBlocks_to_show.entries()) {
      if (i >= count_actionBlocks_to_show_at_time - 1) {
        break;
      }

      that.showActionBlock(actionBlock);

      i++;
    }

    that.#index_last_showed_actionBlock = i;

    this.bindClickActionBlock(
      this.#onClickActionBlock,
      this.#onClickBtnShowSettingsActionBlock
    );

    // const elements_to_show =
    that.view.showActionBlocksContainer();

    // elements_to_show.forEach(element => {
    //     this.hashService.showElement(element);
    // });

    updateLogMessage();

    function updateLogMessage() {
      const data_storage =
        that.dataStorageService.getStorageNameEnum()[
          that.dataStorageService.getUserStorage()
        ];
      const storage_for_log = {};
      storage_for_log[that.dataStorageService.getStorageNameEnum().database] =
        "database";
      storage_for_log[
        that.dataStorageService.getStorageNameEnum().localStorage
      ] = "browser";

      let log = "Found " + actionBlocks_to_show.length + " results";

      // if (localStorage[localStorage.usernameIndex] != undefined) {
      //     log += ' | Storage: browser';
      // }
      // else {
      //     log += ' | Storage: database (firebase)';
      // }

      if (navigator.onLine === false) {
        log += " | Offline";
      }

      that.logsService.showLog(log);
    }

    const time_end_show_actionBlocks = new Date();

    const time_spent_show_actionBlocks =
      time_end_show_actionBlocks - time_start_show_actionBlocks;

    yesSir.loadingService.stopLoading();
  }

  showActionBlocksContainer() {
    this.view.showActionBlocksContainer();
  }

  showActionBlocksByTags(user_plus_tags, user_minus_tags) {
    // Get command text from input field and find possible search data.
    let actionBlocks_to_show = this.model.getActionBlocksByTags(
      user_plus_tags,
      user_minus_tags
    );

    if (!actionBlocks_to_show) {
      actionBlocks_to_show = [];
    }

    // Show Action-Blocks separated by pages.
    this.showActionBlocks(actionBlocks_to_show);
  }

  showActionBlocksFromStorage = () => {
    const that = this;
    let start = new Date();
    
    this.model.setActionBlocksFromUserStorageAssync(
      onSetActionBlocks,
      onUserStorageDifferentFromLocal
    );

    function onSetActionBlocks() {
      that.hashService.init();
      const time = new Date() - start;
      console.log("time:" + time);
    }

    function onUserStorageDifferentFromLocal() {
      that.downloadFileWithActionBlocks(
        that.model.getActionBlocksFromLocalStorageAsync()
      );
      that.hashService.init();
    }
  };

  showActionBlocksByRequest(request, is_execute_actionBlock_by_title = true) {
    const that = this;

    let actionBlocks_to_show;

    if (request === "") {
      // Show data in images.
      that.showActionBlocks();

      return;
    }

    // Get request text from input field and find possible search data.
    actionBlocks_to_show = this.model.getByPhrase(request);

    // Set Action-Block by title at the beginning. And remove this Action-Block from position where it was before.
    const actionBlock_by_title = this.model.getActionBlockByTitle(request);

    if (actionBlock_by_title) {
      var index = actionBlocks_to_show.indexOf(actionBlock_by_title);
      actionBlocks_to_show.splice(index, 1);

      actionBlocks_to_show.unshift(actionBlock_by_title);
    }
    //

    if (!actionBlocks_to_show) {
      actionBlocks_to_show = [];
    }

    if (is_execute_actionBlock_by_title) {
      let is_actionBlock_exist = false;

      // IF ActionBlock has been found with the same title THEN execute action.
      for (const actionBlock of actionBlocks_to_show) {
        if (that.textManager.isSame(actionBlock.title, request)) {
          is_actionBlock_exist = true;
          that.executeActionBlockByTitle(actionBlock.title);
          that.view.hidePage();
          break;
        }
      }
      if (is_actionBlock_exist === false) {
        this.#index_last_showed_actionBlock = 0;
        // Show Action-Blocks separated by pages.
        this.showActionBlocks(actionBlocks_to_show);
      }
    } else {
      this.#index_last_showed_actionBlock = 0;
      // Show Action-Blocks separated by pages.
      this.showActionBlocks(actionBlocks_to_show);
    }

    // IF has been found just one infoObject THEN execute action.
    /*
    if (actionBlocks_to_show.length === 1) {
        let infoObj = actionBlocks_to_show[0];
        actionBlockController.executeActionBlock(infoObj);
    }
    */
  }

  getIndexLastShowedActionBlock() {
    return this.#index_last_showed_actionBlock;
  }

  showActionBlock(actionBlock) {
    const actionBlock_html = this.view.addOnPage(
      actionBlock.title,
      actionBlock
    );
  }

  // showElementsForVoiceRecognitionManager() {
  //     this.view.showElementsForVoiceRecognitionManager();
  // }

  #showSettingsToCreateActionBlock() {
    const that = this;

    const view_elements_to_show = this.view.showSettingsToCreateActionBlock();
    view_elements_to_show.forEach((element) => {
      // that.hashService.showElement(element);
    });
  }

  getScrollPositionOnExecuteBlock() {
    return this.#scroll_position_on_execute_block;
  }

  executeActionBlockByTitle(title) {
    const that = this;

    // if (this.is_actionBlock_executed) return;

    const actionBlock = this.model.getActionBlockByTitle(title);
    // console.log('I took action block by title ' + title);
    // console.log(actionBlock);

    let action_name_of_actionBlock = actionBlock.action;

    let content = actionBlock.content;

    if (content === undefined) {
      // console.log('Warning! Something wrong with contant. ' + 'Maybe you use "content" instead "info" for ' + 'Action-Blocks or content is undefined');
      content = actionBlock.info;
    }

    // Support old version with old action names.
    // if (action_name_of_actionBlock === 'showAlert') action_name_of_actionBlock = this.model.getActionNameEnum().showInfo;
    // else if (action_name_of_actionBlock === 'openUrl') action_name_of_actionBlock = this.model.getActionNameEnum().openURL;

    this.#scroll_position_on_execute_block =
      this.scrollService.getScrollXY()[1];

    if (
      action_name_of_actionBlock === this.model.getActionNameEnum().openURL ||
      action_name_of_actionBlock === this.model.getActionNameEnum().openUrl
    ) {
      const url = this.#getValidURL(content);

      // var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      // if (isSafari) {
      //     location.href = url;
      // }
      // else {
      //     let new_tab = window.open(url, '_blank');
      // }

      let new_tab = window.open(url, "_blank");

      if (!new_tab || new_tab.closed || typeof new_tab.closed == "undefined") {
        // Popup is blocked.

        location.href = url;
      }

      return;
    }
    // Action alertInfo must to include info option.
    else if (
      action_name_of_actionBlock === this.model.getActionNameEnum().showInfo
    ) {
      const isHTML = false;

      this.onPageContentChange();
      this.view.showContentOfActionBlock();
      this.noteService.openNote(content, actionBlock.title, isHTML);

      this.model.title_actionBlock_before_update = $('.note_title').text();

      this.view.hidePage();
      // that.scrollService.setPositionTop();

      onNoteOpened();
    } else if (
      action_name_of_actionBlock === this.model.getActionNameEnum().showHTML
    ) {
      this.onPageContentChange();
      const isHTML = true;
      

      this.noteService.openNote(content, actionBlock.title, isHTML);
      
      this.model.title_actionBlock_before_update = $('.note_title').text();

      onNoteOpened();

      $("#content_executed_from_actionBlock").show();

      // Set position top.
      that.scrollService.setPosition(0, 0);
    } else if (
      action_name_of_actionBlock === this.model.getActionNameEnum().openFolder
    ) {
      //console.log('open folder from actionblock');
      this.openFolder(i_actionBlock);

      this.searchService.setTextToInputField(content);
      this.searchService.focusInputField();
    } else {
      /*
        else if (action_name_of_actionBlock === this.model.getActionNameEnum().showFileManager) {
            this.onPageContentChange();
            this.view.showElementsForFileManager();
        }
        */
      // console.log('ERROR! Action of Action-Block doesn\'t exist. action_name: ', action_name_of_actionBlock);
      return;
    }

    // !!!
    function onNoteOpened() {
    //   const inputFieldWithSuggestions = new InputFieldWithSuggestions();
    //   const actionBlockNoteCommands = new ActionBlockNoteCommands(inputFieldWithSuggestions);

    //   inputFieldWithSuggestions.create();

    //   inputFieldWithSuggestions.setOptions({optionObjects: actionBlockNoteCommands.getCurrentCommandObjects()});
    }
  }

  addOnPageNextActionBlocks() {
    if (this.model.actionBlocks_to_show === undefined) {
      return;
    }

    let count_actionBlocks_curr = 0;
    let max_count_actionBlocks_to_add_on_page = 50;

    const actionBlocks = this.model.actionBlocks_to_show;

    let i;

    this.loadingService.startLoading();

    // console.log('this.#index_last_showed_actionBlock', this.#index_last_showed_actionBlock);

    for (
      i = this.#index_last_showed_actionBlock;
      i < actionBlocks.length;
      i++
    ) {
      if (count_actionBlocks_curr >= max_count_actionBlocks_to_add_on_page) {
        break;
      }

      this.showActionBlock(actionBlocks[i]);
      count_actionBlocks_curr++;
    }

    this.#index_last_showed_actionBlock = i;

    this.bindClickActionBlock(
      this.#onClickActionBlock,
      this.#onClickBtnShowSettingsActionBlock
    );
    this.loadingService.stopLoading();
  }

  updatePage() {
    this.view.updatePage();

    // Refresh Action-Blocks on page.
    this.showActionBlocks();

    // Scroll top.
    // this.scrollService.scrollTo();
  }

  saveToDatabase(actionBlocksMapString) {
    const that = this;
    const firebaseData = new FirebaseData();
       
    if (actionBlocksMapString === undefined) {
        actionBlocksMapString = yesSir.mapDataStructure.getStringified(yesSir.actionBlockService.getActionBlocks());
    }

    $('.login-panel').show();

    $(".btn-submit").click(function(e) {
        e.preventDefault();

        yesSir.modalBoxService.show({
            header_text:'Loading', 
            body_text:'Data is being verified..'
        });

        const inputUsername = $('.input-username').val();
        const inputPassword = $('.input-password').val();
    
        that.model.saveActionBlocksToDatabaseAsync({
            inputUsername: inputUsername, 
            inputPassword: inputPassword,
            database: firebaseData,
            actionBlocksMapString: actionBlocksMapString,
            onSuccess: () => {
                $('.login-panel').hide();
    
                yesSir.modalBoxService.show({
                    header_text:'Success', 
                    body_text:'Data saved successfully to firebase database.'
                });
        
                setTimeout(() => {
                    yesSir.modalBoxService.hide();
                }, "3000");
    
                yesSir.hashService.openMainPage();
            },
            onError: error => {
                alert("Error! Data could not be saved. " + error);
                yesSir.modalBoxService.hide();
            }
        });
    });
  }

  getFromDatabase() {
    const that = this;

    $('.login-panel').show();

    $(".btn-submit").click(function(e) {
      e.preventDefault();

      yesSir.modalBoxService.show({header_text:'Loading', body_text:'Data is being verified..'});

      const inputUsername = $('.input-username').val();
      const inputPassword = $('.input-password').val();

      that.model.getActionBlocksFromDatabaseAsync({
        inputUsername: inputUsername,
        inputPassword: inputPassword,
        database: new FirebaseData(),
        onGetActionBlocks: receivedActionBlocksMapString => {
          if (receivedActionBlocksMapString) {
            const actionBlocks = that.mapDataStructure.getParsed(receivedActionBlocksMapString);

            localStorage['username'] = inputUsername;

            that.model.setActionBlocks(actionBlocks);

            yesSir.modalBoxService.show({
              header_text:'Success', 
              body_text:'Receiving data from firebase database has been completed.'
            });
  
            setTimeout(() => {
              yesSir.modalBoxService.hide();
            }, "3000");
            
  
            $('.login-panel').hide();
          }
  
          that.hashService.openMainPage();
        },
        onError: error => {
          yesSir.modalBoxService.hide();
          alert(error); 
        }
      });
    });
  }

  save(actionBlocks) {
    this.model.saveAsync(actionBlocks);
  }

  saveActionBlocksFromFile(content_of_file) {
    let actionBlocks_from_file;

    if (content_of_file === undefined) {
      alert("Error! Data from the file has not been loaded");
      return;
    }

    try {
      actionBlocks_from_file = this.mapDataStructure.getParsed(content_of_file);
    } catch (error) {
      alert(
        "Content of file is not correct. File must contain an Action-Blocks data."
      );
      // console.log(error);
      return;
    }

    this.model.setActionBlocks(actionBlocks_from_file);
  }

  deleteAllActionBlocks() {
    const that = this;
    const text_confirm_window =
      "Are you sure you want to delete ALL Action-Blocks?";

    function onClickOkConfirm() {
      // Clear model variable with Action-Blocks and show it.
      that.model.deleteActionBlocks();
      that.#onActionBlocksStorageUpdated();
      return;
    }

    function onClickCancelConfirm() {
      return;
    }

    this.dialogWindow.confirmAlert(
      text_confirm_window,
      onClickOkConfirm,
      onClickCancelConfirm
    );
  }

  downloadFileWithActionBlocks = (actionBlocks) => {
    if (!actionBlocks) actionBlocks = this.model.getActionBlocks();
    const content = this.mapDataStructure.getStringified(actionBlocks);
    const date_now = this.#dateManager.getDateNow();
    const time_now = this.#dateManager.getTimeNow();

    const date_text = date_now + "-" + time_now;

    // Set variable for name of the saving file with date and time.
    const file_name = "Action-Blocks " + date_text;
    const extension = ".json";

    download(content, file_name, extension);

    // Function to download data to a file
    function download(data, filename, type) {
      var file = new Blob([data], {type: type});
      if (window.navigator.msSaveOrOpenBlob) // IE10+
          window.navigator.msSaveOrOpenBlob(file, filename);
      else { // Others
          var a = document.createElement("a"),
                  url = URL.createObjectURL(file);
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
          }, 0);
      }
    }
  
    // !!!
    // this.fileManager.downloadFile(content, file_name, extension);
  };

  uploadFileWithActionBlocks = (content_of_file) => {
    if (content_of_file === undefined) {
      alert("Error! Data from the file has not been loaded");
      return;
    }

    // Get actionBlocks from the file.
    let actionBlocks_from_file;

    this.modalLoadingService.show();

    try {
      actionBlocks_from_file = this.mapDataStructure.getParsed(content_of_file);
    } catch (error) {
      alert(
        "Content of file is not correct. File must contain an Action-Blocks data."
      );
      this.modalLoadingService.hide();
      return;
    }

    this.view.closeSettings();
    this.model.setActionBlocks(actionBlocks_from_file);
    this.scrollService.setPositionTop();
    this.showActionBlocks();
    this.searchService.clearInputField();
    this.modalLoadingService.hide();
  };

  bindClickActionBlock(
    clickActionBlockHandler,
    clickSettingsActionBlockHandler
  ) {
    this.view.bindClickActionBlock(
      clickActionBlockHandler,
      clickSettingsActionBlockHandler
    );
  }

  isActionBlocksPageActive() {
    return this.view.isActionBlocksPageActive;
  }

  rewriteActionBlocks = function () {
    const that = this;
    const text_confirm_window =
      "All current Action-Blocks will be deleted " +
      "and replaced with Action-Blocks retrieved from the database." +
      "\n" +
      "Are you sure you want to replace it now?";

    this.dialogWindow.confirmAlert(
      text_confirm_window,
      onClickOkConfirm,
      onClickCancelConfirm
    );

    function onClickOkConfirm() {
      that.modalLoadingService.show();
      $("#dialog_database_manager")[0].close();
      that.model.setActionBlocks(that.model.actionBlocks_from_database);
      this.scrollService.setPositionTop();
      that.showActionBlocks();
      that.modalLoadingService.hide();

      return;
    }

    function onClickCancelConfirm() {
      return;
    }
  };

  #onActionBlockUpdated = () => {
    this.hashService.openPreviousPage();
    this.loadingService.stopLoading();
    this.view.closeSettings();
    this.view.setDefaultValuesForSettingsElementsActionBlock();
    // Scroll top.
    this.scrollService.scrollTo();
    this.view.updatePage();
    // Refresh Action-Blocks on page.
    this.scrollService.setPositionTop();
    this.showActionBlocks();
    this.modalLoadingService.hide();
    this.#onActionBlocksStorageUpdated();
  }

  updateActionBlock = (title, tags, selected_action, content, image_url) => {
    this.modalLoadingService.show();

    const is_updated = this.model.updateActionBlock(
      title,
      tags,
      selected_action,
      content,
      image_url
    );

    if (is_updated === false) {
      this.modalLoadingService.hide();

      return false;
    }

    this.#onActionBlockUpdated();
  };

  
  updateQuicklyEditedActionBlock = ({title, content}) => {
    this.modalLoadingService.show();

    const actionBlockBeforeUpdate = this.model.getActionBlockByTitle(this.model.title_actionBlock_before_update);

    const tags = actionBlockBeforeUpdate.tags;
    const selected_action = actionBlockBeforeUpdate.action;
    const imageURL = actionBlockBeforeUpdate.imageURL;

    const is_updated = this.model.updateActionBlock(
      title,
      tags,
      selected_action,
      content,
      imageURL
    );

    if (is_updated === false) {
      this.modalLoadingService.hide();

      return false;
    }

    $('#btn_quick_update_actionBlock').hide();
    $('.inputFieldWithSuggestions').val('')

    this.#onActionBlockUpdated();
  };

  updateDefaultActionBlocks = () => {
    const that = this;
    const is_show_alert_on_error = false;

    const actionBlocks_to_create = this.model.getDefaultActionBlocks();

    // Delete previous default Action-Blocks.
    for (const actionBlock_to_delete of actionBlocks_to_create) {
      // Update site.
      this.model.deleteActionBlockByTitle(
        actionBlock_to_delete.title,
        is_show_alert_on_error
      );
    }

    // Create default Action-Blocks.
    createDefaultActionBlocks();
    this.scrollService.setPositionTop();
    this.showActionBlocks();

    return;

    function createDefaultActionBlocks() {
      actionBlocks_to_create.forEach((actionBlock) => {
        that.createActionBlock(
          actionBlock.title,
          actionBlock.tags,
          actionBlock.action,
          actionBlock.content,
          actionBlock.imageURL,
          actionBlock.isEditable
        );
      });
    }
  };

  deleteActionBlock = (title) => {
    const that = this;

    this.hashService.openPreviousPage();
    // this.loadingService.stopLoading();
    this.view.closeSettings();

    const text_confirm_window =
      "Are you sure you want to delete" + "\n" + ' "' + title + '" ?';

    function onClickOkConfirm() {
      that.modalLoadingService.show();
      that.model.deleteActionBlockByTitle(title);

      that.updatePage();
      that.modalLoadingService.hide();

      return;
    }

    function onClickCancelConfirm() {
      return;
    }

    this.dialogWindow.confirmAlert(
      text_confirm_window,
      onClickOkConfirm,
      onClickCancelConfirm
    );

    this.#onActionBlocksStorageUpdated();
  };

  openFolder(actionBlock_title) {
    // !!! not tested
    // OLD
    // const actionBlocks = this.model.getActionBlocks();
    // const actionBlock = actionBlocks.get(actionBlock_title);
    // NEW
    const actionBlock = this.model.getActionBlockByTitle(actionBlock_title);
    const tags_to_search = actionBlock.content;

    let actionBlocks_to_show;

    if (!tags_to_search) {
      // console.log('Warning! Tags for folder don\'t exist');
      return;
    }

    this.view.clear();
    // Get command text from input field and find possible search data.
    actionBlocks_to_show = this.model.getByPhrase(tags_to_search);

    // Delete a folder from array. In order to don't show a folder with Action-Blocks.
    // if (i_actionBlock >= 0) {
    //     actionBlocks_to_show.splice(i_actionBlock, 1);
    // }

    this.scrollService.setPositionTop();
    this.showActionBlocks(actionBlocks_to_show);

    /*
        if (actionBlocks_to_show.length === 1) {
            // Open the first infoObject
    
            let infoObj = actionBlocks_to_show[0];
            this.executeActionBlock(infoObj);
        }
        */
  }

  #onActionBlocksStorageUpdated() {
    // this.saveToDatabase();
  }

  #onClickActionBlock = (title) => {
    let actionBlock = this.model.getActionBlockByTitle(title);
    if (
      actionBlock.action === this.model.getActionNameEnum().openURL ||
      actionBlock.action === this.model.getActionNameEnum().openUrl
    ) {
      const url = this.#getValidURL(actionBlock.content);
      let new_tab = window.open(url, "_blank");

      if (!new_tab || new_tab.closed || typeof new_tab.closed == "undefined") {
        // Popup is blocked.

        location.href = url;
      }
    } else {
      this.hashService.openActionBlockPage(title);
    }

    if (this.model.is_menu_create_type_actionBlock_open)
      this.switchStateMenuTypeActionBlocksToCreate();
  };

  #onClickBtnShowSettingsActionBlock = (title) => {
    this.#scroll_position_on_execute_block =
      this.scrollService.getScrollXY()[1];

    this.hashService.openSettingsActionBlockPage(title);
  };

  showSettingsToCreateActionBlock = (action_name) => {
    this.#scroll_position_on_execute_block =
      this.scrollService.getScrollXY()[1];
    this.model.action_for_new_actionBlock = action_name;

    this.view.showSettingsToCreateActionBlock(action_name);
    this.onPageContentChange();
  };

  #getValidURL(url) {
    let valid_url = url;

    if (url.toLowerCase().includes("http") === false) {
      valid_url = "http://" + url;
    }

    return valid_url;
  }

  openActionBlockSettings = (title) => {
    this.hashService.hideShowedElements();
    const that = this;
    /// !!!
    // OLD
    // const actionBlocks = this.model.getActionBlocks();
    // const actionBlock = actionBlocks.get(title);
    // NEW
    const actionBlock = this.model.getActionBlockByTitle(title);
    this.hashService.openSettingsActionBlockPage(title);
    this.model.title_actionBlock_before_update = title;
    this.onPageContentChange();
    const elements_to_show =
      this.view.showElementsToEditActionBlock(actionBlock);
    that.hashService.hideShowedElements();

    elements_to_show.forEach((element) => {
      that.hashService.showElement(element);
    });
  };

  clearAllSettingsFields() {
    this.view.clearAllSettingsFields();
  }

  onPageContentChange() {
    if (this.model.is_menu_create_type_actionBlock_open)
      this.switchStateMenuTypeActionBlocksToCreate();
    this.view.onPageContentChange();
  }

  closeActionBlockSettings = () => {
    yesSir.voiceRecognitionService.stopRecognizing();
    this.hashService.openPreviousPage();
  };
}
