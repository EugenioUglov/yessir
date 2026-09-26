/**
 * Hash Observer class is responsible for monitoring changes in the URL hash and executing corresponding actions based on the defined routes. The class provides methods to open pages, handle hash changes, and manage the previous hash state. It also allows for the registration of callback functions that are executed before and after handling a hash change.
 * @param {Object} options - Configuration options for the HashObserver.
 * @param {Object} options.routesMap - A mapping of page names to their corresponding action functions.
 * @param {string} options.defaultPage - The default page to open if the hash does not match any defined route.
 */
class HashObserver {
  constructor({ routesMap, defaultPage }) {
    this.#routesMap = routesMap;
    this.#defaultPage = defaultPage;

    this.#setListeners();
  }

  onStartHandleHash;
  onEndHandleHash;

  #hashPrevious;
  #isHashChangeListenerActiveStateEnabled = false;
  #currentPageName;
  #routesMap;
  #defaultPage;
  #hashSymbol = "#";
  #querySymbol = "?";
  #equalSymbol = "=";

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

    let hash = this.#hashSymbol + pageName;

    // Если переданы параметры, собираем их в строку (например: ?id=5&sort=asc)
    const queryString = new URLSearchParams(queryParams).toString();

    if (queryString) {
      hash += this.#querySymbol + queryString;
    }

    window.location.hash = hash;
  }

  getCurrentPageName() {
    return this.#currentPageName;
  }

  getNormalizedCurrentHash() {
    return window.location.hash.toLowerCase();
  }

      /**
     * Возвращает очищенный хэш в нижнем регистре (без знака #)
     */
    // getNormalizedCurrentHash() {
    //     // Убираем '#' в начале, если он есть, для более удобного роутинга
    //     return window.location.hash.replace(/^#/, '').toLowerCase();
    // }


  /** 
   * Set new previous hash value. If new value is undefined, set current hash as previous.
   * It just stores the previous hash value, it does not change the current hash.
   * This is useful for tracking navigation history or implementing custom back navigation.
   * @param {string} newHashPrevious - The new previous hash value to set. If undefined, current hash will be used.
  */
  setPreviousHash(newHashPrevious) {
    this.#hashPrevious =
      newHashPrevious != undefined ? newHashPrevious : window.location.hash;
  }

  getPreviousHash() {
    return this.#hashPrevious;
  }

  setPageName(newPageName) {
    this.#currentPageName = newPageName;
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

  #handleHash() {
    const hashParamsInLowerCase = this.getHashParamsInLowerCase();

    if (this.onStartHandleHash) this.onStartHandleHash();

    if (this.getHashChangeListenerActiveState() === false) return;

    // Убираем '#'
    const rawHash = window.location.hash.replace(this.#hashSymbol, '');

    let pageName = '';
    let queryString = '';

    // Проверяем: есть ли знак '=' и где он находится
    if (rawHash.includes(this.#equalSymbol)) {
      // Случай вида: actionblock=1 или notes?id=5&edit=true
      const equalIndex = rawHash.indexOf(this.#equalSymbol);
      const questionIndex = rawHash.indexOf(this.#querySymbol);

      // Если знака '?' нет вообще ИЛИ знак '=' идет раньше '?' 
      // Значит, перед нами формат "страница=значение" (например, #actionblock=1)
      if (questionIndex === -1 || equalIndex < questionIndex) {
        // Разделяем по первому знаку '='
        // Всё до '=' — это имя страницы, всё после '=' — значение параметра
        const firstEqual = rawHash.indexOf(this.#equalSymbol);
        pageName = rawHash.substring(0, firstEqual); // "actionblock"

        // Value после '='.
        const value = rawHash.substring(firstEqual + 1);

        // Если вам нужно, чтобы значение шло как конкретный параметр (например, id):
        // Можно решить, что для таких коротких записей параметр получает имя страницы или стандартный ключ 'id'
        queryString = `id=${value}`;
      } else {
        // Обычный формат с '?' (например, #notes?id=1)
        const parts = rawHash.split(this.#querySymbol);
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
      console.warn(`Нет обработчика для страницы: ${lowerCasePageName}. Открываем страницу по умолчанию.`);

      this.openPage(this.#defaultPage);
    }

    if (this.onEndHandleHash) this.onEndHandleHash();
  }

  #setCurrentPageName(newPageName) {
    this.#currentPageName = newPageName;
  }

  getHashParamsInLowerCase() {
    const hashParams = this.#getHashParams();

    // Create a new empty URLSearchParams object.
    const lowerCaseHashParams = new URLSearchParams();

    hashParams.forEach((value, key) => {
      lowerCaseHashParams.append(key.toLowerCase(), value);
    });

    return lowerCaseHashParams;
  }

  
  #getHashParams() {
      // Get hash and remove '#'.
      const hashString = window.location.hash.slice(1); 

      // Create object of parameters.
      const hashParams = new URLSearchParams(hashString);

      return hashParams;
  }

  /**
   * Парсит хэш-параметры в удобный объект.
   * Безопасно обрабатывает пустые строки и спецсимволы.
   */
  #getConvertedHashToObject() {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) return {};

      // Используем встроенный и надежный URLSearchParams вместо хрупкого split()
      const params = new URLSearchParams(hash);
      return Object.fromEntries(params.entries());
  }
}
