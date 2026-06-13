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
      this.model.actionDescriptionByActionName,
      fileManager,
      textManager,
      dropdownManager
    );

    this.hashService.setActionBlockService(this);
  }


  async createActionBlockWithAutomationAsyncOld(
    title,
    tags,
    action,
    content,
    imageURL,
    onEnd
  ) {
    const that = this;
    this.loadingService.startLoading();
    const nounNumber = new NounNumber();

    if (this.model.isActionBlockExist(title)) {
      alert('Action-Block with current title already exists. Title: ' + title);

      if (onEnd) onEnd(false);
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
      const isCreated = that.createActionBlock(title, tags, action, content, imageURL, onEnd);

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
      const titleWords = title.split(/[^a-z]+/i).filter(Boolean);

      nounNumber.getSingularizedWords(
        titleWords,
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
      if (imageURL === undefined || imageURL === "") {
        const unspashImageSearcher = new UnsplashImageSearcher();
        unspashImageSearcher.getImageByKeyword(
          title,
          1,
          (imageFromUnsplash) => {
            if (imageFromUnsplash != undefined && imageFromUnsplash != "") {
              imageURL = imageFromUnsplash;
            }
            resolve(imageURL);
          }
        );
      } else {
        resolve(imageURL);
      }
    });

    getImagePromise
      .then((receivedImageURL) => {
        console.log(receivedImageURL);
        console.log(imageURL);
      })
      .catch((err) => console.log(err))
      .finally(() => {});

    getSingularizedWordsPromise
      .then((receivedImageURL) => {
        console.log(receivedImageURL);
        console.log(imageURL);
      })
      .catch((err) => console.log(err));

    return await Promise.all([getSingularizedWordsPromise, getImagePromise])
      .then((values) => {
        if (is_canceled) return false;

        hideLoadingElmenets();
        let singularizedWordsObj = values[0];

        let image_URL = values[1];
        if (singularizedWordsObj.status === "success") {
          const singularizedWords = singularizedWordsObj.singularized_words;
          singularizedWords.forEach((singularizedWord) => {
            if (singularizedWord) tags += ", " + singularizedWord;
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

  
  async createActionBlockWithOptimizedAutomationAsync(
    title,
    tags,
    action,
    content,
    image_URL,
    onEnd
  ) {
    const that = this;
    this.loadingService.startLoading();
    
    if (this.model.isActionBlockExist(title)) {
      alert('Action-Block with current title already exists. Title: ' + title);

      if (onEnd) onEnd(false);
      return false;
    }

    const isCreated = that.createActionBlock(title, tags, action, content, image_URL, onEnd);

    // !!!
    return;

    
    // const getSingularizedWordsPromise = new Promise((resolve, reject) => {
    //   const title_words = title.split(/[^a-z]+/i).filter(Boolean);

    //   nounNumber.getSingularizedWords(
    //     title_words,
    //     (singularized_words) => {
    //       resolve({
    //         status: "success",
    //         singularized_words: singularized_words,
    //       });
    //     },
    //     (error) => {
    //       resolve({ status: "error", message: error });
    //     }
    //   );
    // });

    let imagePromise = Promise.resolve();
    let tagsPromise = Promise.resolve();

    const statusBar = document.getElementById('status-bar');
  
    // Показываем: плашка "раздвигает" страницу
    statusBar.classList.replace('status-bar-hidden', 'status-bar-visible');

    setTagsForActionBlockAsync();
    if (!image_URL) setImageAutomaticallyForActionBlockAsync();

    function setTagsForActionBlockAsync() {
      const nounNumber = new NounNumber();
      const titleWords = title.split(/[^a-z]+/i).filter(Boolean);


      tagsPromise = new Promise((resolve) => {
          nounNumber.getSingularizedWords(titleWords, 
              (words) => resolve(words), 
              () => resolve([])
          );
      }).then(singularizedWords => {
          const actionBlock = that.getActionBlockByTitle(title);

          if (singularizedWords.length > 0) {
            that.model.updateActionBlockByTitle(
              title,
              actionBlock.title,
              [...actionBlock.tags, ...singularizedWords],
              actionBlock.action,
              actionBlock.content,
              receivedImg
            );

            const infoPanel = new InfoPanel();
            infoPanel.showPanel('Tags has been set');
          }
      });
    }

    function setImageAutomaticallyForActionBlockAsync() {
      const unspashSearcher = new UnsplashImageSearcher();
      imagePromise = new Promise((resolve) => {
          unspashSearcher.getImageByKeyword(title, 1, (img) => resolve(img));
      }).then(receivedImg => {
        const actionBlock = that.getActionBlockByTitle(title);

        if (actionBlock.imageURL != "" || receivedImg === "") return false;

        that.model.updateActionBlockByTitle(
          title,
          actionBlock.title,
          actionBlock.tags,
          actionBlock.action,
          actionBlock.content,
          receivedImg
        );

        const infoPanel = new InfoPanel();
        infoPanel.showPanel('Image has been set');
      });
    }

    this.handleAutomationEnd([imagePromise, tagsPromise], onEnd);
    
    /*
    return await Promise.all([getSingularizedWordsPromise, getImagePromise])
      .then((values) => {
        const actionBlock = that.getActionBlockByTitle(title);

        console.log('promise');

        if (!actionBlock) {
          console.error("Action Block не найден: " + title);
          return false;
        }

        const [singularized_words_obj, received_image_URL] = values;

        // Обновляем теги
        if (singularized_words_obj.status === "success") {
          const newTags = singularized_words_obj.singularized_words.filter(Boolean);
          if (newTags.length > 0) {
            // Добавляем к существующим тегам
            const existingTags = actionBlock.tags || "";
            actionBlock.tags = existingTags + (existingTags ? ", " : "") + newTags.join(", ");
          }
        }

        // Обновляем изображение
        if (received_image_URL && actionBlock.image_URL === "") {
          actionBlock.image_URL = received_image_URL;
        }

        // Триггерим обновление UI/переменных
        // this.#onUpdateVarialbeWithActionBlocks();
        that.model.updateActionBlockByTitle(
          title,
          actionBlock.title,
          actionBlock.tags,
          actionBlock.action,
          actionBlock.content,
          actionBlock.image_URL
        );

        if (onEnd) onEnd(true);
      })
    */
  }


  /**
   * Ждет завершения всех асинхронных задач и вызывает финальный callback
   * @param {Promise[]} tasks - массив выполняемых задач
   * @param {Function} onEnd - функция обратного вызова
   */
  handleAutomationEnd(tasks, onEnd) {
    Promise.allSettled(tasks).then((results) => {
      const statusBar = document.getElementById('status-bar');
        console.log("Вся автоматизация завершена", results);
        
        // Скрываем глобальную индикацию загрузки
        this.loadingService.stopLoading();
        if (typeof hideLoadingElements === 'function') {
            hideLoadingElements(); 
        }

        // Вызываем onEnd, если он был передан
        if (onEnd) {
            onEnd(true);
        }

        // Скрываем плашку, когда всё готово
        statusBar.classList.replace('status-bar-visible', 'status-bar-hidden');
    });
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

  getAllActionBlocksInArray() {
    const actionBlocks_to_show = [];
    const actionBlocks_map = this.model.getActionBlocks();

    for (const [key, value] of actionBlocks_map) {
      actionBlocks_to_show.push(value);
    }
  
    return Array.from(actionBlocks_to_show).reverse();
  }

  showActionBlocks(
    actionBlocksToShow,
    count_actionBlocks_to_show_at_time = 50
  ) {
    const that = this;

    const timeStartShowActionBlocks = new Date();
    yesSir.loadingService.startLoading();
    // this.loadingService.startLoading();
    this.view.hideActionBlocksContainer();

    this.#index_last_showed_actionBlock = 0;

    if (actionBlocksToShow === undefined) {
      actionBlocksToShow = this.getAllActionBlocksInArray();
    }

    if (!actionBlocksToShow || actionBlocksToShow.size === 0) {
      this.view.onOpenMainPageWithoutActionBlocks();
    } else {
      this.view.onOpenMainPageWithActionBlocks();
    }

    this.view.onShowMainPage();

    that.model.actionBlocks_to_show = actionBlocksToShow;

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

      let log = "Found " + actionBlocksToShow.length + " results";

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

    const timeEndShowActionBlocks = new Date();

    const time_spent_show_actionBlocks =
      timeEndShowActionBlocks - timeStartShowActionBlocks;

    yesSir.loadingService.stopLoading();
  }

  showActionBlocksContainer() {
    this.view.showActionBlocksContainer();
  }

  showActionBlocksByTags(userPlusTags, userMinusTags) {
    // Get command text from input field and find possible search data.
    let actionBlocksToShow = this.model.getActionBlocksByTags(
      userPlusTags,
      userMinusTags
    );

    if (!actionBlocksToShow) {
      actionBlocksToShow = [];
    }

    // Show Action-Blocks separated by pages.
    this.showActionBlocks(actionBlocksToShow);
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
      // console.log("time:" + time);
    }

    function onUserStorageDifferentFromLocal() {
      that.downloadFileWithActionBlocks(
        that.model.getActionBlocksFromLocalStorageAsync()
      );
      that.hashService.init();
    }
  };

  showActionBlocksByRequest(request, isExecuteActionBlockByTitle = true) {
    const that = this;

    let plusTags = [];
    let minusTags = [];

    let actionBlocksToShow;

    if (isExecuteActionBlockByTitle === false) {
      // Convert strings "tag1, tag2" into arrays of lowercase, trimmed strings
      // Get raw strings and split by spaces OR commas
      if (this.searchService.view.getPlusTags() != undefined) {
        plusTags = this.searchService.view.getPlusTags()
            .toLowerCase()
            .split(/[\s,]+/)
            .filter(t => t.length > 0); // Remove empty strings from extra spaces
      }

      if (this.searchService.view.getMinusTags() != undefined) {
        minusTags = this.searchService.view.getMinusTags()
            .toLowerCase()
            .split(/[\s,]+/)
            .filter(t => t.length > 0);
      }

      if (request === "" && plusTags.length === 0 && minusTags.length === 0) {
        // Show data in images.
        that.showActionBlocks();

        return;
      }
    }




    // Get request text from input field and find possible search data.
    actionBlocksToShow = this.model.getByPhrase(request);



    // Set Action-Block by title at the beginning. And remove this Action-Block from position where it was before.
    const actionBlockByTitle = this.model.getActionBlockByTitle(request);

    if (actionBlockByTitle) {
      var index = actionBlocksToShow.indexOf(actionBlockByTitle);
      actionBlocksToShow.splice(index, 1);

      actionBlocksToShow.unshift(actionBlockByTitle);
    }
    //

    if (!actionBlocksToShow) {
      // actionBlocks_to_show = [];
      actionBlocksToShow = that.getAllActionBlocksInArray();
    }

    if (isExecuteActionBlockByTitle === false) {
      // Filter the array before rendering
      if (plusTags.length > 0 || minusTags.length > 0) {
          actionBlocksToShow = actionBlocksToShow.filter(block => {
              // Flatten block.tags: ["urgent", "work project"] -> ["urgent", "work", "project"]
              const individualBlockTags = (block.tags || [])
                  .flatMap(tag => tag.toLowerCase().split(/[\s,]+/))
                  .filter(tag => tag.length > 0);

              // Logic: All plusTags must be present in the flattened block tags
              const matchesPlus = plusTags.every(searchTag => 
                  individualBlockTags.includes(searchTag)
              );

              // Logic: None of the minusTags should be present in the flattened block tags
              const matchesMinus = minusTags.some(searchTag => 
                  individualBlockTags.includes(searchTag)
              );

              return (plusTags.length === 0 || matchesPlus) && !matchesMinus;
          });
      }
    }


    if (isExecuteActionBlockByTitle) {
      let isActionBlockExist = false;

      // IF ActionBlock has been found with the same title THEN execute action.
      for (const actionBlock of actionBlocksToShow) {
        if (that.textManager.isSame(actionBlock.title, request)) {
          isActionBlockExist = true;
          that.executeActionBlockByTitle(actionBlock.title);
          that.view.hidePage();
          break;
        }
      }

      if (isActionBlockExist === false) {
        this.#index_last_showed_actionBlock = 0;
        // Show Action-Blocks separated by pages.
        this.showActionBlocks(actionBlocksToShow);
      }
    } else {
      this.#index_last_showed_actionBlock = 0;
      // Show Action-Blocks separated by pages.
      this.showActionBlocks(actionBlocksToShow);
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

    const viewElementsToShow = this.view.showSettingsToCreateActionBlock();
    viewElementsToShow.forEach((element) => {
      // that.hashService.showElement(element);
    });
  }

  getScrollPositionOnExecuteBlock() {
    return this.#scroll_position_on_execute_block;
  }

  executeActionBlockById(id) {
    const actionBlock = this.model.getActionBlockById(id);
    if (actionBlock) {
      this.executeActionBlockByTitle(actionBlock.title);

      return true;
    }

    return false;
  }

  executeActionBlockByTitle(title) {
    const that = this;

    // if (this.is_actionBlock_executed) return;

    const actionBlock = this.model.getActionBlockByTitle(title);
    // console.log('I took action block by title ' + title);
    // console.log(actionBlock);

    let actionNameOfActionBlock = actionBlock.action;

    let content = actionBlock.content;

    if (content === undefined) {
      // console.log('Warning! Something wrong with contant. ' + 'Maybe you use "content" instead "info" for ' + 'Action-Blocks or content is undefined');
      content = actionBlock.info;
    }

    // Support old version with old action names.
    // if (actionNameOfActionBlock === 'showAlert') actionNameOfActionBlock = this.model.getActionNameEnum().showInfo;
    // else if (actionNameOfActionBlock === 'openUrl') actionNameOfActionBlock = this.model.getActionNameEnum().openURL;

    this.#scroll_position_on_execute_block =
      this.scrollService.getScrollXY()[1];

    if (
      actionNameOfActionBlock === this.model.getActionNameEnum().openURL ||
      actionNameOfActionBlock === this.model.getActionNameEnum().openUrl
    ) {
      const url = this.#getValidURL(content);

      // var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      // if (isSafari) {
      //     location.href = url;
      // }
      // else {
      //     let newTab = window.open(url, '_blank');
      // }

      let newTab = window.open(url, "_blank");

      if (!newTab || newTab.closed || typeof newTab.closed == "undefined") {
        // Popup is blocked.

        location.href = url;
      }

      return;
    }
    // Action alertInfo must to include info option.
    else if (
      actionNameOfActionBlock === this.model.getActionNameEnum().showInfo
    ) {
      const isHTML = false;

      this.onPageContentChange();
      this.view.showContentOfActionBlock();
      this.noteService.openNote(content, actionBlock.title, isHTML);

      this.model.actionBlockTitleBeforeUpdate = $('.note_title').text();

      this.view.hidePage();
      // that.scrollService.setPositionTop();

      onNoteOpened();
    } else if (
      actionNameOfActionBlock === this.model.getActionNameEnum().showHTML
    ) {
      this.onPageContentChange();
      const isHTML = true;
      

      this.noteService.openNote(content, actionBlock.title, isHTML);
      
      this.model.actionBlockTitleBeforeUpdate = $('.note_title').text();

      onNoteOpened();

      $("#content_executed_from_actionBlock").show();

      // Set position top.
      that.scrollService.setPosition(0, 0);
    } else if (
      actionNameOfActionBlock === this.model.getActionNameEnum().openFolder
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

    $('.login-panel .close-icon').one('click', () => {
      $('.login-panel').css('display', 'none');
      window.location.hash = that.hashService.getPageNameEnum().main;
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

    $('.login-panel .close-icon').one('click', () => {
      $('.login-panel').css('display', 'none');
      window.location.hash = that.hashService.getPageNameEnum().main;
    });
  }

  save(actionBlocks) {
    this.model.saveAsync(actionBlocks);
  }

  saveActionBlocksFromFile(contentOfFile) {
    let actionBlocksFromFile;

    if (contentOfFile === undefined) {
      alert("Error! Data from the file has not been loaded");
      return;
    }

    try {
      actionBlocksFromFile = this.mapDataStructure.getParsed(contentOfFile);
    } catch (error) {
      alert(
        "Content of file is not correct. File must contain an Action-Blocks data."
      );
      // console.log(error);
      return;
    }

    this.model.setActionBlocks(actionBlocksFromFile);
  }

  deleteAllActionBlocks() {
    const that = this;
    const textConfirmWindow =
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
      textConfirmWindow,
      onClickOkConfirm,
      onClickCancelConfirm
    );
  }

  downloadFileWithActionBlocks = (actionBlocks) => {
    if (!actionBlocks) actionBlocks = this.model.getActionBlocks();
    const content = this.mapDataStructure.getStringified(actionBlocks);
    const dateNow = this.#dateManager.getDateNow();
    const timeNow = this.#dateManager.getTimeNow();

    const dateText = dateNow + "-" + timeNow;

    // Set variable for name of the saving file with date and time.
    const fileName = "Action-Blocks " + dateText;
    const extension = ".json";

    download(content, fileName, extension);

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

  uploadFileWithActionBlocks = (contentOfFile) => {
    if (contentOfFile === undefined) {
      alert("Error! Data from the file has not been loaded");
      return;
    }

    // Get actionBlocks from the file.
    let actionBlocksFromFile;

    this.modalLoadingService.show();

    try {
      actionBlocksFromFile = this.mapDataStructure.getParsed(contentOfFile);
    } catch (error) {
      alert(
        "Content of file is not correct. File must contain an Action-Blocks data."
      );
      this.modalLoadingService.hide();
      return;
    }

    this.view.closeSettings();
    this.model.setActionBlocks(actionBlocksFromFile);
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

  updateActionBlock = (title, tags, selectedAction, content, imageURL) => {
    this.modalLoadingService.show();

    const isUpdated = this.model.updateActionBlock(
      title,
      tags,
      selectedAction,
      content,
      imageURL
    );

    if (isUpdated === false) {
      this.modalLoadingService.hide();

      return false;
    }

    this.#onActionBlockUpdated();
  };

  
  updateQuicklyEditedActionBlock = ({title, content}) => {
    this.modalLoadingService.show();

    const actionBlockBeforeUpdate = this.model.getActionBlockByTitle(this.model.actionBlockTitleBeforeUpdate);

    const tags = actionBlockBeforeUpdate.tags;
    const selected_action = actionBlockBeforeUpdate.action;
    const imageURL = actionBlockBeforeUpdate.imageURL;

    const isUpdated = this.model.updateActionBlock(
      title,
      tags,
      selected_action,
      content,
      imageURL
    );

    if (isUpdated === false) {
      this.modalLoadingService.hide();

      return false;
    }

    $('#btn_quick_update_actionBlock').hide();
    $('.inputFieldWithSuggestions').val('')

    this.#onActionBlockUpdated();
  };

  updateDefaultActionBlocks = () => {
    const that = this;
    const isShowAlertOnError = false;

    const actionBlocksToCreate = this.model.getDefaultActionBlocks();

    // Delete previous default Action-Blocks.
    for (const actionBlockToDelete of actionBlocksToCreate) {
      // Update site.
      this.model.deleteActionBlockByTitle(
        actionBlockToDelete.title,
        isShowAlertOnError
      );
    }

    // Create default Action-Blocks.
    createDefaultActionBlocks();
    this.scrollService.setPositionTop();
    this.showActionBlocks();

    return;

    function createDefaultActionBlocks() {
      actionBlocksToCreate.forEach((actionBlock) => {
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

    const textConfirmWindow =
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
      textConfirmWindow,
      onClickOkConfirm,
      onClickCancelConfirm
    );

    this.#onActionBlocksStorageUpdated();
  };

  openFolder(actionBlockTitle) {
    // !!! not tested
    // OLD
    // const actionBlocks = this.model.getActionBlocks();
    // const actionBlock = actionBlocks.get(actionBlock_title);
    // NEW
    const actionBlock = this.model.getActionBlockByTitle(actionBlockTitle);
    const tagsToSearch = actionBlock.content;

    let actionBlocksToShow;

    if (!tagsToSearch) {
      // console.log('Warning! Tags for folder don\'t exist');
      return;
    }

    this.view.clear();
    // Get command text from input field and find possible search data.
    actionBlocksToShow = this.model.getByPhrase(tagsToSearch);

    // Delete a folder from array. In order to don't show a folder with Action-Blocks.
    // if (i_actionBlock >= 0) {
    //     actionBlocks_to_show.splice(i_actionBlock, 1);
    // }

    this.scrollService.setPositionTop();
    this.showActionBlocks(actionBlocksToShow);

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
      let newTab = window.open(url, "_blank");

      if (!newTab || newTab.closed || typeof newTab.closed == "undefined") {
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

  showSettingsToCreateActionBlock = (actionName) => {
    this.#scroll_position_on_execute_block =
      this.scrollService.getScrollXY()[1];
    this.model.action_for_new_actionBlock = actionName;

    this.view.showSettingsToCreateActionBlock(actionName);
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
    this.model.actionBlockTitleBeforeUpdate = title;
    this.onPageContentChange();
    const elementsToShow =
      this.view.showElementsToEditActionBlock(actionBlock);
    that.hashService.hideShowedElements();

    elementsToShow.forEach((element) => {
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
