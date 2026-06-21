class ActionBlockModel {
    #textManager;

    constructor(dbManager, textManager, dataStorageService, mapDataStructure, fileManager) {
        this.#textManager = textManager;
        this.actionBlockTitleBeforeUpdate = '';
        this.dbManager = dbManager;
        this.dataStorageService = dataStorageService;
        this.mapDataStructure = mapDataStructure;
        this.fileManager = fileManager;

        // this.actionBlocks = [];
        this.actionBlocksFromDatabase = [];
        this.isMenuCreateTypeActionBlockOpen = false;
    
        this.actionDescriptionByActionName = {
            openURL: 'Open URL',
            showInfo: 'Show info',
            openFolder: 'Create folder (Search info by tags)',
            showHTML: 'Show info in HTML mode'
        };

        this.#actionBlockById = new Map();
        this.#actionBlockIdByTitle = new Map();
        this.#actionBlockIdsByTag = {};
        this.#actionBlockTitleById = {};
    }
    

    #actionBlockById;
    #actionBlockIdByTitle;
    #actionBlockIdsByTag = {};
    #actionBlockTitleById = {};


    getActionBlocks() {
        return this.#actionBlockById;
    }
    
    getActionBlockByTitle(title) {
        // Get first id by titles then get ActionBlock by id.
        return this.getActionBlocks().get(this.#actionBlockIdByTitle.get(title.toUpperCase()));
    }

    getActionBlockById(id) {
        return this.#actionBlockById.get(id);
    }

    getActionBlocksFromLocalStorageAsync(onGetCallback) {
        let actionBlocksFromLocalStorage = new Map;
        const key = 'actionBlocks';
        
        if (localStorage.getItem(key)) {
            const actionBlocksMapStr = localStorage['actionBlocks'];

            actionBlocksFromLocalStorage = this.mapDataStructure.getParsed(actionBlocksMapStr);
        }
        
        if (onGetCallback) onGetCallback(actionBlocksFromLocalStorage);

        return actionBlocksFromLocalStorage;
    }

    /**
     * Get id Action-Blocks by user phrase.
     * It returns an array sorted in the next priority:
     * 1. User request is the same as title of an Action-Block.
     * 2. Tags with words in sequence from user requests.
     * 3. Tags with words not in sequence but in the same tag comparing with words from user requests.
     * 4. As many words from tags are equal to words from user requests.
     */
    getByPhrase(userPhrase) {
        // Очистка фразы
        userPhrase = userPhrase.replaceAll(',', ' ').toLowerCase().trim();
        if (!userPhrase) return [];

        const userWords = this.#textManager.splitText(userPhrase, ' ');
        if (userWords.length === 0) return [];

        // 1. Собираем все уникальные ID блоков, где есть хоть один тег из запроса
        const candidateIds = new Set();
        userWords.forEach(word => {
            const matches = this.#actionBlockIdsByTag[word] || {};
            Object.keys(matches).forEach(id => candidateIds.add(id));
        });

        // Также добавляем блок, если есть точное совпадение по Title (даже если теги не совпали)
        // Предполагаю, что в Map ключом является очищенный/lowercase тайтл, либо ID. 
        // Если ключ — это фраза, проверяем её:
        const exactTitleBlockId = this.#actionBlockIdByTitle.get(userPhrase);
        if (exactTitleBlockId) {
            candidateIds.add(String(exactTitleBlockId));
        }

        if (candidateIds.size === 0) return [];

        const actionBlocksArray = [...this.getActionBlocks().values()];
        
        // Группы для разделения блоков по приоритетам
        const group1ExactTitle = [];
        const group2SequenceWords = [];
        const group3ScatteredWords = [];
        const group4Others = [];

        // 2. Распределяем блоки по группам приоритета
        for (const actionBlockId of candidateIds) {
            let actionBlock = actionBlocksArray.find(obj => String(obj.id) === String(actionBlockId));
            if (!actionBlock) continue;

            // Клонируем или сбрасываем приоритет для корректной внутренней сортировки
            actionBlock.priority = 0; 

            // --- ПРИОРИТЕТ 1: Точное совпадение с Title ---
            if (exactTitleBlockId && String(actionBlock.id) === String(exactTitleBlockId)) {
                group1ExactTitle.push(actionBlock);
                continue; // Если совпал тайтл, это абсолютный топ, идем дальше
            }

            // Анализируем теги для определения группы
            let hasSequence = false;
            let hasScatteredWordsInSameTag = false;
            let maxSequencePriority = 0;

            // Собираем все координаты слов запроса для данного блока, сгруппированные по tagIndex
            // Структура: { [tagIndex]: [wordIndex1, wordIndex2, ...] }
            const wordsByTag = {};

            userWords.forEach((word, userWordIndex) => {
                const wordMatches = this.#actionBlockIdsByTag[word] || {};
                const coords = wordMatches[actionBlockId] || [];
                
                coords.forEach(coord => {
                    if (!wordsByTag[coord.tagIndex]) {
                        wordsByTag[coord.tagIndex] = [];
                    }
                    // Сохраняем индекс слова в теге и его позицию в запросе для проверки последовательности
                    wordsByTag[coord.tagIndex].push({
                        wordIndex: coord.wordIndex,
                        userWordIndex: userWordIndex
                    });
                });
            });

            // Проверяем условия внутри каждого тега
            for (const tagIndex in wordsByTag) {
                const coordsInTag = wordsByTag[tagIndex];
                
                // Сортируем координаты по порядку их появления в теге
                coordsInTag.sort((a, b) => a.wordIndex - b.wordIndex);

                // Проверка на последовательность (идут ли друг за другом из запроса)
                // Ищем непрерывные цепочки, где wordIndex увеличивается на столько же, на сколько userWordIndex
                for (let i = 0; i < coordsInTag.length; i++) {
                    let sequenceLength = 1;
                    let currentWordIndex = coordsInTag[i].wordIndex;
                    let currentUserWordIndex = coordsInTag[i].userWordIndex;

                    // Считаем стандартный внутренний приоритет для формулы (на случай если цепочки одинаковые)
                    let currentPriority = (100 - (parseInt(tagIndex) * 10 + currentWordIndex));

                    for (let j = i + 1; j < coordsInTag.length; j++) {
                        if (coordsInTag[j].wordIndex === currentWordIndex + sequenceLength && 
                            coordsInTag[j].userWordIndex === currentUserWordIndex + sequenceLength) {
                            sequenceLength++;
                        } else {
                            break;
                        }
                    }

                    // Если нашли цепочку хотя бы из 2-х слов подряд (или больше)
                    if (sequenceLength > 1 && sequenceLength === userWords.length) {
                        hasSequence = true;
                        if (currentPriority > maxSequencePriority) {
                            maxSequencePriority = currentPriority;
                        }
                    }
                }

                // --- ПРИОРИТЕТ 3: Большинство слов в одном теге, но в случайном порядке ---
                // "Большинство" определим как > 50% от слов запроса (или хотя бы 2 слова, если запрос короткий)
                const uniqueUserWordsInTag = new Set(coordsInTag.map(c => c.userWordIndex)).size;
                const majorityCount = Math.max(2, Math.ceil(userWords.length / 2));
                
                if (uniqueUserWordsInTag >= majorityCount) {
                    hasScatteredWordsInSameTag = true;
                }
            }

            // Распределяем по оставшимся группам и вычисляем внутренний priority для сортировки методом
            if (hasSequence) {
                actionBlock.priority = maxSequencePriority;
                group2SequenceWords.push(actionBlock);
            } else if (hasScatteredWordsInSameTag) {
                // Для группы 3 в качестве priority можно взять просто кол-во совпавших слов
                actionBlock.priority = 1; 
                group3ScatteredWords.push(actionBlock);
            } else {
                actionBlock.priority = 0;
                group4Others.push(actionBlock);
            }
        }

        // 3. Сортируем каждую группу внутренним методом (если это необходимо)
        const sortedGroup1 = group1ExactTitle; // Тут обычно 1 элемент
        const sortedGroup2 = this.#getSortedActionBlocksByProperty(group2SequenceWords, 'priority');
        const sortedGroup3 = this.#getSortedActionBlocksByProperty(group3ScatteredWords, 'priority');
        const sortedGroup4 = this.#getSortedActionBlocksByProperty(group4Others, 'priority');

        // 4. Склеиваем массивы строго по порядку приоритетов
        return [
            ...sortedGroup1,
            ...sortedGroup2,
            ...sortedGroup3,
            ...sortedGroup4
        ];
    }

    getActionBlocksByTags(userPhrase, minusTags) {
        const that = this;

        // Delete characters ',' from phrase.
        userPhrase = userPhrase.replaceAll(',', ' ');
        minusTags = minusTags.replaceAll(',', ' ');
    
        // If phrase doesn't exist.
        if ( ! userPhrase) {
            // console.log('Action-Blocks don\'t exist with tags: ' + user_phrase);
            return;
        }
    
        if (userPhrase === undefined || userPhrase === null) {
            let error_text = 'userPhrase not defined during information searching';
            // console.log(error_text);
        }

        // Here all objects from a storage which info can to be looking by user.
        let searchedInfoObjects = [];
        
        userPhrase = userPhrase.toLowerCase();
        minusTags = minusTags.toLowerCase();

        const userTags = this.#textManager.splitText(userPhrase, ' ');
        const userMinusTags = this.#textManager.splitText(minusTags, ' ');
        
        const titlesActionBlocksToShow = getIdActionBlocksByTags(userTags, userMinusTags);
        
            
        // Create an array with actionBlocks and priority value to show.
        for (let titleActionBlock of titlesActionBlocksToShow) {
            let actionBlock = this.getActionBlockByTitle(titleActionBlock);
            const priorityActionBlock = this.#getPriorityActionBlockByPhrase(actionBlock, userPhrase);

            actionBlock.priority = priorityActionBlock;
    
            if (priorityActionBlock > 0) {
                // Push current obj
                searchedInfoObjects.push(actionBlock);
            }
        }
    
        const propertyInActionBlockForSort = 'priority';
        let isSortFromAToZ = false;
    
        // Sort by priority.
        searchedInfoObjects = this.#getSortedActionBlocksByProperty(searchedInfoObjects, 
            propertyInActionBlockForSort, isSortFromAToZ);
    
        return searchedInfoObjects;

        function getIdActionBlocksByTags(tags, minusTags) {
            let actionBlockIndexesToShow = [];
    
            // Push index of Action-blocks by user phrase if it doesn't exist yet in array. 
            for (const indexTag in tags) {
                // One user word of phrase.
                const tag = tags[indexTag];
    
                if (that.#actionBlockIdsByTag[tag] === undefined) {
                    return [];
                }
                
                // If array with indexes to show is empty. 
                if (actionBlockIndexesToShow.length < 1) {
                    // Add all Action-Blocks indexes of tag to array.
                    actionBlockIndexesToShow = actionBlockIndexesToShow.concat(that.#actionBlockIdsByTag[tag]);
                }
                else {
                    actionBlockIndexesToShow = yesSir.arrayManager.getSameItemsFromArrays
                    (
                        actionBlockIndexesToShow, that.#actionBlockIdsByTag[tag]
                    );
    
                    if (actionBlockIndexesToShow.length < 1) {
                        // No same indexes in tags after comparation.
    
                        return []; 
                    }
                }
            }
    
            actionBlockIndexesToShow = getActionBlockIndexesWithoutMinusTags(actionBlockIndexesToShow, minusTags);
    
            return actionBlockIndexesToShow;
    
    
            function getActionBlockIndexesWithoutMinusTags(actionBlockIndexesToShow, minusTags) {
                // Delete items with minus tags.
                for (const minusTag of minusTags) {
                    for (const indexActionBlockToShow in actionBlockIndexesToShow) {
                        if (that.#actionBlockIdsByTag[minusTag] === undefined) continue;
                        const indexActionBlockToShow = actionBlockIndexesToShow[indexActionBlockToShow];
                        
                        // console.log(that.#titles_actionBlocksMap_by_tag[minus_tag]);
    
                        // Compare minus tag with each Action-Block that has this tag.
                        for (const indexActionBlockWithMinusTag of that.#actionBlockIdsByTag[minusTag]) {
                            if (indexActionBlockWithMinusTag === indexActionBlockToShow) {
                                actionBlockIndexesToShow[indexActionBlockToShow] = undefined;
                            }
                        }
                    }
                }
    
                // Delete all undefined elements from array.
                actionBlockIndexesToShow = actionBlockIndexesToShow.filter(function(x) {
                    return x !== undefined;
                });
    
    
                return actionBlockIndexesToShow;
            }
        }
    }

    getDefaultActionBlocks = function() {
        const defaultActionBlocks = new DefaultActionBlocks();
        return defaultActionBlocks.getDefaultActionBlocks(); 
    }

    getActionNameEnum() {
        const ACTION_NAME_ENUM = {
            openURL: 'openURL',
            showInfo: 'showInfo',
            openFolder: 'openFolder',
            showHTML: 'showHTML'
        };

        return ACTION_NAME_ENUM;
    }

    getContentTypeDescriptionByActionEnum() {
        // Titles for input field info of action.
        const CONTENT_TYPE_DESCRIPTION_BY_ACTION_ENUM = {
            openURL: 'URL',
            showInfo: 'Description',
            openFolder: 'Tags to search',
            showHTML: 'HTML code'
        };
        
        return CONTENT_TYPE_DESCRIPTION_BY_ACTION_ENUM;
    }

    setActionBlocks(actionBlocksMapNew) {
        this.#actionBlockIdByTitle.clear();
        this.#actionBlockById.clear();

        if ( ! actionBlocksMapNew) { 
            actionBlocksMapNew = new Map();
        }
        else {
            actionBlocksMapNew.forEach(actionBlock => {
                if (actionBlock.id === undefined) {
                    actionBlock.id = crypto.randomUUID();
                }

                this.#actionBlockById.set(actionBlock.id, actionBlock);
                this.#actionBlockIdByTitle.set(actionBlock.title.toUpperCase(), actionBlock.id);
            });
        }

        this.#onUpdateVarialbeWithActionBlocks();

        return this.#actionBlockById;
    }

    setActionBlocksFromUserStorageAssync(callbackSetActionBlocks, callbackUserStorageDifferentFromLocal) {
        const that = this;

        this.getActionBlocksFromLocalStorageAsync(onGetActionBlocks);

        function onGetActionBlocks(actionBlocksFromUserStorage) {
            const actionBlocksFromLocalStorage = that.getActionBlocksFromLocalStorageAsync();

            // IF data is equal to data from localStorage THEN show Action-Blocks
            // ELSE open dialog database.
            if (that.dataStorageService.getUserStorage() === that.dataStorageService.getStorageNameEnum().localStorage) {
                that.setActionBlocks(actionBlocksFromUserStorage);
                if (callbackSetActionBlocks) callbackSetActionBlocks();
            }
            else {
                if (that.mapDataStructure.getStringified(actionBlocksFromUserStorage) === that.mapDataStructure.getStringified(actionBlocksFromLocalStorage)) {
                    that.setActionBlocks(actionBlocksFromUserStorage);
                    if (callbackSetActionBlocks) callbackSetActionBlocks();
                }
                else {
                    that.dataStorageService.view.showDatabaseDialog();
                    if (callbackUserStorageDifferentFromLocal) callbackUserStorageDifferentFromLocal();
                }
            }
        }

        return this.#actionBlockById;
    }


    add(actionBlockToAdd, isShowAlertOnError = true) {
        const that = this;
        const tagsNormalizer = new TagsNormalizer();

        
        actionBlockToAdd.id = IdGenerator.getCryptoUniqueIdForMap(this.#actionBlockById);
        actionBlockToAdd.title = getNormalizedTitle(actionBlockToAdd.title);

        if (isTitleValid(actionBlockToAdd.title) === false) return false;

        actionBlockToAdd.tags = tagsNormalizer.getHandledTags(actionBlockToAdd.tags);

        this.#actionBlockIdByTitle.set(actionBlockToAdd.title.toUpperCase(), actionBlockToAdd.id);
        this.#actionBlockById.set(actionBlockToAdd.id, actionBlockToAdd);

        
        this.#onUpdateVarialbeWithActionBlocks();

        
        function getNormalizedTitle(initialTitle) {
            let normalizedTitle = ''

            const trimmedTitle = initialTitle.trim();
            normalizedTitle = trimmedTitle;
            // Change title to URI friendly.
            // Problem: not accepting other languages.
            // normalizedTitle = trimmedTitle.replace(/[^a-zA-Z0-9-_ ]/g, '');
            
            return normalizedTitle;
        }

        function isTitleValid(title) {
            if ( ! title) {
                alert('Error! Not valid title');
    
                return false;
            }
    
            if (that.#actionBlockIdByTitle.has(title.toUpperCase())) {
                if (isShowAlertOnError) alert('Action-Block with current title already exists. Title: ' + title);
                else {
                    // console.log('Action-Block with current title already exists. Title: ' + title);
                }
    
                return false;
            }
        }
    
        return true;
    }

    isActionBlockExist(title) {
        if (this.#actionBlockIdByTitle.has(title.toUpperCase())) {
            return true;
        }

        return false;
    }
    
    saveAsync(actionBlocks, callBackSavedSuccessfully, callBackError) {
        const that = this;

        if ( ! actionBlocks) {
            actionBlocks = this.#actionBlockById;
        }

        yesSir.logsController.showLog('Data is saving... Don\'t close this tab');
        

        let isSavedInLocalStorage = this.saveInLocalStorage(actionBlocks);

    
        if (this.dataStorageService.getUserStorage() === that.dataStorageService.getStorageNameEnum().database)
        {
            // Send to DB.
            that.saveInDatabase();
        }
        else {
            if (callBackSavedSuccessfully) callBackSavedSuccessfully();
        }
    }

    saveActionBlocksToDatabaseAsync({inputUsername, inputPassword, database, actionBlocksMapString, onSuccess, onError}) {
        database.saveActionBlocksAsync({inputUsername: inputUsername, inputPassword: inputPassword, actionBlocksMapString: actionBlocksMapString, onSuccess: onSuccess, onError: onError});
    }

    getActionBlocksFromDatabaseAsync({inputUsername, inputPassword, database, onGetActionBlocks, onError}) {
        database.getActionBlocksMapStringAsync({inputUsername: inputUsername, inputPassword: inputPassword, onGetActionBlocks: onGetActionBlocks, onError: onError});
    }

    saveInDatabase() {
        const that = this;

        const actionBlocksToDBString = this.mapDataStructure.getStringified(this.getActionBlocks());

        let authorization_data;
        if (localStorage['authorization']) authorization_data = JSON.parse(localStorage['authorization']);

        if ( ! authorization_data) {
            alert('ERROR! Data has not been saved in database. Authorization error.');
            onDatabaseError();
            return false; 
        }

        // Set object to save in DB
        const userDataToDBObj = {
            actionBlocks: actionBlocksToDBString
        };

        // Stringify object for DB
        const userDataToDBString = JSON.stringify(userDataToDBObj);

        // Upload data to user field
        const userId = authorization_data.id;
        const dataToSend = userDataToDBString;
        that.dbManager.setUserData(userId, dataToSend, onUpdatedUserData, onFailSaveUserData);
        
        function onFailSaveUserData() {
            return false;
        }

        return true;

        function onUpdatedUserData() {
            // that.observable.dispatchEvent('userDataUpdated', 'userDataUpdated');
        }

        
        function onDatabaseError() {
            that.dataStorageService.setUserStorage(that.dataStorageService.getStorageNameEnum().localStorage);
        }
    }

    saveInLocalStorage(actionBlocks) {
        const stringifiedActionBlocks = this.mapDataStructure.getStringified(actionBlocks);
        const key = 'actionBlocks';
        localStorage.setItem(key, stringifiedActionBlocks);

        const keyActionBlockByTitle = 'actionBlockIdByTitle';
        localStorage.setItem(keyActionBlockByTitle, this.mapDataStructure.getStringified(this.#actionBlockIdByTitle));

        return true;
    }

    updateActionBlock(newTitle, tags, action, content, image_URL) {
        const originalTitle = this.actionBlockTitleBeforeUpdate;

  
        // Check new title validation.
        if (originalTitle.toUpperCase() != newTitle.toUpperCase()) {
            const isActionBlockExistsByTitle = this.getActionBlockByTitle(newTitle);
            
            if (isActionBlockExistsByTitle) {
                alert('Action-Block with current title already exists. Title: ' + newTitle);
                return false;
            }

            addTitleToTags();
        }


        const isDeleted = this.deleteActionBlockByTitle(originalTitle);

        if ( ! isDeleted) {
            alert('ERROR! Action-Block hasn\'t been deleted');
            return false;
        }
        
        const action_block =
        {
            title: newTitle,
            tags: tags,
            action: action,
            content: content,
            imageURL: image_URL
        };

        const isCreated = this.add(action_block);
    
        if ( ! isCreated) {
            alert('ERROR! Action-Bclok hasn\'t been created.');
            return false;
        }

        function addTitleToTags() {
            // Add new tag getting text from title.
    
            const titleWithoutSymbols = newTitle.replace(/[^a-zа-яё0-9\s]/gi, '');
            
            if (tags) tags = tags + ", ";
            
            // Add new tag getting text from title.
            tags += newTitle + ", " + titleWithoutSymbols;
        }

        
        return true;
    }

    
    updateActionBlockByTitle(oldTitle, title, tags, action, content, image_URL) {
        // Check new title validation.
        if (oldTitle.toLowerCase() != title.toLowerCase()) {
            const isActionBlockExistsByTitle = this.getActionBlockByTitle(title);
            
            if (isActionBlockExistsByTitle) {
                alert('Action-Block with current title already exists. Title: ' + title);
                return false;
            }

            addTitleToTags();
        }

        const isDeleted = this.deleteActionBlockByTitle(oldTitle);

        if ( ! isDeleted) {
            alert('ERROR! Action-Block hasn\'t been deleted');
            return false;
        }
        
        const actionBlock =
        {
            title: title,
            tags: tags,
            action: action,
            content: content,
            imageURL: image_URL
        };

        const isCreated = this.add(actionBlock);
    
        if ( ! isCreated) {
            alert('ERROR! Action-Bclok hasn\'t been created.');
            return false;
        }

        return true;
        

        function addTitleToTags() {
            // Add new tag getting text from title.
    
            const titleWithoutSymbols = title.replace(/[^a-zа-яё0-9\s]/gi, '');
            
            if (tags) tags = tags + ", ";
            
            // Add new tag getting text from title.
            tags += title + ", " + titleWithoutSymbols;
        }
    }

    deleteActionBlockByTitle(title) {
        const normalizedTags = title.toUpperCase();
        if (this.getActionBlockByTitle(normalizedTags) === undefined) {
            return false;
        }


        const actionBlockId = this.getActionBlockByTitle(normalizedTags).id;

        const isActionBlockIdByTitleDeleted = this.#actionBlockIdByTitle.delete(normalizedTags);

        const isDeleted = this.#actionBlockById.delete(actionBlockId);

        this.#onUpdateVarialbeWithActionBlocks();
    
        return isDeleted;
    }

    deleteActionBlocks() {
        this.#actionBlockIdByTitle = new Map();
        this.#actionBlockById = new Map();

        this.#onUpdateVarialbeWithActionBlocks();
    }

    #addActionBlockTitleById(title) {
        const lastKey = Object.keys(this.#actionBlockTitleById).pop();
    
        if (lastKey === undefined) {
            lastKey = 0;
        }
        
        const newActionBlockId = Number(lastKey) + 1;
    
        this.#actionBlockTitleById[newActionBlockId] = title;

        return newActionBlockId;
    }

    #onUpdateVarialbeWithActionBlocks() {
        this.saveAsync(this.getActionBlocks());
        //this.#updateTagsIndexes();
        this.#updateTagsIndexesForMap();
        // this.#updateTitleIndexes();
    }

    #updateTagsIndexes() {
        const that = this;

        const indexesActionBlocksByTag = createIndexes();
        const key = 'indexes_actionBlocks_by_tag';
    
        localStorage[key] = JSON.stringify(indexesActionBlocksByTag);
    
        // console.log('Update indexes', indexes_actionBlocks_by_tag);
    
        return true;
    
        // Example: indexes_actionBlocks_by_tag['hello'] = [1, 2];
        function createIndexes(actionBlocks) {
            if ( ! actionBlocks) actionBlocks = that.getActionBlocks();
    
            let indexesActionBlocksByTag = {};
    
    
            // For all actionBlocks.
            for (const indexActionBlockToPaste in actionBlocks) {
                let actionBlock = actionBlocks[indexActionBlockToPaste];
                let tags = actionBlock.tags;
    
                // For all tags.
                for (const indexTag in tags) {
                    let tag = tags[indexTag];
                    
                    tag = tag.toLowerCase();
    
                    if ( ! tag) continue;
    
                    // WHILE first symbol in tag is empty THEN delete empty.
                    while (tag[0] === ' ') tag = tag.replace(tag[0], '');
    
                    // Separated words of tag.
                    let tagWords = that.#textManager.splitText(tag, ' ');
                    
                    // For each word in tag.
                    for (const indexWordTag in tagWords) {
                        let tagWord = tagWords[indexWordTag];
                    
                        if ( ! indexesActionBlocksByTag[tagWord]) {
                            indexesActionBlocksByTag[tagWord] = [];
                        }
                        
                        // Indexes for link to actionBlock.
                        let indexesArr = Object.values(indexesActionBlocksByTag[tagWord]);
                        
                        // Each index must be different in indexes array.
                        let isIndexExistInIndexesArr = yesSir.arrayManager.isValueExistsInArray(indexesArr, indexActionBlockToPaste);

                        if (isIndexExistInIndexesArr) continue;

                        indexesActionBlocksByTag[tagWord].push(indexActionBlockToPaste);
                    }
                }
            }
    
            return indexesActionBlocksByTag;
        }
    
    }

    #updateTagsIndexesForMap() {
        const that = this;

        const actionBlockIdsByTag = createIndexes();
        const key = 'actionBlockIdsByTag';
        localStorage[key] = JSON.stringify(actionBlockIdsByTag);
        this.#actionBlockIdsByTag = actionBlockIdsByTag;
    
    
        // Example: indexes_actionBlocks_by_tag['hello'] = [1, 2];
        function createIndexes() {
            const actionBlocksMap = that.getActionBlocks();
            let idsOfActionBlocksByTagWord = {};

            actionBlocksMap.forEach((actionBlock, indexActionBlock) => {
                if (actionBlock === undefined || actionBlock.id === undefined) return idsOfActionBlocksByTagWord;

                const actionBlockId = actionBlock.id; // Используем ID заметки/блока
                const tags = actionBlock.tags;



                tags.forEach((tag, tagIndex) => {
                    let tagLower = tag.toLowerCase().trim();
                    if (!tagLower) return;

                    // Разбиваем конкретную фразу на слова.
                    let tagWords = that.#textManager.splitText(tagLower, ' ');

                    // Проходим по каждому слову во фразе.
                    tagWords.forEach((word, wordIndex) => {
                        if ( ! word) return;

                        // Создаем структуру, если слова еще нет в индексе
                        if ( ! idsOfActionBlocksByTagWord[word]) {
                            idsOfActionBlocksByTagWord[word] = {};
                        }
                        if ( ! idsOfActionBlocksByTagWord[word][actionBlockId]) {
                            idsOfActionBlocksByTagWord[word][actionBlockId] = [];
                        }

                        // Сохраняем точные координаты слова
                        idsOfActionBlocksByTagWord[word][actionBlockId].push({
                            tagIndex: tagIndex,
                            wordIndex: wordIndex
                        });
                    });
                });






                // For all tags.
                // for (const tag of tags) {
                //     let tagLowerCase = tag.toLowerCase();

                //     if ( ! tagLowerCase) continue;

                //     // WHILE first symbol in tag_lower_case is empty THEN delete empty.
                //     while (tagLowerCase[0] === ' ') tagLowerCase = tagLowerCase.replace(tagLowerCase[0], '');

                //     // Separated words of tag_lower_case.
                //     let tagWords = that.#textManager.splitText(tagLowerCase, ' ');

                //     // For each word in tag_lower_case.
                //     for (const tagWord of tagWords) {
                //         if ( ! indexesActionBlocksByTag[tagWord]) {
                //             indexesActionBlocksByTag[tagWord] = [];
                //         }
                        
                //         // Indexes for link to actionBlock.
                //         let indexes_arr = Object.values(indexesActionBlocksByTag[tagWord]);
                        
                //         // Each index must be different in indexes array.
                //         let isIndexExistInIndexesArr = yesSir.arrayManager.isValueExistsInArray(indexes_arr, indexActionBlock);

                //         if (isIndexExistInIndexesArr) continue;

                //         indexesActionBlocksByTag[tagWord].push(indexActionBlock);
                //     }
                // }









            });

            return idsOfActionBlocksByTagWord;
        }
    }

    // #updateTitleIndexes() {
    //     const that = this;
    //     this.#index_actionBlock_by_title = createIndexes();
    //     const key = 'index_actionBlock_by_title';
    
    //     localStorage[key] = JSON.stringify(this.#index_actionBlock_by_title);
    
    //     console.log('Update indexes', this.#index_actionBlock_by_title);
    
    //     return this.#index_actionBlock_by_title;
    
    //     // Example: index_actionBlock_by_title['my targets'] = 0;
    //     function createIndexes(actionBlocks) {
    //         if ( ! actionBlocks) actionBlocks = that.getActionBlocks();
    
    //         let index_actionBlock_by_title = {};
    
    
    //         // For all actionBlocks.
    //         for (const i_actionBlock in actionBlocks) {
    //             const actionBlock = actionBlocks[i_actionBlock];
    //             const title = actionBlock.title.toLowerCase();
    
    //             index_actionBlock_by_title[title] = i_actionBlock;
    //         }
    
    //         return index_actionBlock_by_title;
    //     }
    // }

    // #getNormalizedTags(tags) {
    //     if (Array.isArray(tags)) {
    //         tags = tags.toString();
    //     }

    //     let normalizedTags;
    
    //     // Change all new lines to symbol ',".
    //     const tags_without_new_line = tags.replaceAll('\n', ',');
    //     //tags_lower_case = tags_without_new_line.toLowerCase();
    
    //     let tags_array = this.#textManager.getArrayByText(tags_without_new_line);
        
    //     // Delete empty symbols from sides in text.
    //     for (const i_tag in tags_array) {
    //         tags_array[i_tag] = tags_array[i_tag].trim();
    //     }
    
    //     // Delete same tags.
    //     const tags_set = new Set(tags_array);
    
    //     // Convertation from Set to Array.
    //     normalizedTags = Array.from(tags_set);
    
    //     return normalizedTags;
    // }

    // #getAdditionalTags(tags) {
    //     console.log('tags', tags);
    //      if (Array.isArray(tags) === false) {
    //         tags = this.#textManager.getArrayByText(tags);
    //     }

    //     const additionalTags = [];

    //     for (const tag of tags) {
    //         let additionalTag = '';

    //         const tagWithoutSpecialCharacters = this.#textManager.getTextWithoutSpecialCharactes(tag);

    //         if (tag != tagWithoutSpecialCharacters) {
    //             additionalTag = tagWithoutSpecialCharacters;
    //         }

    //         if (tagWithoutSpecialCharacters === tagWithoutSpecialCharacters.toUpperCase() == false && tagWithoutSpecialCharacters === tagWithoutSpecialCharacters.toLowerCase() === false) {
    //             const tagWithSeparatedWords = this.#textManager.getSeparatedWordsByCamelCaseString(tagWithoutSpecialCharacters);

    //             additionalTag = tagWithSeparatedWords;
    //         }

    //         if (additionalTag) {
    //             additionalTags.push(additionalTag);
    //         }
    //     }

    //     console.log('additionalTags', additionalTags);

    //     return additionalTags;
    // }

    // Get priority of object from DB. How many times words from user phrase are in the tags of objet DB.
    // Priority = 0 means that user words not exist in tags of object.
    #getPriorityActionBlockByPhrase(obj, userPhrase) {
        let priority = 0;
        let tagsPhrases = obj.tags;

        // Check for each object in a storage is the same TITLE with user phrase.
        // IF 'title' == 'user phrase' THEN info is probably that we are looking. Add proiority for current info obj + 10
        if (obj.title === undefined) {
            // console.log('Warning! title property doesn\'t exist in obj: ', obj);
        }

        // Separated words of user phrase.
        const userWords = this.#textManager.splitText(userPhrase, ' ');
        // All tags.
        let tags = [];

        // For all user words.
        for (const indexWordUser in userWords) {
            // for each tags phrases separated by ','.
            for (const indexInTags in tagsPhrases) {
                const tag = tagsPhrases[indexInTags];
                const tagWords = this.#textManager.splitText(tag, ' ');
                tags = tags.concat(tagWords);
            }
            
            // For each word in tag.
            for (let indexWordTag in tags) {
                let userword = userWords[indexWordUser];
                let tagWord = tags[indexWordTag];

                // If in tag exist user word THEN add priority for this info object.
                if (this.#textManager.isSame(userword, tagWord)) {
                    priority++;
                    
                    break;
                }
            }
        }
        
        return priority;
    }
    
    // Bubble sort O(n^2).
    // Get sorted actionBlocks by property.
    #getSortedActionBlocksByProperty = function(actionBlocks, property = "priority") {
        let isSorting = true;
        while (isSorting) {
            isSorting = false;
            for (let i = 0; i < actionBlocks.length - 1; i++) {
                let infoObjCurr = actionBlocks[i];
                let infoObjNext = actionBlocks[i + 1];
                if (infoObjCurr[property] < infoObjNext[property]) {
                    actionBlocks[i] = infoObjNext;
                    actionBlocks[i + 1] = infoObjCurr;
                    isSorting = true;
                }
            }
        }

        return actionBlocks;
    }
}
