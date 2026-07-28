class HashHandler {
  constructor({ textManager, searchService, scrollController, HASH_NAME_ENUM, PAGE_OPTION_NAME_ENUM, routesMap, defaultPage }) {
    this.textManager = textManager;
    this.searchService = searchService;
    this.scrollController = scrollController;
    this.#HASH_NAME_ENUM = HASH_NAME_ENUM;
    this.PAGE_OPTION_NAME_ENUM = PAGE_OPTION_NAME_ENUM;
    this.#routesMap = routesMap;
    this.#defaultPage = defaultPage;
    this.#view = new DomElementVisibilityManager();

    this.#setListeners();
  }

  onHandleHashHandler;

  #hashPrevious;
  #isHashChangeListenerActiveStateEnabled = false;
  #currentPageName;
  #view;
  #routesMap;
  #defaultPage;
  #HASH_NAME_ENUM;

  #setListeners() {
    const that = this;

    window.onhashchange = function () {
      that.#handleHash();
    }
  }

  init() {
    this.setHashChangeListenerActiveState(true);

    // Обрабатываем текущий хеш при загрузке страницы
    if (!window.location.hash) {
      this.openPage(this.#defaultPage);
    } else {
      this.#handleHash();
    }
  }

  // Open page by name and optional query parameters.
  openPage(pageName, queryParams = {}) {
    this.#hashPrevious = window.location.hash;

    console.log('openPage', pageName, queryParams);
    this.#setCurrentPageName(pageName);

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


  setPreviousHash(newHashPrevious) {
    this.#hashPrevious =
      newHashPrevious != undefined ? newHashPrevious : window.location.hash;
  }

  setHashCreateActionBlock() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    console.log("create");

    this.#setCurrentPageName(this.#HASH_NAME_ENUM.createActionBlock);
    window.location.hash = this.#HASH_NAME_ENUM.createActionBlock;
  }

  setHashCreateNote() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    this.#setCurrentPageName(this.#HASH_NAME_ENUM.createNote);
    window.location.hash = this.#HASH_NAME_ENUM.createNote;
  }

  setHashCreateLink() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    this.#setCurrentPageName(this.#HASH_NAME_ENUM.createLink);
    window.location.hash = this.#HASH_NAME_ENUM.createLink;
  }


  setHashGetFromDatabase() {
    // this.#hash_previous = this.getNormalizedCurrentHash();
    this.#hashPrevious = this.#HASH_NAME_ENUM.main;


    this.#setCurrentPageName(this.#HASH_NAME_ENUM.getfromdatabase);
    // window.location.hash = this.#HASH_NAME_ENUM.getfromdatabase;
    window.location.replace('#' + this.#HASH_NAME_ENUM.getfromdatabase);
  }

  setHashSaveToDatabase() {
    this.#hashPrevious = this.getNormalizedCurrentHash();

    this.#setCurrentPageName(this.#HASH_NAME_ENUM.savetodatabase);
    window.location.hash = this.#HASH_NAME_ENUM.savetodatabase;
  }

  setHashLogin() {
    // this.#hash_previous = this.getNormalizedCurrentHash();
    this.#hashPrevious = this.#HASH_NAME_ENUM.main;

    this.#setCurrentPageName(this.#HASH_NAME_ENUM.login);
    window.location.hash = this.#HASH_NAME_ENUM.login;
  }

  // setHashEditActionBlock(title) {
  //     this.#hash_previous = this.getNormalizedCurrentHash();
  //     console.log("hash_previous = " + this.#hash_previous);
  //     this.#setCurrenPageName(this.#HASH_NAME_ENUM.editActionBlock);
  //     window.location.hash = this.#HASH_NAME_ENUM.editActionBlock + '=' + title;
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
    this.openPage(this.#HASH_NAME_ENUM.main);
  }

  openActionBlockPage(title) {
    this.#hashPrevious = window.location.hash;

    window.location.hash =
      this.#HASH_NAME_ENUM.request +
      "=" +
      title +
      "&" +
      this.PAGE_OPTION_NAME_ENUM.executebytitle +
      "=true";
  }

  openSettingsActionBlockPage(title) {
    this.#hashPrevious = window.location.hash;
    this.#setCurrentPageName(this.#HASH_NAME_ENUM.editActionBlock);
    window.location.hash = this.#HASH_NAME_ENUM.editActionBlock + "=" + title;
    this.setPageName(this.#HASH_NAME_ENUM.settingsActionBlock);
  }

  openPreviousPage() {
    if (
      this.#hashPrevious &&
      this.#hashPrevious.includes(this.#HASH_NAME_ENUM.editActionBlock) ===
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

  // openPageSettingsToCreateLink() {
  //   window.location.hash = this.#HASH_NAME_ENUM.createLink;
  //   this.#setCurrentPageName(this.#HASH_NAME_ENUM.createLink);
  // }



  openPreviousBrowserPage() {
    history.back();
  }

  setHashChangeListenerActiveState(isActiveNew) {
    this.#isHashChangeListenerActiveStateEnabled = isActiveNew;
  }

  getHashChangeListenerActiveState() {
    return this.#isHashChangeListenerActiveStateEnabled;
  }

  #handleHash() {
    const hashParamsInLowerCase = yesSir.hashHelper.getHashParamsInLowerCase();

    hideCommandInput();

    if (this.onHandleHashHandler) this.onHandleHashHandler();

    this.hideShowedElements();


    if (this.getHashChangeListenerActiveState() === false) return;

    // Убираем '#'
    const rawHash = window.location.hash.replace('#', '');

    let pageName = '';
    let queryString = '';

    // Проверяем: есть ли знак '=' и где он находится
    if (rawHash.includes('=')) {
      // Случай вида: actionblock=1 или notes?id=5&edit=true
      const equalIndex = rawHash.indexOf('=');
      const questionIndex = rawHash.indexOf('?');

      // Если знака '?' нет вообще ИЛИ знак '=' идет раньше '?' 
      // Значит, перед нами формат "страница=значение" (например, #actionblock=1)
      if (questionIndex === -1 || equalIndex < questionIndex) {
        // Разделяем по первому знаку '='
        // Всё до '=' — это имя страницы, всё после '=' — значение параметра
        const firstEqual = rawHash.indexOf('=');
        pageName = rawHash.substring(0, firstEqual); // "actionblock"

        // Превращаем "1" в стандартный параметр (например, с ключом по умолчанию или id)
        // Или сохраняем значение. Давайте сделаем универсально: { id: "1" } или передадим как есть
        const value = rawHash.substring(firstEqual + 1);

        // Если вам нужно, чтобы значение шло как конкретный параметр (например, id):
        // Можно решить, что для таких коротких записей параметр получает имя страницы или стандартный ключ 'id'
        queryString = `id=${value}`;
      } else {
        // Обычный формат с '?' (например, #notes?id=1)
        const parts = rawHash.split('?');
        pageName = parts[0];
        queryString = parts[1];
      }
    } else {
      // Обычный формат без параметров (например, #main или #notes)
      pageName = rawHash;
    }

    const lowerCasePageName = pageName ? pageName.toLowerCase() : '';

    const action = this.#routesMap[lowerCasePageName];

    if (typeof action === 'function') {
      this.setPageName(lowerCasePageName);
      // Превращаем query-строку в удобный объект (например: { id: "5", sort: "asc" })
      const queryParams = Object.fromEntries(new URLSearchParams(queryString || ''));

      const queryParamsInLowerCase = {};

      for (const key in queryParams) {
        queryParamsInLowerCase[key.toLowerCase()] = queryParams[key].toLowerCase();
      }

      // Передаем параметры в действие!
      action(queryParamsInLowerCase);
    } else {
      this.setPageName(this.#defaultPage);

      console.warn(`Нет обработчика для страницы: ${lowerCasePageName}. Открываем страницу по умолчанию.`);

      this.openPage(this.#defaultPage);
    }

    new EditActionBlockDataHolder(HASH_NAME_ENUM, this);
  }

  #setCurrentPageName(newPageName) {
    this.#currentPageName = newPageName;
  }
}
