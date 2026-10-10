class TagsNormalizer {
    #textManager;


    constructor() {
        this.#textManager = new TextManager();
    }

    getHandledTags(initialTags) {
        let handledTags = [];

        handledTags = this.#getNormalizedTags(initialTags);
       
        handledTags = this.#getNormalizedTags([...handledTags, ...this.#getAdditionalTags(handledTags)]);
        console.log("Handled tags after normalization and additional tags:", handledTags);

        // 1. Загружаем данные
        const synonymGroups = JSON.parse(localStorage.getItem('synonymTags')) || []; // [[s1, s2], [s3, s4]]
        const childrenGroups = JSON.parse(localStorage.getItem('childrenTags')) || []; // [{parent, children: []}]  

        function syncUserSynonymsWithChildren() {
            // Вспомогательная функция для нормализации и разделения строки по запятым и пробелам
            function parseTagString(str) {
                if (!str) return [];
                return str.split(/[,]+/) // Сначала разделяем по запятым
                    .flatMap(part => part.split(/\s+/)) // Затем разделяем по пробелам
                    .map(t => t.trim().toLowerCase())
                    .filter(t => t !== '');
            }

            // Создаем расширенный набор всех уникальных токенов/тегов из handledTags
            let flatHandledTags = [];
            handledTags.forEach(t => {
                flatHandledTags.push(...parseTagString(t));
                if (!flatHandledTags.includes(t.toLowerCase())) {
                    flatHandledTags.push(t.toLowerCase());
                }
            });

            // 1. Расширяем handledTags синонимами
            synonymGroups.forEach(group => {
                const groupNormalized = group.map(s => s.toLowerCase());
                const hasMatch = groupNormalized.some(synonym => 
                    flatHandledTags.includes(synonym)
                );
                
                if (hasMatch) {
                    group.forEach(synonym => {
                        if (!handledTags.includes(synonym)) {
                            handledTags.push(synonym);
                        }
                    });
                }
            });

            // Обновляем плоский список после добавления синонимов
            flatHandledTags = [];
            handledTags.forEach(t => {
                flatHandledTags.push(...parseTagString(t));
                if (!flatHandledTags.includes(t.toLowerCase())) {
                    flatHandledTags.push(t.toLowerCase());
                }
            });

            // 2. Проверяем соответствие с дочерними группами
            const tagsToProcess = [...handledTags];
            
            tagsToProcess.forEach(tag => {
                const foundChildGroup = childrenGroups.find(cGroup => {
                    // Разбиваем родительские теги группы по запятым и пробелам
                    const parentsList = parseTagString(cGroup.parent);
                    
                    // Также разбиваем текущий обрабатываемый тег на случай, если там несколько слов через пробел
                    const currentTagParts = parseTagString(tag);

                    // Проверяем, есть ли пересечение хотя бы по одному слову/тегу
                    return currentTagParts.some(part => parentsList.includes(part));
                });

                if (foundChildGroup) {
                    foundChildGroup.children.forEach(child => {
                        if (!handledTags.includes(child)) {
                            handledTags.push(child);
                        }
                    });
                }
            });
        }

        syncUserSynonymsWithChildren();

        return handledTags;
    }


    #getNormalizedTags(tags) {
        if (Array.isArray(tags)) {
            tags = tags.toString();
        }

        let normalizedTags;
    
        // Change all new lines to symbol ',".
        const tagsWithoutNewLine = tags.replaceAll('\n', ',');
        //tags_lower_case = tags_without_new_line.toLowerCase();
    
        let tagsArray = this.#textManager.getArrayByText(tagsWithoutNewLine);
        
        // Delete empty symbols from sides in text.
        for (const indexTag in tagsArray) {
            tagsArray[indexTag] = tagsArray[indexTag].trim();
        }
    
        // Delete same tags.
        const tagsSet = new Set(tagsArray);
    
        // Convertation from Set to Array.
        normalizedTags = Array.from(tagsSet);
    
        return normalizedTags;
    }

    #getAdditionalTags(tags) {
         if (Array.isArray(tags) === false) {
            tags = this.#textManager.getArrayByText(tags);
        }

        const additionalTags = [];

        for (const tag of tags) {
            let additionalTag = '';

            const tagWithoutSpecialCharacters = this.#textManager.getTextWithoutSpecialCharactes(tag);

            if (tag != tagWithoutSpecialCharacters) {
                additionalTag = tagWithoutSpecialCharacters;
            }

            if (tagWithoutSpecialCharacters === tagWithoutSpecialCharacters.toUpperCase() == false && tagWithoutSpecialCharacters === tagWithoutSpecialCharacters.toLowerCase() === false) {
                const tagWithSeparatedWords = this.#textManager.getSeparatedWordsByCamelCaseString(tagWithoutSpecialCharacters);

                additionalTag = tagWithSeparatedWords;
            }

            if (additionalTag) {
                additionalTags.push(additionalTag);
            }
        }

        return additionalTags;
    }
}