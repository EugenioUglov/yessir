class ActionBlockModel {
    #textManager;

    constructor(dbManager, textManager, dataStorageService, mapDataStructure, fileManager) {
        this.#textManager = textManager;
        this.title_actionBlock_before_update = '';
        this.dbManager = dbManager;
        this.dataStorageService = dataStorageService;
        this.mapDataStructure = mapDataStructure;
        this.fileManager = fileManager;

        // this.actionBlocks = [];
        this.actionBlocks_from_database = [];
        this.is_menu_create_type_actionBlock_open = false;
    
        this.action_description_by_action_name = {
            openURL: 'Open URL',
            showInfo: 'Show info',
            openFolder: 'Create folder (Search info by tags)',
            showHTML: 'Show info in HTML mode'
        };

        this.#init();
    }
    

    #actionBlocks_map;
    #titles_actionBlocksMap_by_tag = {};
    #title_actionBlock_by_id = {};


    
    #init() {
        this.#actionBlocks_map = new Map();
    }

    getActionBlocks() {
        return this.#actionBlocks_map;
    }
    
    getActionBlockByTitle(title) {
        return this.getActionBlocks().get(title.toUpperCase());
    }

    getActionBlocksFromLocalStorageAsync(onGetCallback) {
        let actionBlocks_from_localStorage = new Map;
        const key = 'actionBlocks';
        
        if (localStorage.getItem(key)) {
            const actionBlocksMapStr = localStorage['actionBlocks'].replaceAll(',"id":null', '');
           
            actionBlocks_from_localStorage = this.mapDataStructure.getParsed(actionBlocksMapStr);
        }
        
        if (onGetCallback) onGetCallback(actionBlocks_from_localStorage);

        return actionBlocks_from_localStorage;
    }

    getByPhrase(user_phrase) {
        const that = this;
        
        // Delete characters "," from phrase.
        user_phrase = user_phrase.replaceAll(',', '');
    
        // If phrase doesn't exist.
        if ( ! user_phrase) {
            // console.log('Action-Blocks don\'t exist with tags: ' + user_phrase);
            return;
        }
    
        if (user_phrase === undefined || user_phrase === null) {
            let error_text = 'user_phrase not defined during information searching';
            // console.log(error_text);
        }
    
        // Here all objects from a storage which info can to be looking by user.
        let found_actionBlocks = [];
        
        const actionBlocks = this.getActionBlocks();
        
        user_phrase = user_phrase.toLowerCase();
        const user_words = this.#textManager.splitText(user_phrase, ' ');
        
        const titles_actionBlocks_to_show = getTitlesActionBlocksByTags(user_words);
        
            
        // Create an array with actionBlocks and priority value to show.
        for (const title_actionBlock of titles_actionBlocks_to_show) {
            let actionBlock = this.getActionBlockByTitle(title_actionBlock);
            const priority_actionBlock = this.#getPriorityActionBlockByPhrase(actionBlock, user_phrase);

            actionBlock.priority = priority_actionBlock;
    
            if (priority_actionBlock > 0) {
                // Push current obj.
                found_actionBlocks.push(actionBlock);
            }
        }

        found_actionBlocks = Array.from(found_actionBlocks).reverse();
        
        const property_in_actionBlock_for_sort = 'priority';
        const is_sort_from_A_to_Z = false;
    
        // Sort by priority.
        const actionBlocks_sorted_by_priority = this.#getSortedActionBlocksByProperty(found_actionBlocks, property_in_actionBlock_for_sort, is_sort_from_A_to_Z);
        
    
        return actionBlocks_sorted_by_priority;
    
        function getTitlesActionBlocksByTags(user_words) {
            const indexes_infoObjects_to_show = [];
            
            // Push index of infoObj by user phrase if it doesn't exist yet in array. 
            for (const i_user_word in user_words) {
                // One user word of phrase.
                const user_word = user_words[i_user_word];
                // Indexes of current tag.
                const indexes_infoObjects_curr = that.#titles_actionBlocksMap_by_tag[user_word];
    
                // For each index of infoObject for current tag.
                for (const i_index_infoObj_to_show in indexes_infoObjects_curr) {
                    let i_infoObj_to_show = indexes_infoObjects_curr[i_index_infoObj_to_show];
    
                    let index_exist_in_indexes_infoObjects = yesSir.arrayManager.isValueExistsInArray(indexes_infoObjects_to_show, i_infoObj_to_show);
    
                    if (index_exist_in_indexes_infoObjects) {
                        continue;
                    }
    
                    indexes_infoObjects_to_show.push(i_infoObj_to_show);
                }
            }
    
            return indexes_infoObjects_to_show;
        }
    }

    getActionBlocksByTags(user_phrase, minus_tags) {
        const that = this;

        // Delete characters ',' from phrase.
        user_phrase = user_phrase.replaceAll(',', ' ');
        minus_tags = minus_tags.replaceAll(',', ' ');
    
        // If phrase doesn't exist.
        if ( ! user_phrase) {
            // console.log('Action-Blocks don\'t exist with tags: ' + user_phrase);
            return;
        }
    
        if (user_phrase === undefined || user_phrase === null) {
            let error_text = 'user_phrase not defined during information searching';
            // console.log(error_text);
        }

        // Here all objects from a storage which info can to be looking by user.
        let searched_infoObjects = [];
        
        user_phrase = user_phrase.toLowerCase();
        minus_tags = minus_tags.toLowerCase();

        const user_tags = this.#textManager.splitText(user_phrase, ' ');
        const user_minus_tags = this.#textManager.splitText(minus_tags, ' ');
        
        const titles_actionBlocks_to_show = getTitlesActionBlocksByTags(user_tags, user_minus_tags);
        
            
        // Create an array with actionBlocks and priority value to show.
        for (let title_actionBlock of titles_actionBlocks_to_show) {
            let actionBlock = this.getActionBlockByTitle(title_actionBlock);
            const priority_actionBlock = this.#getPriorityActionBlockByPhrase(actionBlock, user_phrase);

            actionBlock.priority = priority_actionBlock;
    
            if (priority_actionBlock > 0) {
                // Push current obj
                searched_infoObjects.push(actionBlock);
            }
        }
    
        const property_in_actionBlock_for_sort = 'priority';
        let is_sort_from_A_to_Z = false;
    
        // Sort by priority.
        searched_infoObjects = this.#getSortedActionBlocksByProperty(searched_infoObjects, 
            property_in_actionBlock_for_sort, is_sort_from_A_to_Z);
    
        return searched_infoObjects;

        function getTitlesActionBlocksByTags(tags, minus_tags) {
            let titles_actionBlocks_to_show = [];
    
            // Push index of Action-blocks by user phrase if it doesn't exist yet in array. 
            for (const i_tag in tags) {
                // One user word of phrase.
                const tag = tags[i_tag];
    
                if (that.#titles_actionBlocksMap_by_tag[tag] === undefined) {
                    return [];
                }
                
                // If array with indexes to show is empty. 
                if (titles_actionBlocks_to_show.length < 1) {
                    // Add all Action-Blocks indexes of tag to array.
                    titles_actionBlocks_to_show = titles_actionBlocks_to_show.concat(that.#titles_actionBlocksMap_by_tag[tag]);
                }
                else {
                    titles_actionBlocks_to_show = yesSir.arrayManager.getSameItemsFromArrays
                    (
                        titles_actionBlocks_to_show, that.#titles_actionBlocksMap_by_tag[tag]
                    );
    
                    if (titles_actionBlocks_to_show.length < 1) {
                        // No same indexes in tags after comparation.
    
                        return []; 
                    }
                }
            }
    
            titles_actionBlocks_to_show = getTitlesActionBlocksWithoutMinusTags(titles_actionBlocks_to_show, minus_tags);
    
            return titles_actionBlocks_to_show;
    
    
            function getTitlesActionBlocksWithoutMinusTags(titles_actionBlocks_to_show, minus_tags) {
                // Delete items with minus tags.
                for (const minus_tag of minus_tags) {
                    for (const i_index_infoObj_to_show in titles_actionBlocks_to_show) {
                        if (that.#titles_actionBlocksMap_by_tag[minus_tag] === undefined) continue;
                        const i_infoObj_to_show = titles_actionBlocks_to_show[i_index_infoObj_to_show];
                        
                        // console.log(that.#titles_actionBlocksMap_by_tag[minus_tag]);
    
                        // Compare minus tag with each Action-Block that has this tag.
                        for (const index_actionBlock_with_minus_tag of that.#titles_actionBlocksMap_by_tag[minus_tag]) {
                            if (index_actionBlock_with_minus_tag === i_infoObj_to_show) {
                                titles_actionBlocks_to_show[i_index_infoObj_to_show] = undefined;
                            }
                        }
                    }
                }
    
                // Delete all undefined elements from array.
                titles_actionBlocks_to_show = titles_actionBlocks_to_show.filter(function(x) {
                    return x !== undefined;
                });
    
    
                return titles_actionBlocks_to_show;
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

    setActionBlocks(actionBlocks_map_new) {
        this.#actionBlocks_map.clear()

        if ( ! actionBlocks_map_new) actionBlocks_map_new = new Map();
        else {
            actionBlocks_map_new.forEach(actionBlock => {
                this.#actionBlocks_map.set(actionBlock.title.toUpperCase(), actionBlock);
            });
        }

        this.#onUpdateVarialbeWithActionBlocks();

        return this.#actionBlocks_map;
    }

    setActionBlocksFromUserStorageAssync(callbackSetActionBlocks, callbackUserStorageDifferentFromLocal) {
        const that = this;

        this.getActionBlocksFromLocalStorageAsync(onGetActionBlocks);

        function onGetActionBlocks(actionBlocks_from_user_storage) {
            const actionBlocks_from_localStorage = that.getActionBlocksFromLocalStorageAsync();

            // IF data is equal to data from localStorage THEN show Action-Blocks
            // ELSE open dialog database.
            if (that.dataStorageService.getUserStorage() === that.dataStorageService.getStorageNameEnum().localStorage) {
                that.setActionBlocks(actionBlocks_from_user_storage);
                if (callbackSetActionBlocks) callbackSetActionBlocks();
            }
            else {
                if (that.mapDataStructure.getStringified(actionBlocks_from_user_storage) === that.mapDataStructure.getStringified(actionBlocks_from_localStorage)) {
                    that.setActionBlocks(actionBlocks_from_user_storage);
                    if (callbackSetActionBlocks) callbackSetActionBlocks();
                }
                else {
                    that.dataStorageService.view.showDatabaseDialog();
                    if (callbackUserStorageDifferentFromLocal) callbackUserStorageDifferentFromLocal();
                }
            }
        }

        return this.#actionBlocks_map;
    }


    add(actionBlock_to_add, isShowAlertOnError = true) {
        const that = this;
        const tagsNormalizer = new TagsNormalizer();

        console.log('actionBlocks_map', this.#actionBlocks_map);

        // Add new id.
        const actionBlocksArray = [ ...this.#actionBlocks_map.values() ];
        const ids = actionBlocksArray.map(obj => obj.id).filter(item => typeof item === "number" && typeof item !== NaN);
        let lastId = Math.max(ids);
        if (lastId === typeof lastId !== "number" || typeof lastId === NaN) lastId = 0;
        actionBlock_to_add.id = lastId + 1;
        //


        actionBlock_to_add.title = getNormalizedTitle(actionBlock_to_add.title);

        if (isTitleValid(actionBlock_to_add.title) === false) return false;

        actionBlock_to_add.tags = tagsNormalizer.getHandledTags(actionBlock_to_add.tags);

        this.#actionBlocks_map.set(actionBlock_to_add.title.toUpperCase(), actionBlock_to_add);
        
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
    
            if (that.#actionBlocks_map.has(title.toUpperCase())) {
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
        if (this.#actionBlocks_map.has(title.toUpperCase())) {
            return true;
        }

        return false;
    }
    
    saveAsync(actionBlocks, callBackSavedSuccessfully, callBackError) {
        const that = this;

        if ( ! actionBlocks) {
            actionBlocks = this.#actionBlocks_map;
        }

        yesSir.logsService.showLog('Data is saving... Don\'t close this tab');
        

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

        let actionBlocks_to_DB_string = this.mapDataStructure.getStringified(this.getActionBlocks());

        let authorization_data;
        if (localStorage['authorization']) authorization_data = JSON.parse(localStorage['authorization']);

        if ( ! authorization_data) {
            alert('ERROR! Data has not been saved in database. Authorization error.');
            onDatabaseError();
            return false; 
        }

        // Set object to save in DB
        const userData_to_DB_obj = {
            actionBlocks: actionBlocks_to_DB_string
        };

        // Stringify object for DB
        const userData_to_DB_string = JSON.stringify(userData_to_DB_obj);

        // Upload data to user field
        const user_id = authorization_data.id;
        const data_to_send = userData_to_DB_string;
        that.dbManager.setUserData(user_id, data_to_send, onUpdatedUserData, onFailSaveUserData);
        
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
        const actionBlocks_to_save = this.mapDataStructure.getStringified(actionBlocks);
        const key = 'actionBlocks';
        localStorage.setItem(key, actionBlocks_to_save);

        return true;
    }

    updateActionBlock(title, tags, action, content, image_URL) {
        const original_title = this.title_actionBlock_before_update;
  
        // Check new title validation.
        if (original_title.toLowerCase() != title.toLowerCase()) {
            const is_actionBlock_exists_by_title = this.getActionBlockByTitle(title);
            
            if (is_actionBlock_exists_by_title) {
                alert('Action-Block with current title already exists. Title: ' + title);
                return false;
            }

            addTitleToTags();
        }

        const is_deleted = this.deleteActionBlockByTitle(original_title);

        if ( ! is_deleted) {
            alert('ERROR! Action-Block hasn\'t been deleted');
            return false;
        }
        
        const action_block =
        {
            title: title,
            tags: tags,
            action: action,
            content: content,
            imageURL: image_URL
        };

        const is_created = this.add(action_block);
    
        if ( ! is_created) {
            alert('ERROR! Action-Bclok hasn\'t been created.');
            return false;
        }

        return true;
        

        function addTitleToTags() {
            // Add new tag getting text from title.
    
            const title_without_symbols = title.replace(/[^a-zа-яё0-9\s]/gi, '');
            
            if (tags) tags = tags + ", ";
            
            // Add new tag getting text from title.
            tags += title + ", " + title_without_symbols;
        }
    }

    deleteActionBlockByTitle(title, is_show_alert_on_error = true) {
        const is_deleted = this.#actionBlocks_map.delete(title.toUpperCase());

        this.#onUpdateVarialbeWithActionBlocks();
    
        return is_deleted;
    }

    deleteActionBlocks() {
        this.#actionBlocks_map = new Map();

        this.#onUpdateVarialbeWithActionBlocks();
    }

    #addActionBlockTitleById(title) {
        const lastKey = Object.keys(this.#title_actionBlock_by_id).pop();
    
        if (lastKey === undefined) {
            lastKey = 0;
        }
        
        const newActionBlockId = Number(lastKey) + 1;
    
        this.#title_actionBlock_by_id[newActionBlockId] = title;

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

        const indexes_actionBlocks_by_tag = createIndexes();
        const key = 'indexes_actionBlocks_by_tag';
    
        localStorage[key] = JSON.stringify(indexes_actionBlocks_by_tag);
    
        // console.log('Update indexes', indexes_actionBlocks_by_tag);
    
        return true;
    
        // Example: indexes_actionBlocks_by_tag['hello'] = [1, 2];
        function createIndexes(actionBlocks) {
            if ( ! actionBlocks) actionBlocks = that.getActionBlocks();
    
            let indexes_actionBlocks_by_tag = {};
    
    
            // For all actionBlocks.
            for (const i_actionBlock_to_paste in actionBlocks) {
                let actionBlock = actionBlocks[i_actionBlock_to_paste];
                let tags = actionBlock.tags;
    
                // For all tags.
                for (const i_tag in tags) {
                    let tag = tags[i_tag];
                    
                    tag = tag.toLowerCase();
    
                    if ( ! tag) continue;
    
                    // WHILE first symbol in tag is empty THEN delete empty.
                    while (tag[0] === ' ') tag = tag.replace(tag[0], '');
    
                    // Separated words of tag.
                    let tag_words = that.#textManager.splitText(tag, ' ');
                    
                    // For each word in tag.
                    for (const i_wordTag in tag_words) {
                        let tag_word = tag_words[i_wordTag];
                    
                        if ( ! indexes_actionBlocks_by_tag[tag_word]) {
                            indexes_actionBlocks_by_tag[tag_word] = [];
                        }
                        
                        // Indexes for link to actionBlock.
                        let indexes_arr = Object.values(indexes_actionBlocks_by_tag[tag_word]);
                        
                        // Each index must be different in indexes array.
                        let isIndexExistInIndexesArr = yesSir.arrayManager.isValueExistsInArray(indexes_arr, i_actionBlock_to_paste);

                        if (isIndexExistInIndexesArr) continue;

                        indexes_actionBlocks_by_tag[tag_word].push(i_actionBlock_to_paste);
                    }
                }
            }
    
            return indexes_actionBlocks_by_tag;
        }
    
    }

    #updateTagsIndexesForMap() {
        const that = this;

        const indexes_actionBlocks_by_tag = createIndexes();
        const key = 'titles_actionBlocks_by_tag';
        localStorage[key] = JSON.stringify(indexes_actionBlocks_by_tag);
        this.#titles_actionBlocksMap_by_tag = indexes_actionBlocks_by_tag;
    
    
        // Example: indexes_actionBlocks_by_tag['hello'] = [1, 2];
        function createIndexes() {
            const actionBlocksMap = that.getActionBlocks();
            let indexes_actionBlocks_by_tag = {};

            actionBlocksMap.forEach((actionBlock, i_actionBlock) => {
                if (i_actionBlock === undefined) return indexes_actionBlocks_by_tag;
                const tags = actionBlock.tags;

                // For all tags.
                for (const tag of tags) {
                    let tag_lower_case = tag.toLowerCase();

                    if ( ! tag_lower_case) continue;

                    // WHILE first symbol in tag_lower_case is empty THEN delete empty.
                    while (tag_lower_case[0] === ' ') tag_lower_case = tag_lower_case.replace(tag_lower_case[0], '');

                    // Separated words of tag_lower_case.
                    let tag_words = that.#textManager.splitText(tag_lower_case, ' ');

                    // For each word in tag_lower_case.
                    for (const tag_word of tag_words) {
                        if ( ! indexes_actionBlocks_by_tag[tag_word]) {
                            indexes_actionBlocks_by_tag[tag_word] = [];
                        }
                        
                        // Indexes for link to actionBlock.
                        let indexes_arr = Object.values(indexes_actionBlocks_by_tag[tag_word]);
                        
                        // Each index must be different in indexes array.
                        let isIndexExistInIndexesArr = yesSir.arrayManager.isValueExistsInArray(indexes_arr, i_actionBlock);

                        if (isIndexExistInIndexesArr) continue;

                        indexes_actionBlocks_by_tag[tag_word].push(i_actionBlock);
                    }
                }
            });

            return indexes_actionBlocks_by_tag;
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
    #getPriorityActionBlockByPhrase(obj, user_phrase) {
        let priority = 0;
        let tags_phrases = obj.tags;

        // Check for each object in a storage is the same TITLE with user phrase.
        // IF 'title' == 'user phrase' THEN info is probably that we are looking. Add proiority for current info obj + 10
        if (obj.title === undefined) {
            // console.log('Warning! title property doesn\'t exist in obj: ', obj);
        }

        // Separated words of user phrase.
        const user_words = this.#textManager.splitText(user_phrase, ' ');
        // All tags.
        let tags = [];

        // For all user words.
        for (const i_wordUser in user_words) {
            // for each tags phrases separated by ','.
            for (const i_inTags in tags_phrases) {
                const tag = tags_phrases[i_inTags];
                const tag_words = this.#textManager.splitText(tag, ' ');
                tags = tags.concat(tag_words);
            }
            
            // For each word in tag.
            for (let i_wordTag in tags) {
                let user_word = user_words[i_wordUser];
                let tag_word = tags[i_wordTag];

                // If in tag exist user word THEN add priority for this info object.
                if (this.#textManager.isSame(user_word, tag_word)) {
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
        let is_sorting = true;
        while (is_sorting) {
            is_sorting = false;
            for (let i = 0; i < actionBlocks.length - 1; i++) {
                let infoObj_curr = actionBlocks[i];
                let infoObj_next = actionBlocks[i + 1];
                if (infoObj_curr[property] < infoObj_next[property]) {
                    actionBlocks[i] = infoObj_next;
                    actionBlocks[i + 1] = infoObj_curr;
                    is_sorting = true;
                }
            }
        }

        return actionBlocks;
    }
}
